export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  RESUME: {
    GET_ALL: '/resumes',
    GET_BY_ID: '/resumes/:id',
    CREATE: '/resumes',
    UPDATE: '/resumes/:id',
    DELETE: '/resumes/:id',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
  },
  SUBSCRIPTION: {
    GET_PLANS: '/subscription/plans',
    GET_CURRENT: '/subscription/current',
    UPGRADE: '/subscription/upgrade',
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  INVALID_PASSWORD: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.',
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  RESUME_CREATED: 'Resume created successfully.',
  RESUME_UPDATED: 'Resume updated successfully.',
  RESUME_DELETED: 'Resume deleted successfully.',
};
