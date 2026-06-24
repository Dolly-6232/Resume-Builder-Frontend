import React from 'react';
import { View, Text } from 'react-native';

export const CorporateTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-gray-900 p-6">
      <Text className="text-3xl font-bold text-white">{data.name}</Text>
      <Text className="text-base text-gray-300">{data.title}</Text>
      {/* Template content */}
    </View>
  );
};
