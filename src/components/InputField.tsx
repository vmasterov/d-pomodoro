import { StyleSheet, Text, TextInput } from 'react-native';
import { convertValueToString } from '@/utils/convertValueToString';
import { theme } from '@/constants/theme.const';
import type { TPossibleEmptySegmentIntervals } from '@core/types/common.type';

export type TInputFieldProps = {
  onChangeText: (value: string, name: keyof TPossibleEmptySegmentIntervals) => void;
  name: keyof TPossibleEmptySegmentIntervals;
  value: number | null;
  label: string;
  error: string | null;
};

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
