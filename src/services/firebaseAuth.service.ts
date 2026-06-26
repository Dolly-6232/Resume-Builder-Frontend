import { env } from '../config/env';

const FIREBASE_AUTH_BASE = 'https://identitytoolkit.googleapis.com/v1';

interface FirebaseAuthResponse {
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  email?: string;
  displayName?: string;
}

interface FirebaseErrorResponse {
  error?: {
    message?: string;
  };
}

const FIREBASE_ERROR_MESSAGES: Record<string, string> = {
  API_KEY_INVALID: 'Firebase API key is invalid. Check FIREBASE_WEB_API_KEY in .env.',
  EMAIL_EXISTS: 'An account already exists with this email.',
  EMAIL_NOT_FOUND: 'No account found with this email.',
  INVALID_PASSWORD: 'Incorrect password. Please try again.',
  INVALID_LOGIN_CREDENTIALS: 'Invalid email or password.',
  WEAK_PASSWORD: 'Password should be at least 6 characters.',
  TOO_MANY_ATTEMPTS_TRY_LATER: 'Too many attempts. Please try again later.',
  USER_DISABLED: 'This account has been disabled.',
  OPERATION_NOT_ALLOWED: 'Email/password sign-in is not enabled in Firebase.',
};

const mapFirebaseError = (payload: FirebaseErrorResponse): string => {
  const code = payload.error?.message || 'UNKNOWN_ERROR';

  if (FIREBASE_ERROR_MESSAGES[code]) {
    return FIREBASE_ERROR_MESSAGES[code];
  }

  if (code.includes('INVALID') || code.includes('EMAIL')) {
    return 'Authentication failed. Check your email and password.';
  }

  return 'Authentication failed. Please try again.';
};

const getNetworkErrorMessage = (endpoint: string): string => {
  if (endpoint === 'accounts:signInWithPassword') {
    return 'Network error while signing in with Firebase. Check internet access and FIREBASE_WEB_API_KEY in .env.';
  }

  return 'Network error while contacting Firebase. Check internet access and Firebase configuration.';
};

const postFirebaseAuth = async (
  endpoint: string,
  body: Record<string, unknown>,
): Promise<FirebaseAuthResponse> => {
  if (!env.firebaseWebApiKey) {
    console.error('[FirebaseAuthService] API key is missing from .env');
    throw new Error('FIREBASE_WEB_API_KEY is missing from .env');
  }

  console.log(`[FirebaseAuthService] Request to firebase auth endpoint: ${endpoint} for email: ${body.email || 'N/A'}`);
  let response: Response;
  try {
    response = await fetch(
      `${FIREBASE_AUTH_BASE}/${endpoint}?key=${env.firebaseWebApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );
  } catch (error) {
    console.error(`[FirebaseAuthService] Network error during postFirebaseAuth calling ${endpoint}:`, error);
    throw new Error(getNetworkErrorMessage(endpoint));
  }

  const data = (await response.json()) as FirebaseAuthResponse & FirebaseErrorResponse;

  if (!response.ok) {
    console.warn(`[FirebaseAuthService] Response not OK from ${endpoint}:`, data);
    throw new Error(mapFirebaseError(data));
  }

  if (!data.idToken) {
    console.warn(`[FirebaseAuthService] Response OK from ${endpoint} but did not return idToken`);
    throw new Error('Firebase did not return an ID token.');
  }

  console.log(`[FirebaseAuthService] Request to ${endpoint} completed successfully.`);
  return data;
};

export const firebaseAuthService = {
  async signUp(email: string, password: string, displayName: string): Promise<string> {
    const data = await postFirebaseAuth('accounts:signUp', {
      email,
      password,
      displayName,
      returnSecureToken: true,
    });

    return data.idToken;
  },

  async signInWithEmail(email: string, password: string): Promise<string> {
    const data = await postFirebaseAuth('accounts:signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });

    return data.idToken;
  },

  async sendPasswordResetEmail(email: string): Promise<void> {
    if (!env.firebaseWebApiKey) {
      throw new Error('FIREBASE_WEB_API_KEY is missing from .env');
    }

    const response = await fetch(
      `${FIREBASE_AUTH_BASE}/accounts:sendOobCode?key=${env.firebaseWebApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email,
        }),
      },
    );

    const data = (await response.json()) as FirebaseErrorResponse;

    if (!response.ok) {
      throw new Error(mapFirebaseError(data));
    }
  },
};
