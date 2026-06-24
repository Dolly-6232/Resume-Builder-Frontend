import { Platform } from 'react-native';
import {
  API_BASE_URL,
  API_URL,
  FIREBASE_WEB_API_KEY,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID,
} from '@env';

const defaultApiUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

export const env = {
  apiUrl: (API_URL || API_BASE_URL)?.trim() || defaultApiUrl,
  firebaseWebApiKey: FIREBASE_WEB_API_KEY?.trim() || '',
  googleWebClientId: GOOGLE_WEB_CLIENT_ID?.trim() || '',
  googleIosClientId: GOOGLE_IOS_CLIENT_ID?.trim() || '',
  isProduction: !__DEV__,
};
