import { StyleSheet, Text, TextInput, View } from 'react-native';
import { convertValueToString } from '@/utils/convertValueToString';
import { theme } from '@/constants/theme.const';
import type { TInputFieldProps } from '@/types/components/inputField.type';

export function InputField({ onChangeText, name, value, label, error }: TInputFieldProps) {
  const inputStyle = [styles.textInput, Boolean(error) && styles.textInputError];

  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <TextInput
        style={inputStyle}
        onChangeText={(value) => onChangeText(value, name)}
        value={convertValueToString(value)}
        keyboardType="number-pad"
      />
      <Text style={styles.errorText} numberOfLines={1}>
        {error ?? ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldWrapper: {
    gap: theme.spacing.gap.s,
  },
  label: {
    ...theme.typography.label,
    color: theme.color.mutedText,
  },
  textInput: {
    ...theme.typography.inputValue,
    color: theme.color.primaryText,
    borderColor: theme.color.border,
    borderRadius: theme.spacing.radius.field,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.padding.field.horizontal,
    paddingVertical: theme.spacing.padding.field.vertical,
  },
  textInputError: {
    borderColor: theme.color.danger,
  },
  errorText: {
    ...theme.typography.label,
    color: theme.color.danger,
    minHeight: theme.typography.label.lineHeight,
  },
});
