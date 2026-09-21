import { MS_PER_SECOND, SECONDS_PER_MINUTE } from '@core/constants/common.const';
import type { TConvertHoursToTimestamp } from '@core/types/utils.type';

export function getTimeFromTimestamp(nowMs: number, timestamp: number, dayOffset = 0): number {
  const dateNow = new Date(nowMs);
  const dateFromTimestamp = new Date(timestamp);

  return new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate() + dayOffset,
    dateFromTimestamp.getHours(),
    dateFromTimestamp.getMinutes(),
  ).getTime();
}

export function convertDateToFormattedTime(date: Date): string {
  const formatHours = String(date.getHours()).padStart(2, '0');
  const formatMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${formatHours}:${formatMinutes}`;
}

export function convertRemainingMsToFormattedTime(ms: number): string {
  const absMs = Math.abs(ms);
  const rawTotalSeconds = absMs / MS_PER_SECOND;
  const isDowntime = ms <= 0;
  const totalSeconds = isDowntime ? Math.floor(rawTotalSeconds) : Math.ceil(rawTotalSeconds);

  const minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE);
  const seconds = Math.floor(totalSeconds % SECONDS_PER_MINUTE);

  const formatMinutes = String(minutes).padStart(2, '0');
  const formatSeconds = String(seconds).padStart(2, '0');

  return `${formatMinutes}:${formatSeconds}`;
}

export function convertHoursToTimestamp({
  h,
  m = 0,
  date,
  dayOffset = 0,
}: TConvertHoursToTimestamp): number {
  const y = date.getFullYear();
  const M = date.getMonth();
  const d = date.getDate();

  return new Date(y, M, d + dayOffset, h, m).getTime();
}
