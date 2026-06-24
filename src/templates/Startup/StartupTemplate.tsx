import React from 'react';
import { View, Text } from 'react-native';

export const StartupTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4 border-l-4 border-green-500">
      <Text className="text-3xl font-bold text-gray-900">{data.name}</Text>
      <Text className="text-base text-green-600 font-semibold">{data.title}</Text>
      {/* Startup template content */}
    </View>
  );
};
