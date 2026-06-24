import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'large', color = '#3B82F6' }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;
