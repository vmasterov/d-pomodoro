export const convertHoursToTimestamp = (h: number, m = 0, dayOffset = 0): number => {
  const now = new Date('2026-07-21T00:00:00');

  const y = now.getFullYear();
  const M = now.getMonth();
  const d = now.getDate();

  return new Date(y, M, d + dayOffset, h, m).getTime();
};
