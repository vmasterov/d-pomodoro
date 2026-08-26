import { StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme.const';

export type TClockProps = {
  formattedTime: string;
};

export function Clock({ formattedTime }: TClockProps) {
  return <Text style={styles.clock}>{formattedTime}</Text>;
}

const styles = StyleSheet.create({
  clock: {
    ...theme.typography.clock,
    textAlign: 'center',
  },
});
