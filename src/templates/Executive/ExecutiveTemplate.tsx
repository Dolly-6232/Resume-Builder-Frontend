import React from 'react';
import { View, Text } from 'react-native';

export const ExecutiveTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-6">
      <View className="border-b-4 border-gray-800 pb-4 mb-4">
        <Text className="text-4xl font-black text-gray-900">{data.name}</Text>
        <Text className="text-lg text-gray-700 font-semibold">{data.title}</Text>
      </View>
      {/* Executive template content */}
    </View>
  );
};
