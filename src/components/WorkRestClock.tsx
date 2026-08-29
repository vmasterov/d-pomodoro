import { StyleSheet, Text, View } from 'react-native';
import { Fragment } from 'react';
import { Clock } from '@/components/Clock';
import { theme } from '@/constants/theme.const';
import type { TWorkRestClockProps } from '@/types/components/workRestClock.type';

export function WorkRestClock({
  isMoreHourDowntime,
  infoText,
  formattedTime,
  isNegativeTime,
}: TWorkRestClockProps) {
  return (
    <View>
      {isMoreHourDowntime ? (
        <Text style={styles.moreHourDowntime}>Простой более часа</Text>
      ) : (
        <Fragment>
          <Text style={styles.label}>{infoText}</Text>
          <Clock formattedTime={formattedTime} isNegative={isNegativeTime} />
        </Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    textAlign: 'center',
    color: theme.color.mutedText,
  },

  moreHourDowntime: {
    ...theme.typography.moreHourDowntime,
    textAlign: 'center',
    color: theme.color.danger,
  },
});
