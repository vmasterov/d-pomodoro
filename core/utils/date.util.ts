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
