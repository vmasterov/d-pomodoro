import { test, describe, expect } from 'vitest';
import type { TFinishedSnapshot, TSetupSnapshot, TWorkSnapshot } from '../types/snapshot.type';
import { machineState } from '../constants/machine.const';
import type { TRangeFinishEvent, TResetEvent } from '../types/events.type';
import { eventType } from '../constants/events.const';
import { convertHoursToTimestamp } from '../testUtils/convertHoursToTimestamp';
import { reduceWork } from './reduceWork';

describe('Тестирование reduceWork', () => {
  test('Если текущее время БОЛЬШЕ окончания диапазона, при получении события RANGE_FINISH система переходит в состояние FINISHED', () => {
    const nowMs = convertHoursToTimestamp(19);

    const rangeStart = convertHoursToTimestamp(9);
    const rangeEnd = convertHoursToTimestamp(18);

    const workSnapshot: TWorkSnapshot = {
      state: machineState.WORK,
      rangeStart,
      rangeEnd,
      segmentStart: convertHoursToTimestamp(17),
      workSegmentCount: 0,
    };

    const rangeFinishEvent: TRangeFinishEvent = {
      type: eventType.RANGE_FINISH,
    };

    const finishedSnapshot: TFinishedSnapshot = {
      state: machineState.FINISHED,
      rangeStart,
      rangeEnd,
    };

    expect(reduceWork(workSnapshot, rangeFinishEvent, nowMs)).toEqual(finishedSnapshot);
  });

  test('Если текущее время МЕНЬШЕ окончания диапазона, при получении события RANGE_FINISH система возвращает исходный snapshot', () => {
    const nowMs = convertHoursToTimestamp(15);

    const rangeStart = convertHoursToTimestamp(9);
    const rangeEnd = convertHoursToTimestamp(18);

    const workSnapshot: TWorkSnapshot = {
      state: machineState.WORK,
      rangeStart,
      rangeEnd,
      segmentStart: convertHoursToTimestamp(14),
      workSegmentCount: 0,
    };

    const rangeFinishEvent: TRangeFinishEvent = {
      type: eventType.RANGE_FINISH,
    };

    expect(reduceWork(workSnapshot, rangeFinishEvent, nowMs)).toEqual(workSnapshot);
  });

  test('При получении события RESET система переходит в состояние SETUP', () => {
    const nowMs = convertHoursToTimestamp(19);

    const rangeStart = convertHoursToTimestamp(9);
    const rangeEnd = convertHoursToTimestamp(18);

    const workSnapshot: TWorkSnapshot = {
      state: machineState.WORK,
      rangeStart,
      rangeEnd,
      segmentStart: convertHoursToTimestamp(17),
      workSegmentCount: 0,
    };

    const rangeFinishEvent: TResetEvent = {
      type: eventType.RESET,
    };

    const setupSnapshot: TSetupSnapshot = {
      state: machineState.SETUP,
    };

    expect(reduceWork(workSnapshot, rangeFinishEvent, nowMs)).toEqual(setupSnapshot);
  });
});
