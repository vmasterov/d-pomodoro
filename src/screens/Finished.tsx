import { StyleSheet, Text, View } from 'react-native';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/Button';
import type { TFinishedProps } from '@/types/screens/finished.type';
import { buttonVariant } from '@/constants/component.const';
import { convertDateToFormattedTime } from '@core/utils/date.util';
import { theme } from '@/constants/theme.const';

export function Finished({ finishConfirm, rangeStart, rangeEnd }: TFinishedProps) {
  const formattedRangeStart = convertDateToFormattedTime(new Date(rangeStart));
  const formattedRangeEnd = convertDateToFormattedTime(new Date(rangeEnd));

  return (
    <Layout
      title="День окончен"
      content={
        <View>
          <Text style={styles.label}>Рабочий диапазон</Text>
          <Text
            style={styles.finishedTimeRange}
          >{`${formattedRangeStart}–${formattedRangeEnd}`}</Text>
          <Text style={styles.label}>завершён</Text>
        </View>
      }
      controls={
        <Button onPress={finishConfirm} variant={buttonVariant.ACCENT}>
          Начать заново
        </Button>
      }
    />
  );
}

const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    textAlign: 'center',
    color: theme.color.mutedText,
  },
  finishedTimeRange: {
    ...theme.typography.finishedTimeRange,
    textAlign: 'center',
    paddingVertical: 12,
  },
});
