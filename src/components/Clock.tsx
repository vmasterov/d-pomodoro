import { StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme.const';
import type { TClockProps } from '@/types/components/clock';

export function Clock({ formattedTime, isNegative }: TClockProps) {
  const clockStyle = [styles.clock, isNegative ? { color: theme.color.danger } : {}];
  return <Text style={clockStyle}>{formattedTime}</Text>;
}

const styles = StyleSheet.create({
  clock: {
    ...theme.typography.clock,
    textAlign: 'center',
  },
});
