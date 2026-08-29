import { Layout } from '@/components/Layout';
import type { TRestProps } from '@/types/screens/rest.type';
import { Button } from '@/components/Button';
import { Fragment } from 'react';
import { buttonVariant } from '@/constants/component.const';
import { getWorkRestData } from '@/utils/getWorkRestData';
import { WorkRestClock } from '@/components/WorkRestClock';

export function Rest({ workStart, reset, nowMs, snapshot }: TRestProps) {
  const { formattedTime, isNegativeTime, workInfoText, isMoreHourDowntime } = getWorkRestData(
    snapshot,
    nowMs,
  );

  return (
    <Layout
      title="Отдых"
      content={
        <WorkRestClock
          isMoreHourDowntime={isMoreHourDowntime}
          infoText={workInfoText}
          formattedTime={formattedTime}
          isNegativeTime={isNegativeTime}
        />
      }
      controls={
        <Fragment>
          <Button onPress={workStart} variant={buttonVariant.ACCENT}>
            Вернуться к работе
          </Button>

          <Button onPress={reset} variant={buttonVariant.DANGER}>
            Выключить
          </Button>
        </Fragment>
      }
    />
  );
}
