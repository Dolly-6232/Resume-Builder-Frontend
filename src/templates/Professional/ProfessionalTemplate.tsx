import React from 'react';
import { View, Text } from 'react-native';

export const ProfessionalTemplate: React.FC<{ data: any }> = ({ data }) => {
  return (
    <View className="bg-white p-4">
      <View className="flex-row items-center mb-4">
        <View className="w-1 h-12 bg-blue-600 mr-4" />
        <View>
          <Text className="text-2xl font-bold text-gray-900">{data.name}</Text>
          <Text className="text-base text-gray-600">{data.title}</Text>
        </View>
      </View>
      {/* Professional template content */}
    </View>
  );
};
