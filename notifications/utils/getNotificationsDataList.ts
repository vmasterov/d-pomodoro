import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { convertDateToFormattedTime } from '@core/utils/date.util';
import { restDuration, workDuration } from '@core/constants/segment.const';
import { MS_PER_5_MINUTES, MS_PER_MINUTE } from '@core/constants/common.const';
import type { TAddRangeEndNotificationProps, TScheduleNotification } from '../notifications.type';

const addRangeEndNotification = ({
  rangeStart,
  rangeEnd,
  notifications,
  nowMs,
}: TAddRangeEndNotificationProps) => {
  const formattedRangeStart = convertDateToFormattedTime(new Date(rangeStart));
  const formattedRangeEnd = convertDateToFormattedTime(new Date(rangeEnd));

  if (rangeEnd > nowMs) {
    notifications.push({
      title: 'День окончен',
      body: `Рабочий диапазон ${formattedRangeStart}–${formattedRangeEnd} завершён`,
      date: rangeEnd,
    });
  }
};

export function getNotificationsDataList(
  snapshot: TSnapshot,
  nowMs: number,
): TScheduleNotification[] {
  const notifications: TScheduleNotification[] = [];

  switch (snapshot.state) {
    case machineState.PENDING: {
      if (snapshot.rangeStart > nowMs) {
        notifications.push({
          title: 'Пора начинать работу',
          body: `Откройте приложение и запустите рабочий сегмент.`,
          date: snapshot.rangeStart,
        });
      }

      addRangeEndNotification({
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        notifications,
        nowMs,
      });
      break;
    }
    case machineState.WORK: {
      addRangeEndNotification({
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        notifications,
        nowMs,
      });

      const notificationWorkTimestamp = snapshot.segmentStart + workDuration;

      if (notificationWorkTimestamp > nowMs && notificationWorkTimestamp < snapshot.rangeEnd) {
        notifications.push({
          title: 'Пора отдохнуть',
          body: `Рабочий сегмент завершён. Откройте приложение и выберите перерыв.`,
          date: notificationWorkTimestamp,
        });
      }

      const fiveMinutesNotificationWorkTimestamp =
        snapshot.segmentStart + workDuration - MS_PER_5_MINUTES;

      if (
        fiveMinutesNotificationWorkTimestamp > nowMs &&
        fiveMinutesNotificationWorkTimestamp < snapshot.rangeEnd
      ) {
        notifications.push({
          title: 'Скоро перерыв',
          body: `Через 5 минут — время отвлечься от компьютера.`,
          date: fiveMinutesNotificationWorkTimestamp,
        });
      }

      break;
    }
    case machineState.REST: {
      addRangeEndNotification({
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        notifications,
        nowMs,
      });

      const currentRestDuration = restDuration[snapshot.restKind] * MS_PER_MINUTE;
      const notificationRestTimestamp = snapshot.segmentStart + currentRestDuration;

      if (notificationRestTimestamp > nowMs && notificationRestTimestamp < snapshot.rangeEnd) {
        notifications.push({
          title: 'Пора вернуться к работе',
          body: `Отдых завершён. Откройте приложение и запустите рабочий сегмент.`,
          date: notificationRestTimestamp,
        });
      }

      break;
    }
  }

  return notifications;
}
