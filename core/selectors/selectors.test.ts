import { describe, test, expect } from 'vitest';
import { isRangeOver, recommendedRest, remainingMs } from '@core/selectors/selectors';
import type { TRestSnapshot, TWorkSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { rangeEnd, rangeStart } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { MS_PER_MINUTE } from '@core/constants/common.const';
import { restKind } from '@core/constants/segment.const';

describe('Тестирование selectors', () => {
  describe('Функция remainingMs', () => {
    describe('WORK', () => {
      const cases: [string, number, number][] = [
        [
          'осталось 10 минут до конца сегмента',
          convertHoursToTimestamp(15, 20),
          10 * MS_PER_MINUTE,
        ],
        ['осталось 0 минут до конца сегмента', convertHoursToTimestamp(15, 30), 0],
        ['сегмент завершился 5 минут назад', convertHoursToTimestamp(15, 35), -5 * MS_PER_MINUTE],
      ];

      test.each(cases)('%s', (_label, nowMs, expectedMs) => {
        const workSnapshot: TWorkSnapshot = {
          state: machineState.WORK,
          rangeStart,
          rangeEnd,
          segmentStart: convertHoursToTimestamp(15),
          workSegmentCount: 2,
        };

        expect(remainingMs(workSnapshot, nowMs)).toBe(expectedMs);
      });
    });

    describe('REST: LONG', () => {
      const cases: [string, number, number][] = [
        ['осталось 3 минуты до конца сегмента', convertHoursToTimestamp(15, 2), 3 * MS_PER_MINUTE],
        ['осталось 0 минут до конца сегмента', convertHoursToTimestamp(15, 5), 0],
        ['сегмент завершился 5 минут назад', convertHoursToTimestamp(15, 10), -5 * MS_PER_MINUTE],
      ];

      test.each(cases)('%s', (_label, nowMs, expectedMs) => {
        const restLongSnapshot: TRestSnapshot = {
          state: machineState.REST,
          rangeStart,
          rangeEnd,
          restKind: restKind.LONG,
          segmentStart: convertHoursToTimestamp(15),
          workSegmentCount: 2,
        };

        expect(remainingMs(restLongSnapshot, nowMs)).toBe(expectedMs);
      });
    });

    describe('REST: SHORT', () => {
      const cases: [string, number, number][] = [
        ['осталось 1 минута до конца сегмента', convertHoursToTimestamp(15, 1), 1 * MS_PER_MINUTE],
        ['осталось 0 минут до конца сегмента', convertHoursToTimestamp(15, 2), 0],
        ['сегмент завершился 5 минут назад', convertHoursToTimestamp(15, 7), -5 * MS_PER_MINUTE],
      ];

      test.each(cases)('%s', (_label, nowMs, expectedMs) => {
        const restShortSnapshot: TRestSnapshot = {
          state: machineState.REST,
          rangeStart,
          rangeEnd,
          restKind: restKind.SHORT,
          segmentStart: convertHoursToTimestamp(15),
          workSegmentCount: 2,
        };

        expect(remainingMs(restShortSnapshot, nowMs)).toBe(expectedMs);
      });
    });
  });

  describe('Функция isRangeOver', () => {
    const cases: [string, number, boolean][] = [
      ['nowMs > rangeEnd', convertHoursToTimestamp(19), true],
      ['nowMs = rangeEnd', rangeEnd, true],
      ['nowMs < rangeEnd', convertHoursToTimestamp(15), false],
    ];

    test.each(cases)('%s', (_label, nowMs, result) => {
      expect(isRangeOver(rangeEnd, nowMs)).toBe(result);
    });
  });

  describe('Функция recommendedRest', () => {
    describe('Четные сегменты', () => {
      const cases = [[0], [2], [4]];

      test.each(cases)('(%s) -> короткий отдых', (workSegmentCount) => {
        expect(recommendedRest(workSegmentCount)).toBe(restKind.SHORT);
      });
    });

    describe('Нечетные сегменты', () => {
      const cases = [[1], [3], [5]];

      test.each(cases)('(%s) -> длинный отдых', (workSegmentCount) => {
        expect(recommendedRest(workSegmentCount)).toBe(restKind.LONG);
      });
    });
  });
});
