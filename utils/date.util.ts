export function convertMinutesToTimestamp(
  nowMs: number,
  totalMinutes: number,
  dayOffset = 0,
): number {
  const dateNow = new Date(nowMs);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return new Date(
    dateNow.getFullYear(),
    dateNow.getMonth(),
    dateNow.getDate() + dayOffset,
    hours,
    minutes,
  ).getTime();
}
