import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { MS_PER_5_MINUTES } from '@core/constants/common.const';
import type { TScheduleNotification } from '../notifications.type';
import { getRangeEndNotification } from './getRangeEndNotification';
import { segmentDurationMs } from '@core/selectors/selectors';

export function getNotificationsDataList(
  snapshot: TSnapshot,
  nowMs: number,
): TScheduleNotification[] {
  const notifications: TScheduleNotification[] = [];
  const { state } = snapshot;

  if (
    (state === machineState.PENDING ||
      state === machineState.WORK ||
      state === machineState.REST) &&
    snapshot.rangeEnd > nowMs
  ) {
    const rangeEndNotification = getRangeEndNotification({
      rangeStart: snapshot.rangeStart,
      rangeEnd: snapshot.rangeEnd,
    });

    notifications.push(rangeEndNotification);
  }

  switch (state) {
    case machineState.PENDING: {
      const { rangeStart } = snapshot;

      if (rangeStart > nowMs) {
        notifications.push({
          title: 'Пора начинать работу',
          body: `Откройте приложение и запустите рабочий сегмент.`,
          date: rangeStart,
        });
      }

      break;
    }
    case machineState.WORK: {
      const { rangeEnd, segmentStart } = snapshot;
      const notificationWorkTimestamp = segmentDurationMs(snapshot) + segmentStart;

      if (notificationWorkTimestamp > nowMs && notificationWorkTimestamp < rangeEnd) {
        notifications.push({
          title: 'Пора отдохнуть',
          body: `Рабочий сегмент завершён. Откройте приложение и выберите перерыв.`,
          date: notificationWorkTimestamp,
        });
      }

      const fiveMinutesNotificationWorkTimestamp =
        segmentDurationMs(snapshot) + segmentStart - MS_PER_5_MINUTES;

      if (
        fiveMinutesNotificationWorkTimestamp > nowMs &&
        fiveMinutesNotificationWorkTimestamp < rangeEnd
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
      const { rangeEnd, segmentStart } = snapshot;

      const notificationRestTimestamp = segmentStart + segmentDurationMs(snapshot);

      if (notificationRestTimestamp > nowMs && notificationRestTimestamp < rangeEnd) {
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
