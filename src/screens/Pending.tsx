import { Layout } from '@/components/Layout';
import { buttonVariant } from '@/constants/component.const';
import { Button } from '@/components/Button';
import { Clock } from '@/components/Clock';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme.const';
import { convertDateToFormattedTime } from '@core/utils/date.util';
import type { TPendingProps } from '@/types/screens/pending.type';
import { Fragment } from 'react';

export function Pending({ nowMs, rangeStart, reset, workStart }: TPendingProps) {
  const formattedTime = convertDateToFormattedTime(new Date(rangeStart));

  const isWorkStartButtonDisabled = nowMs < rangeStart;

  return (
    <Layout
      title="Ожидание начала"
      content={
        <View>
          <Text style={styles.label}>Работа начнётся в</Text>
          <Clock formattedTime={formattedTime} />
        </View>
      }
      controls={
        <Fragment>
          <Button
            onPress={workStart}
            variant={buttonVariant.ACCENT}
            disabled={isWorkStartButtonDisabled}
          >
            Начать работу
          </Button>

          <Button onPress={reset} variant={buttonVariant.DANGER}>
            Выключить
          </Button>
        </Fragment>
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
});
