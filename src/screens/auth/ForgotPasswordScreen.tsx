import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthScreenLayout from '../../components/auth/AuthScreenLayout';
import AuthTextField from '../../components/auth/AuthTextField';
import GradientButton from '../../components/auth/GradientButton';
import { authStyles } from '../../theme/authStyles';
import { useAppDispatch } from '../../hooks';
import { forgotPassword } from '../../redux/slices/authSlice';

interface ForgotFormData {
  email: string;
}

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

const ForgotPasswordScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | null>(null);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }: ForgotFormData) => {
    const result = await dispatch(forgotPassword(email));
    if (forgotPassword.rejected.match(result)) {
      Alert.alert('Reset failed', String(result.payload || 'Unable to send reset email'));
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AuthScreenLayout
        headerTitle="Check Your Email"
        headerSubtitle="Firebase sent a password reset link."
        cardTitle="Reset email sent"
        cardSubtitle="Open the link in your inbox to set a new password."
        headerHeight={260}
      >
        <View style={authStyles.successBox}>
          <View style={authStyles.successIcon}>
            <Icon name="mail-unread-outline" size={36} color="#16A34A" />
          </View>
          <Text style={authStyles.successText}>{getValues('email')}</Text>
          <GradientButton title="Back to login" onPress={() => navigation.goBack()} />
        </View>
      </AuthScreenLayout>
    );
  }

  return (
    <AuthScreenLayout
      headerTitle="Forgot Password"
      headerSubtitle="We will email you a Firebase reset link."
      cardTitle="Reset password"
      cardSubtitle="Enter the email used for your Firebase account."
      headerHeight={260}
    >
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange } }) => (
          <AuthTextField
            label="Email address"
            icon="mail-outline"
            placeholder="alex@example.com"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
            focused={focusedField === 'email'}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
        )}
      />
      <GradientButton
        title={isSubmitting ? 'Sending...' : 'Send reset instructions'}
        disabled={isSubmitting}
        onPress={handleSubmit(onSubmit)}
      />
      <TouchableOpacity style={authStyles.footerRow} onPress={() => navigation.goBack()}>
        <Text style={authStyles.footerLink}>Back to login</Text>
      </TouchableOpacity>
    </AuthScreenLayout>
  );
};

export default ForgotPasswordScreen;
