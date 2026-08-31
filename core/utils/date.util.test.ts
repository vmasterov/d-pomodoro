import { test, describe, expect } from 'vitest';
import {
  nextDayStartTimestamp,
  nowMs,
  previousDayStartTimestamp,
  startTimestamp,
} from '@testUtils/fixtures';
import {
  convertDateToFormattedTime,
  convertRemainingMsToFormattedTime,
  getTimeFromTimestamp,
} from '@core/utils/date.util';

describe('Тестирование функций date utils', () => {
  describe('getTimeFromTimestamp', () => {
    const cases: [string, number, number, number, number][] = [
      [
        'Timestamp с прошедшей датой -> timestamp c текущей датой',
        nowMs,
        previousDayStartTimestamp,
        0,
        startTimestamp,
      ],
      [
        'При offset 1 -> timestamp c датой следующего дня',
        nowMs,
        startTimestamp,
        1,
        nextDayStartTimestamp,
      ],
      [
        'При offset 1 и конце месяца -> корректный переход на следующий месяц',
        previousDayStartTimestamp,
        previousDayStartTimestamp,
        1,
        startTimestamp,
      ],
    ];
    test.each(cases)('%s', (_label, nowMs, startTimestamp, dayOffset, expectedTimestamp) => {
      expect(getTimeFromTimestamp(nowMs, startTimestamp, dayOffset)).toBe(expectedTimestamp);
    });
  });

  describe('convertDateToFormattedTime', () => {
    const cases: [string, Date, string][] = [
      ['01.01.2026 00:00 -> 00:00', new Date(2026, 0, 1), '00:00'],
      ['29.02.2024 23:59 -> 23:59', new Date(2024, 1, 29, 23, 59), '23:59'],
      ['05.08.2026 17:15 -> 17:15', new Date(2026, 7, 5, 17, 15), '17:15'],
    ];
    test.each(cases)('%s', (_label, date, expectedFormattedTime) => {
      expect(convertDateToFormattedTime(date)).toBe(expectedFormattedTime);
    });
  });

  describe('convertRemainingMsToFormattedTime', () => {
    const cases: [string, number, string][] = [
      ['remainingMs > 0', 186052, '03:07'],
      ['remainingMs === 0', 0, '00:00'],
      ['remainingMs < 0', -186052, '03:06'],
      ['почти минута (59999) -> 01:00', 59999, '01:00'],
      ['меньше секунды -> 00:01', 999, '00:01'],
    ];
    test.each(cases)('%s', (_label, remainingMs, expectedFormattedTime) => {
      expect(convertRemainingMsToFormattedTime(remainingMs)).toBe(expectedFormattedTime);
    });
  });
});
