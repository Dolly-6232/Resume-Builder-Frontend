import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import AuthScreenLayout from '../../components/auth/AuthScreenLayout';
import AuthTextField from '../../components/auth/AuthTextField';
import GradientButton from '../../components/auth/GradientButton';
import { authStyles } from '../../theme/authStyles';
import type { AuthStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { googleLogin, register } from '../../redux/slices/authSlice';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
  name: yup.string().trim().min(2, 'Enter your full name').required('Full name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

type RegisterNav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<RegisterNav>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [focusedField, setFocusedField] = useState<keyof RegisterFormData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async ({ name, email, password }: RegisterFormData) => {
    console.log('[RegisterScreen] onSubmit - Form data submitted. Email:', email, 'Name:', name);
    const result = await dispatch(register({ name, email, password }));
    if (register.rejected.match(result)) {
      console.error('[RegisterScreen] onSubmit - Registration failed:', result.payload);
      Alert.alert('Registration failed', String(result.payload || 'Unable to create account'));
    } else {
      console.log('[RegisterScreen] onSubmit - Registration succeeded');
    }
  };

  const onGoogleSignUp = async () => {
    console.log('[RegisterScreen] onGoogleSignUp - Initiated');
    const result = await dispatch(googleLogin());
    if (googleLogin.rejected.match(result)) {
      console.error('[RegisterScreen] onGoogleSignUp - Google sign-up failed:', result.payload);
      Alert.alert('Google sign-up failed', String(result.payload || 'Unable to sign up'));
    } else {
      console.log('[RegisterScreen] onGoogleSignUp - Google sign-up succeeded');
    }
  };

  return (
    <AuthScreenLayout
      headerTitle="Create Account"
      headerSubtitle="Sign up with email or Google via Firebase."
      cardTitle="Sign up"
      cardSubtitle="Create your account securely with Firebase Auth."
    >
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <AuthTextField
            label="Full name"
            icon="person-outline"
            placeholder="John Doe"
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
            error={errors.name?.message}
            focused={focusedField === 'name'}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />
        )}
      />
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
      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <AuthTextField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Create a password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showPassword}
            showToggle
            visible={showPassword}
            onToggleVisibility={() => setShowPassword(prev => !prev)}
            error={errors.password?.message}
            focused={focusedField === 'password'}
            onFocus={() => setFocusedField('password')}
            onBlur={() => setFocusedField(null)}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { value, onChange } }) => (
          <AuthTextField
            label="Confirm password"
            icon="shield-checkmark-outline"
            placeholder="Repeat your password"
            value={value}
            onChangeText={onChange}
            secureTextEntry={!showConfirm}
            showToggle
            visible={showConfirm}
            onToggleVisibility={() => setShowConfirm(prev => !prev)}
            error={errors.confirmPassword?.message}
            focused={focusedField === 'confirmPassword'}
            onFocus={() => setFocusedField('confirmPassword')}
            onBlur={() => setFocusedField(null)}
          />
        )}
      />

      {error ? <Text style={styles.serverError}>{error}</Text> : null}

      <GradientButton
        title={loading ? 'Creating account...' : 'Create account'}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />

      <TouchableOpacity
        style={styles.googleButton}
        activeOpacity={0.85}
        disabled={loading}
        onPress={onGoogleSignUp}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0F172A" />
        ) : (
          <>
            <Icon name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.googleText}>Sign up with Google</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={authStyles.footerRow}>
        <Text style={authStyles.footerText}>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={authStyles.footerLink}>Log in</Text>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  serverError: {
    color: '#DC2626',
    fontSize: 13,
    marginTop: 12,
  },
  googleButton: {
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 14,
    backgroundColor: '#FFFFFF',
  },
  googleText: {
    marginLeft: 10,
    color: '#0F172A',
    fontWeight: '800',
  },
});
