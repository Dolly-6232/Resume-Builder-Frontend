import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { env } from '../config/env';

let configured = false;

export const configureGoogleSignIn = (): void => {
  if (configured || !env.googleWebClientId) {
    return;
  }

  GoogleSignin.configure({
    webClientId: env.googleWebClientId,
    iosClientId: env.googleIosClientId || undefined,
    offlineAccess: false,
  });

  configured = true;
};
