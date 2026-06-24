import React from 'react';
import { View, Text } from 'react-native';

export const FreesherTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4">
      <View className="border-b-2 border-blue-400 pb-4 mb-4">
        <Text className="text-2xl font-bold text-gray-900">{data.name}</Text>
        <Text className="text-sm text-gray-600">{data.email}</Text>
      </View>
      {/* Fresher template content */}
    </View>
  );
};
