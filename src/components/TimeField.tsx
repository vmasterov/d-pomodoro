import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@/components/Button';
import { theme } from '@/constants/theme.const';
import type { TTimeFieldProps } from '@/types/components/timeField.type';
import { buttonMod, buttonVariant } from '@/constants/component.const';

export function TimeField({ onPress, formattedTime, label, error }: TTimeFieldProps) {
  const variant = error ? buttonVariant.DANGER : buttonVariant.DEFAULT;
  const labelStyle = error ? styles.errorText : styles.label;

  return (
    <View style={styles.fieldWrapper}>
      <Text style={labelStyle}>{label}</Text>
      <Button onPress={onPress} mod={buttonMod.FIELD} variant={variant}>
        {formattedTime}
      </Button>
      {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    color: theme.color.mutedText,
  },
  fieldWrapper: {
    gap: theme.spacing.gap.s,
  },
  errorText: {
    ...theme.typography.label,
    color: theme.color.danger,
  },
});
