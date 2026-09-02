import { cancelAllScheduledNotifications, scheduleNotification } from './notifications';
import { getNotificationsDataList } from './utils/getNotificationsDataList';
import type { TSnapshot } from '@core/types/snapshot.type';

export async function setNotification(snapshot: TSnapshot, nowMs: number) {
  await cancelAllScheduledNotifications();

  const notifications = getNotificationsDataList(snapshot, nowMs);

  const scheduleNotificationsPromises = [];

  for (const notification of notifications) {
    scheduleNotificationsPromises.push(scheduleNotification(notification));
  }

  await Promise.all(scheduleNotificationsPromises);
}
