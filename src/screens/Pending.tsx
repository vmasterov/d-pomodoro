import { Layout } from '@/components/Layout';
import type { TUseMachineReturn } from '@/types/useMachineReturn.type';
import type { TPendingSnapshot } from '@core/types/snapshot.type';
import { buttonVariant } from '@/constants/component.const';
import { Button } from '@/components/Button';
import { Clock } from '@/components/Clock';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme.const';
import { convertDateToFormattedString } from '@core/utils/date.util';

type TPendingProps = {
  nowMs: number;
  reset: TUseMachineReturn['reset'];
  workStart: TUseMachineReturn['workStart'];
  rangeStart: TPendingSnapshot['rangeStart'];
};

export function Pending({ nowMs, rangeStart, reset, workStart }: TPendingProps) {
  const formattedTime = convertDateToFormattedString(new Date(rangeStart));

  const isWorkStartButtonDisabled = nowMs < rangeStart;

  return (
    <Layout title="Ожидание начала">
      <View>
        <Text style={styles.label}>Работа начнётся в</Text>
        <Clock formattedTime={formattedTime} />
      </View>

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
    </Layout>
  );
}
const styles = StyleSheet.create({
  label: {
    ...theme.typography.label,
    textAlign: 'center',
    color: theme.color.mutedText,
  },
});
