import { convertDateToFormattedTime } from '@core/utils/date.util';
import type { TGetRangeEndNotificationProps } from '@notifications/notifications.type';

export const getRangeEndNotification = ({
  rangeStart,
  rangeEnd,
}: TGetRangeEndNotificationProps) => {
  const formattedRangeStart = convertDateToFormattedTime(new Date(rangeStart));
  const formattedRangeEnd = convertDateToFormattedTime(new Date(rangeEnd));

  return {
    title: 'День окончен',
    body: `Рабочий диапазон ${formattedRangeStart}–${formattedRangeEnd} завершён`,
    date: rangeEnd,
  };
};
