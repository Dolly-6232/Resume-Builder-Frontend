import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authApi, type LoginPayload, type RegisterPayload } from '../../api/auth';
import {
  getApiErrorMessage,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../../api/client';
import { env } from '../../config/env';
import type { AuthResponse, User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  bootstrapping: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  bootstrapping: true,
  error: null,
};

const persistSession = async ({ token, user }: AuthResponse) => {
  await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);

  if (user) {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
};

export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  const [[, token], [, userJson]] = await AsyncStorage.multiGet([
    TOKEN_STORAGE_KEY,
    USER_STORAGE_KEY,
  ]);

  return {
    token,
    user: userJson ? (JSON.parse(userJson) as User) : null,
  };
});

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const result = await authApi.login(payload);
      await persistSession(result);
      return result;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const result = await authApi.register(payload);
      await persistSession(result);
      return result;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      GoogleSignin.configure({
        webClientId: env.googleWebClientId,
        iosClientId: env.googleIosClientId || undefined,
        offlineAccess: false,
      });

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleUser = await GoogleSignin.signIn();
      const idToken = googleUser.data?.idToken;

      if (!idToken) {
        throw new Error('Google Sign-In did not return an ID token.');
      }

      const result = await authApi.google(idToken);
      await persistSession(result);
      return result;
    } catch (error: any) {
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        return rejectWithValue('Google sign-in was cancelled.');
      }

      return rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);
  try {
    await GoogleSignin.signOut();
  } catch {
    // Google may not be configured on every build target.
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: state => {
      state.error = null;
    },
    forceLogout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bootstrapAuth.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.bootstrapping = false;
      })
      .addCase(bootstrapAuth.rejected, state => {
        state.bootstrapping = false;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;
        state.token = null;
        state.error = null;
      })
      .addMatcher(
        isAnyOf(login.pending, register.pending, googleLogin.pending),
        state => {
          state.loading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled, googleLogin.fulfilled),
        (state, action) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        },
      )
      .addMatcher(
        isAnyOf(login.rejected, register.rejected, googleLogin.rejected),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || 'Authentication failed';
        },
      );
  },
});

export const { clearAuthError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
