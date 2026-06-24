import React from 'react';
import { View, Text } from 'react-native';

export const InternationalTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4">
      <View className="mb-4 pb-4 border-b border-gray-300">
        <Text className="text-2xl font-bold text-gray-900">{data.name}</Text>
        <Text className="text-sm text-gray-600">{data.email} | {data.phone}</Text>
      </View>
      {/* International template content */}
    </View>
  );
};
