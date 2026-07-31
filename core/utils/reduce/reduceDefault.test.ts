import { describe, test, expect } from 'vitest';
import { reduceDefault } from '@core/utils/reduce/reduceDefault.util';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { eventType } from '@core/constants/events.const';
import type { TWorkSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { rangeEnd, rangeStart } from '@testUtils/fixtures';
import { silenceConsoleWarn } from '@testUtils/silenceConsoleWarn';

const spyConsoleWarn = silenceConsoleWarn();

const nowMs = convertHoursToTimestamp(15);
const workSnapshot: TWorkSnapshot = {
  state: machineState.WORK,
  rangeStart,
  rangeEnd,
  segmentStart: nowMs,
  workSegmentCount: 2,
};

describe('Тестирование reduceDefault', () => {
  test('Возвращает тот же snapshot (не копию)', () => {
    expect(reduceDefault(workSnapshot, eventType.WORK_START)).toBe(workSnapshot);
  });

  test('Вызывает console.warn с текстом "work_start is invalid here"', () => {
    reduceDefault(workSnapshot, eventType.WORK_START);
    expect(spyConsoleWarn()).toHaveBeenCalledTimes(1);
    expect(spyConsoleWarn()).toHaveBeenCalledWith(`${eventType.WORK_START} is invalid here`);
  });
});
