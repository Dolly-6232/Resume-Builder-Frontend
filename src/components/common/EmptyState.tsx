import React from 'react';
import { View, Text } from 'react-native';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, icon = '📭' }) => {
  return (
    <View className="flex-1 items-center justify-center p-8">
      <Text className="text-4xl mb-4">{icon}</Text>
      <Text className="text-lg text-gray-600 text-center">{message}</Text>
    </View>
  );
};

export default EmptyState;
