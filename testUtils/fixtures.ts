import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';

export const rangeStartTomorrow = convertHoursToTimestamp(9, 0, 1);
export const rangeEndTomorrow = convertHoursToTimestamp(18, 0, 1);

export const rangeStart = convertHoursToTimestamp(9);
export const rangeEnd = convertHoursToTimestamp(18);

export const startTimestamp = 1785564000000; // 09:00 01.08.2026
export const endTimestamp = 1785596400000; // 18:00 01.08.2026

export const nowMs = 1785567600000; // 10:00 01.08.2026
export const previousDayStartTimestamp = 1785477600000; // 09:00 31.07.2026

export const nextDayStartTimestamp = 1785650400000; // 09:00 02.08.2026
export const nextDayEndTimestamp = 1785682800000; // 09:00 02.08.2026
