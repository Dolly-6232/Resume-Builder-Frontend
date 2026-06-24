import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import { authStyles } from '../../theme/authStyles';

interface OtpInputProps {
  value: string;
  onChange: (code: string) => void;
  length?: number;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  error,
}) => {
  const inputs = useRef<Array<TextInput | null>>([]);
  const digits = value.padEnd(length, ' ').slice(0, length).split('');

  const updateDigit = (index: number, digit: string) => {
    const next = digits.map((d, i) => (i === index ? digit : d.trim())).join('');
    onChange(next.replace(/\s/g, '').slice(0, length));
  };

  const handleChange = (index: number, text: string) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    updateDigit(index, digit);
    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index]?.trim() && index > 0) {
      inputs.current[index - 1]?.focus();
      updateDigit(index - 1, '');
    }
  };

  return (
    <View>
      <View style={otpStyles.row}>
        {Array.from({ length }).map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            style={[
              otpStyles.box,
              digits[index]?.trim() && otpStyles.boxFilled,
              error && otpStyles.boxError,
            ]}
            value={digits[index]?.trim() || ''}
            onChangeText={(text) => handleChange(index, text)}
            onKeyPress={(e) => handleKeyPress(index, e)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
          />
        ))}
      </View>
      {error && <Text style={authStyles.errorText}>{error}</Text>}
    </View>
  );
};

const otpStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  box: {
    width: 46,
    height: 54,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
  },
  boxFilled: {
    borderColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  boxError: {
    borderColor: '#EF4444',
  },
});

export default OtpInput;
