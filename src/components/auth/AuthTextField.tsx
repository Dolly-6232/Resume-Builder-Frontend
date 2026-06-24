import React from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { authStyles as styles } from '../../theme/authStyles';

interface AuthTextFieldProps extends TextInputProps {
  label: string;
  icon: string;
  error?: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  showToggle?: boolean;
  visible?: boolean;
  onToggleVisibility?: () => void;
}

const AuthTextField: React.FC<AuthTextFieldProps> = ({
  label,
  icon,
  error,
  focused,
  onFocus,
  onBlur,
  showToggle,
  visible,
  onToggleVisibility,
  ...inputProps
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
        ]}
      >
        <Icon
          name={icon}
          size={20}
          color={focused ? '#2563EB' : '#94A3B8' }
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          onFocus={onFocus}
          onBlur={onBlur}
          {...inputProps}
        />
        {showToggle && (
          <TouchableOpacity
            onPress={onToggleVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name={visible ? 'eye-outline' : 'eye-off-outline' }
              size={22}
              color="#64748B"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AuthTextField;
