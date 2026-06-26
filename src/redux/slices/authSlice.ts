import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authApi, type LoginPayload, type RegisterPayload } from '../../api/auth';
import {
  getApiErrorMessage,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../../api/client';
import { firebaseAuthService } from '../../services/firebaseAuth.service';
import { configureGoogleSignIn } from '../../utils/googleSignIn';
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

const getGoogleSignInErrorMessage = (error: any): string => {
  const code = error?.code;
  const message = error instanceof Error ? error.message : getApiErrorMessage(error);

  if (code === statusCodes.SIGN_IN_CANCELLED) {
    return 'Google sign-in was cancelled.';
  }

  if (code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return 'Google Play Services is not available or needs to be updated.';
  }

  if (code === statusCodes.IN_PROGRESS) {
    return 'Google sign-in is already in progress.';
  }

  if (code === 'DEVELOPER_ERROR' || message.includes('DEVELOPER_ERROR')) {
    return 'Google sign-in is not configured for this Android app. In Firebase, add Android package com.resumebuilderfe with this debug SHA-1, enable Google sign-in, then use the project Web client ID in GOOGLE_WEB_CLIENT_ID.';
  }

  return message;
};

export const bootstrapAuth = createAsyncThunk('auth/bootstrap', async () => {
  configureGoogleSignIn();

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
      console.log('[AuthSlice Login] Initiating login flow for email:', payload.email);
      const idToken = await firebaseAuthService.signInWithEmail(payload.email, payload.password);
      console.log('[AuthSlice Login] Firebase sign-in successful. Authenticating with backend...');
      const result = await authApi.firebase({ idToken });
      console.log('[AuthSlice Login] Backend authentication successful. Persisting session...');
      await persistSession(result);
      console.log('[AuthSlice Login] Session persisted. Login flow completed.');
      return result;
    } catch (error) {
      console.error('[AuthSlice Login] Error in login thunk:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : getApiErrorMessage(error),
      );
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      console.log('[AuthSlice Register] Initiating registration flow for email:', payload.email, 'name:', payload.name);
      const idToken = await firebaseAuthService.signUp(
        payload.email,
        payload.password,
        payload.name,
      );
      console.log('[AuthSlice Register] Firebase sign-up successful. Authenticating with backend...');
      const result = await authApi.firebase({ idToken, name: payload.name });
      console.log('[AuthSlice Register] Backend authentication successful. Persisting session...');
      await persistSession(result);
      console.log('[AuthSlice Register] Session persisted. Registration flow completed.');
      return result;
    } catch (error) {
      console.error('[AuthSlice Register] Error in register thunk:', error);
      return rejectWithValue(
        error instanceof Error ? error.message : getApiErrorMessage(error),
      );
    }
  },
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      console.log('[AuthSlice GoogleLogin] Initiating Google sign-in flow...');
      configureGoogleSignIn();

      if (!env.googleWebClientId) {
        throw new Error('GOOGLE_WEB_CLIENT_ID is missing from .env');
      }

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleUser = await GoogleSignin.signIn();
      const idToken = googleUser.data?.idToken;

      if (!idToken) {
        throw new Error('Google Sign-In did not return an ID token.');
      }

      console.log('[AuthSlice GoogleLogin] Google sign-in successful. Authenticating with backend...');
      const result = await authApi.firebase({ idToken });
      console.log('[AuthSlice GoogleLogin] Backend authentication successful. Persisting session...');
      await persistSession(result);
      console.log('[AuthSlice GoogleLogin] Session persisted. Google login flow completed.');
      return result;
    } catch (error: any) {
      console.error('[AuthSlice GoogleLogin] Error in googleLogin thunk:', error);
      return rejectWithValue(getGoogleSignInErrorMessage(error));
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await firebaseAuthService.sendPasswordResetEmail(email);
      return email;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : getApiErrorMessage(error),
      );
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
          state.error =
            typeof action.payload === 'string' ? action.payload : 'Authentication failed';
        },
      );
  },
});

export const { clearAuthError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
