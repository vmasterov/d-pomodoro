import { test, describe, expect } from 'vitest';
import { reduceRest } from './reduceRest';
import { machineState } from '../constants/machine.const';
import { eventType } from '../constants/events.const';
import type {
  TFinishedSnapshot,
  TRestSnapshot,
  TSetupSnapshot,
  TWorkSnapshot,
} from '../types/snapshot.type';
import type { TEvent, TRangeFinishEvent, TResetEvent, TWorkStartEvent } from '../types/events.type';
import { convertHoursToTimestamp } from '../../testUtils/convertHoursToTimestamp';
import { rangeStart, rangeEnd, startMinutes, endMinutes } from '../../testUtils/fixtures';
import { restKind } from '../constants/segment.const';

const restSnapshot: TRestSnapshot = {
  state: machineState.REST,
  rangeStart,
  rangeEnd,
  restKind: restKind.LONG,
  segmentStart: convertHoursToTimestamp(14),
  workSegmentCount: 2,
};

describe('Тестирование reduceRest', () => {
  describe('RESET', () => {
    test.each([
      ['now < rangeStart', convertHoursToTimestamp(8)],
      ['rangeStart <= now < rangeEnd', convertHoursToTimestamp(10)],
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('→ SETUP (%s)', (_label, nowMs) => {
      const resetEvent: TResetEvent = {
        type: eventType.RESET,
      };

      const setupSnapshot: TSetupSnapshot = {
        state: machineState.SETUP,
      };

      expect(reduceRest(restSnapshot, resetEvent, nowMs)).toEqual(setupSnapshot);
    });
  });

  describe('WORK_START', () => {
    test.each([
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('%s → снимок без изменений', (_label, nowMs) => {
      const workStartEvent: TWorkStartEvent = {
        type: eventType.WORK_START,
      };

      expect(reduceRest(restSnapshot, workStartEvent, nowMs)).toEqual(restSnapshot);
    });

    test('now < rangeEnd → WORK (workSegmentCount переносится без инкремента)', () => {
      const nowMs = convertHoursToTimestamp(15);

      const workStartEvent: TWorkStartEvent = {
        type: eventType.WORK_START,
      };

      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: nowMs,
        workSegmentCount: 2,
      };

      expect(reduceRest(restSnapshot, workStartEvent, nowMs)).toEqual(workSnapshot);
    });
  });

  describe('RANGE_FINISH', () => {
    test('now < rangeEnd → снимок без изменений', () => {
      const nowMs = convertHoursToTimestamp(15);

      const rangeFinishEvent: TRangeFinishEvent = {
        type: eventType.RANGE_FINISH,
      };

      expect(reduceRest(restSnapshot, rangeFinishEvent, nowMs)).toEqual(restSnapshot);
    });

    test.each([
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('%s → FINISHED', (_label, nowMs) => {
      const rangeFinishEvent: TRangeFinishEvent = {
        type: eventType.RANGE_FINISH,
      };

      const finishedSnapshot: TFinishedSnapshot = {
        state: machineState.FINISHED,
        rangeStart,
        rangeEnd,
      };

      expect(reduceRest(restSnapshot, rangeFinishEvent, nowMs)).toEqual(finishedSnapshot);
    });
  });

  describe('INVALID EVENTS', () => {
    test.each([
      [
        'SETUP_START → снимок без изменений',
        {
          type: eventType.SETUP_START,
          startMinutes,
          endMinutes,
        },
      ],
      [
        'REST_START → снимок без изменений',
        {
          type: eventType.REST_START,
          restKind: restKind.SHORT,
        },
      ],
      [
        'FINISH_CONFIRM → снимок без изменений',
        {
          type: eventType.FINISH_CONFIRM,
        },
      ],
    ])('%s', (_label: string, event: TEvent) => {
      const nowMs = convertHoursToTimestamp(15);

      expect(reduceRest(restSnapshot, event, nowMs)).toEqual(restSnapshot);
    });
  });
});
