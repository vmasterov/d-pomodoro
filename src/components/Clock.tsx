import { StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme.const';
import type { TClockProps } from '@/types/components/clock';

export function Clock({ formattedTime }: TClockProps) {
  return <Text style={styles.clock}>{formattedTime}</Text>;
}

const styles = StyleSheet.create({
  clock: {
    ...theme.typography.clock,
    textAlign: 'center',
  },
});
