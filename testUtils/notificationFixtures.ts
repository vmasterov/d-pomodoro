import { rangeEnd, rangeStart } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { convertDateToFormattedTime } from '@core/utils/date.util';
import type { TScheduleNotification } from '@notifications/notifications.type';

export const nowMsList = [
  convertHoursToTimestamp(8),
  convertHoursToTimestamp(9, 1),
  convertHoursToTimestamp(9, 27),
  convertHoursToTimestamp(17, 40),
  convertHoursToTimestamp(18, 1),
];

export const eveningWorkStart = convertHoursToTimestamp(17, 35);
export const eveningRestLongStart = convertHoursToTimestamp(17, 41);
export const eveningRestShortStart = convertHoursToTimestamp(17, 40);

const formattedRangeStart = convertDateToFormattedTime(new Date(rangeStart));
const formattedRangeEnd = convertDateToFormattedTime(new Date(rangeEnd));

export const endRangeNotification: TScheduleNotification = {
  title: 'День окончен',
  body: `Рабочий диапазон ${formattedRangeStart}–${formattedRangeEnd} завершён`,
  date: rangeEnd,
};

export const startRangeNotification: TScheduleNotification = {
  title: 'Пора начинать работу',
  body: `Откройте приложение и запустите рабочий сегмент.`,
  date: rangeStart,
};

export const workEndNotification = (date: number): TScheduleNotification => ({
  title: 'Пора отдохнуть',
  body: `Рабочий сегмент завершён. Откройте приложение и выберите перерыв.`,
  date,
});

export const workSoonNotification = (date: number): TScheduleNotification => ({
  title: 'Скоро перерыв',
  body: `Через 5 минут — время отвлечься от компьютера.`,
  date,
});

export const restEndNotification = (date: number): TScheduleNotification => ({
  title: 'Пора вернуться к работе',
  body: `Отдых завершён. Откройте приложение и запустите рабочий сегмент.`,
  date,
});
