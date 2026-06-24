import React from 'react';
import { View, Text } from 'react-native';

export const ModernTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4">
      <Text className="text-3xl font-bold text-gray-900">{data.name}</Text>
      <Text className="text-base text-gray-600">{data.email}</Text>
      {/* Template content */}
    </View>
  );
};
