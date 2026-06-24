import React from 'react';
import { View, Text } from 'react-native';

export const ATSProTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4">
      <Text className="text-2xl font-bold text-black">{data.name}</Text>
      <Text className="text-base text-gray-700">{data.email}</Text>
      <Text className="text-base text-gray-700">{data.phone}</Text>
      {/* ATS optimized template content */}
    </View>
  );
};
