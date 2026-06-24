import React from 'react';
import { View, Text } from 'react-native';

export const SimpleTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4 border-l-4 border-blue-600">
      <Text className="text-2xl font-bold text-gray-900">{data.name}</Text>
      <Text className="text-sm text-gray-600">{data.email}</Text>
      {/* Template content */}
    </View>
  );
};
