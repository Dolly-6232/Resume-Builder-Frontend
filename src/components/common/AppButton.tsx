import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

interface AppButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className="bg-blue-600 px-4 py-3 rounded-lg items-center justify-center"
      style={style}
    >
      <Text className="text-white font-bold text-base" style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;
