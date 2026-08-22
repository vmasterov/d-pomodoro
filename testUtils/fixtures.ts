import { convertHoursToTimestamp } from './convertHoursToTimestamp';

export const rangeStart = convertHoursToTimestamp(9);
export const rangeEnd = convertHoursToTimestamp(18);

export const rangeStartTomorrow = convertHoursToTimestamp(9, 0, 1);
export const rangeEndTomorrow = convertHoursToTimestamp(18, 0, 1);

export const startTimestamp = 1792648800000;
export const endTimestamp = 1792681200000;
