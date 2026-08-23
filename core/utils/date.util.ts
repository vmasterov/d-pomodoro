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

export function convertTimestampToFormatedString(date: Date): string {
  const formatHours = String(date.getHours()).padStart(2, '0');
  const formatMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${formatHours}:${formatMinutes}`;
}
