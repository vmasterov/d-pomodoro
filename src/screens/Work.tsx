import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TWorkProps } from '@/types/screens/work.type';
import { recommendedRest, remainingMs } from '@core/selectors/selectors';
import { Clock } from '@/components/Clock';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { theme } from '@/constants/theme.const';
import { restDuration, restKind } from '@core/constants/segment.const';
import type { TRestKind } from '@core/types/common.type';
import { convertRemainingMsToFormattedTime } from '@core/utils/date.util';
import { Fragment } from 'react';
import { MS_PER_HOUR } from '@core/constants/common.const';

export function Work({ restStart, reset, nowMs, snapshot }: TWorkProps) {
  const currentRemainingMs = remainingMs(snapshot, nowMs);
  const formattedTime = convertRemainingMsToFormattedTime(currentRemainingMs);

  const primaryKind: TRestKind = recommendedRest(snapshot.workSegmentCount);
  const secondaryKind: TRestKind = primaryKind === restKind.SHORT ? restKind.LONG : restKind.SHORT;

  const getRestButtonText = (kind: TRestKind) => {
    return `Отдых ${restDuration[kind]} мин`;
  };

  const recommendedRestText =
    primaryKind === restKind.SHORT
      ? 'Рекомендуется короткий перерыв'
      : 'Рекомендуется длинный перерыв';

  const isNegativeTime = currentRemainingMs < 0;

  const restInfoText = isNegativeTime ? 'Перерыв просрочен на' : 'До перерыва';

  const isMoreHourDowntime = Math.abs(currentRemainingMs) >= MS_PER_HOUR;

  return (
    <Layout
      title="Работа"
      content={
        <View>
          {isMoreHourDowntime ? (
            <Text style={styles.moreHourDowntime}>Простой более часа</Text>
          ) : (
            <Fragment>
              <Text style={styles.label}>{restInfoText}</Text>
              <Clock formattedTime={formattedTime} isNegative={isNegativeTime} />
            </Fragment>
          )}
        </View>
      }
      controls={
        <Fragment>
          <Text style={styles.label}>{recommendedRestText}</Text>

          <Button onPress={() => restStart(primaryKind)} variant={buttonVariant.ACCENT}>
            {getRestButtonText(primaryKind)}
          </Button>

          <Button onPress={() => restStart(secondaryKind)} variant={buttonVariant.DEFAULT}>
            {getRestButtonText(secondaryKind)}
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

  moreHourDowntime: {
    ...theme.typography.moreHourDowntime,
    textAlign: 'center',
    color: theme.color.danger,
  },
});
