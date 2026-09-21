import { StyleSheet, Text, TextInput } from 'react-native';
import { convertValueToString } from '@/utils/convertValueToString';
import { theme } from '@/constants/theme.const';
import type { TInputFieldProps } from '@/types/components/inputField.type';

export function InputField({ onChangeText, name, value, label, error }: TInputFieldProps) {
  return (
    <>
      <Text>{label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => onChangeText(value, name)}
        value={convertValueToString(value)}
        keyboardType="number-pad"
      />
      <Text>{error}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: theme.color.primaryText,
    borderColor: theme.color.mutedText,
    borderRadius: theme.spacing.radius.field,
    borderWidth: 1,
  },
});
