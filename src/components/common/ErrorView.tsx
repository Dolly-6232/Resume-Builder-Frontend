import React from 'react';
import { View, Text } from 'react-native';
import AppButton from './AppButton';

interface ErrorViewProps {
  message: string;
  onRetry?: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <View className="flex-1 items-center justify-center p-8 bg-white">
      <Text className="text-3xl mb-4">⚠️</Text>
      <Text className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</Text>
      <Text className="text-base text-gray-600 text-center mb-8">{message}</Text>
      {onRetry && <AppButton title="Retry" onPress={onRetry} />}
    </View>
  );
};

export default ErrorView;
