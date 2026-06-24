import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthScreenLayout from '../../components/auth/AuthScreenLayout';
import OtpInput from '../../components/auth/OtpInput';
import GradientButton from '../../components/auth/GradientButton';
import { authStyles as styles } from '../../theme/authStyles';
import type { AuthStackParamList } from '../../navigation/types';

interface VerifyFormData {
  code: string;
}

const schema = yup.object({
  code: yup
    .string()
    .length(6, 'Enter the 6-digit code')
    .required('Verification code is required'),
});

type VerifyNav = NativeStackNavigationProp<AuthStackParamList, 'VerifyEmail'>;
type VerifyRoute = RouteProp<AuthStackParamList, 'VerifyEmail'>;

const RESEND_SECONDS = 60;

const VerifyEmailScreen: React.FC = () => {
  const navigation = useNavigation<VerifyNav>();
  const route = useRoute<VerifyRoute>();
  const email = route.params?.email ?? 'your email';
  const [verified, setVerified] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyFormData>({
    resolver: yupResolver(schema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data: VerifyFormData) => {
    console.log('Verify code =>', data.code);
    setVerified(true);
  };

  const handleResend = () => {
    if (timer > 0) {
      return;
    }
    setTimer(RESEND_SECONDS);
    console.log('Resend code to =>', email);
  };

  if (verified) {
    return (
      <AuthScreenLayout
        headerTitle="Email Verified"
        headerSubtitle="Your account is ready to go."
        cardTitle="You're all set!"
        cardSubtitle="Start building your professional resume now."
        headerHeight={260}
        showBack={false}
      >
        <View style={styles.successBox}>
          <View style={styles.successIcon}>
            <Icon name="checkmark-circle-outline" size={40} color="#16A34A" />
          </View>
          <Text style={styles.successTitle}>Verification complete</Text>
          <Text style={styles.successText}>
            Your email has been verified successfully. You can now sign in and
            access all features.
          </Text>
          <GradientButton
            title="Continue to login"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </AuthScreenLayout>
    );
  }

  return (
    <AuthScreenLayout
      headerTitle="Verify Email"
      headerSubtitle="One quick step to secure your account."
      cardTitle="Enter verification code"
      cardSubtitle={`We sent a 6-digit code to ${email}.`}
      headerHeight={260}
    >
      <Text style={styles.label}>Verification code</Text>
      <Controller
        control={control}
        name="code"
        render={({ field: { value, onChange } }) => (
          <OtpInput
            value={value}
            onChange={onChange}
            error={errors.code?.message}
          />
        )}
      />

      <GradientButton
        title={isSubmitting ? 'Verifying...' : 'Verify email'}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Didn't get the code?</Text>
        <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
          <Text
            style={[
              styles.footerLink,
              timer > 0 && { color: '#94A3B8' },
            ]}
          >
            {timer > 0 ? `Resend in ${timer}s` : 'Resend code'}
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
};

export default VerifyEmailScreen;
