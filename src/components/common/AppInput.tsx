import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  containerClassName,
  ...props
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && <Text className="text-gray-700 font-semibold mb-2">{label}</Text>}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 text-base"
        placeholderTextColor="#999"
        {...props}
      />
      {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
    </View>
  );
};

export default AppInput;
