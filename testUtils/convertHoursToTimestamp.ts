import { date } from '@testUtils/baseDate';

export function convertHoursToTimestamp(h: number, m = 0, dayOffset = 0): number {
  const y = date.getFullYear();
  const M = date.getMonth();
  const d = date.getDate();

  return new Date(y, M, d + dayOffset, h, m).getTime();
}
