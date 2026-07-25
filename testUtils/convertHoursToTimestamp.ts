export const convertHoursToTimestamp = (h: number, dayOffset = 0): number => {
  const now = new Date('2026-07-21T00:00:00');

  const y = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();

  return new Date(y, m, d + dayOffset, h).getTime();
};
