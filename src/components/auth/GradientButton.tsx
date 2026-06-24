import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { authStyles as styles } from '../../theme/authStyles';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  disabled = false,
  style,
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    disabled={disabled}
    onPress={onPress}
  >
    <LinearGradient
      colors={['#2E3192', '#1B75BC', '#1BFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.primaryButton, style]}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default GradientButton;
