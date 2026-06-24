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
import { googleLogin, login } from '../../redux/slices/authSlice';

type LoginNav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginFormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginNav>();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.auth);
  const [focusedField, setFocusedField] = useState<keyof LoginFormData | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await dispatch(login(data));
    if (login.rejected.match(result)) {
      Alert.alert('Login failed', String(result.payload || 'Unable to log in'));
    }
  };

  const onGoogleLogin = async () => {
    const result = await dispatch(googleLogin());
    if (googleLogin.rejected.match(result)) {
      Alert.alert('Google sign-in failed', String(result.payload || 'Unable to sign in'));
    }
  };

  return (
    <AuthScreenLayout
      headerTitle="Resume Builder"
      headerSubtitle="Create ATS-friendly resumes in minutes."
      cardTitle="Welcome back"
      cardSubtitle="Sign in with email or Google via Firebase."
      showBack={false}
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

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange } }) => (
          <AuthTextField
            label="Password"
            icon="lock-closed-outline"
            placeholder="Enter your password"
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

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.serverError}>{error}</Text> : null}

      <GradientButton
        title={loading ? 'Signing in...' : 'Log in'}
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
      />

      <TouchableOpacity
        style={styles.googleButton}
        activeOpacity={0.85}
        disabled={loading}
        onPress={onGoogleLogin}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#0F172A" />
        ) : (
          <>
            <Icon name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.googleText}>Continue with Google</Text>
          </>
        )}
      </TouchableOpacity>

      <View style={authStyles.footerRow}>
        <Text style={authStyles.footerText}>Do not have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={authStyles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  link: {
    color: '#2563EB',
    fontWeight: '800',
  },
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
