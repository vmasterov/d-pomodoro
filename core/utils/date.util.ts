import { MS_PER_MINUTE } from '@core/constants/common.const';

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

export function convertDateToFormattedString(date: Date): string {
  const formatHours = String(date.getHours()).padStart(2, '0');
  const formatMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${formatHours}:${formatMinutes}`;
}

export function convertRemainingMsToFormattedSting(ms: number) {
  const positiveMs = ms < 0 ? ms * -1 : ms;
  const formatMinutes = String(Math.floor(positiveMs / 1000 / 60)).padStart(2, '0');
  const formatSeconds = String(Math.floor((positiveMs % MS_PER_MINUTE) / 1000)).padStart(2, '0');

  return `${formatMinutes}:${formatSeconds}`;
}
