import React from 'react';
import { View, Text } from 'react-native';

export const CreativeTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
      <Text className="text-3xl font-bold text-white">{data.name}</Text>
      <Text className="text-lg text-gray-100">{data.title}</Text>
      {/* Creative template content */}
    </View>
  );
};
