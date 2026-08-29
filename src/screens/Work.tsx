import { Text, StyleSheet } from 'react-native';
import { Layout } from '@/components/Layout';
import type { TWorkProps } from '@/types/screens/work.type';
import { Button } from '@/components/Button';
import { buttonVariant } from '@/constants/component.const';
import { theme } from '@/constants/theme.const';
import { Fragment } from 'react';
import { getWorkRestData } from '@/utils/getWorkRestData';
import { WorkRestClock } from '@/components/WorkRestClock';
import type { TRestKind } from '@core/types/common.type';
import { restDuration } from '@core/constants/segment.const';

export function Work({ restStart, reset, nowMs, snapshot }: TWorkProps) {
  const {
    formattedTime,
    primaryKind,
    secondaryKind,
    recommendedRestText,
    isNegativeTime,
    restInfoText,
    isMoreHourDowntime,
  } = getWorkRestData(snapshot, nowMs);

  const getRestButtonText = (kind: TRestKind) => {
    return `Отдых ${restDuration[kind]} мин`;
  };

  return (
    <Layout
      title="Работа"
      content={
        <WorkRestClock
          isMoreHourDowntime={isMoreHourDowntime}
          infoText={restInfoText}
          formattedTime={formattedTime}
          isNegativeTime={isNegativeTime}
        />
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
});
