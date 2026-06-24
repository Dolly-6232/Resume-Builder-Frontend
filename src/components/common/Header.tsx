import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, showBack = true }) => {
  return (
    <View className="flex-row items-center justify-between bg-white px-4 py-3 border-b border-gray-200">
      {showBack && (
        <TouchableOpacity onPress={onBackPress} className="w-8 h-8">
          <Text className="text-2xl">←</Text>
        </TouchableOpacity>
      )}
      <Text className="text-xl font-bold text-gray-900 flex-1 ml-4">{title}</Text>
    </View>
  );
};

export default Header;
