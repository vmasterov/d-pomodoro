import { test, describe, expect } from 'vitest';
import { reducePending } from './reducePending';
import { machineState } from '@core/constants/machine.const';
import { eventType } from '@core/constants/events.const';
import type {
  TFinishedSnapshot,
  TPendingSnapshot,
  TSetupSnapshot,
  TWorkSnapshot,
} from '@core/types/snapshot.type';
import type {
  TEvent,
  TRangeFinishEvent,
  TResetEvent,
  TWorkStartEvent,
} from '@core/types/events.type';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { rangeStart, rangeEnd, startMinutes, endMinutes } from '@testUtils/fixtures';
import { restKind } from '@core/constants/segment.const';

const pendingSnapshot: TPendingSnapshot = {
  rangeStart,
  rangeEnd,
  state: machineState.PENDING,
};

describe('Тестирование reducePending', () => {
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

      expect(reducePending(pendingSnapshot, resetEvent, nowMs)).toEqual(setupSnapshot);
    });
  });

  describe('WORK_START', () => {
    test.each([
      ['now < rangeStart', convertHoursToTimestamp(8)],
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('%s → снимок без изменений', (_label, nowMs) => {
      const workStartEvent: TWorkStartEvent = {
        type: eventType.WORK_START,
      };

      expect(reducePending(pendingSnapshot, workStartEvent, nowMs)).toEqual(pendingSnapshot);
    });

    test.each([
      ['now = rangeStart', rangeStart],
      ['rangeStart < now < rangeEnd', convertHoursToTimestamp(10)],
    ])('%s → WORK', (_label, nowMs) => {
      const workStartEvent: TWorkStartEvent = {
        type: eventType.WORK_START,
      };

      const workSnapshot: TWorkSnapshot = {
        rangeStart,
        rangeEnd,
        state: machineState.WORK,
        segmentStart: nowMs,
        workSegmentCount: 0,
      };

      expect(reducePending(pendingSnapshot, workStartEvent, nowMs)).toEqual(workSnapshot);
    });
  });

  describe('RANGE_FINISH', () => {
    test('now < rangeEnd → снимок без изменений', () => {
      const nowMs = convertHoursToTimestamp(10);

      const rangeFinishEvent: TRangeFinishEvent = {
        type: eventType.RANGE_FINISH,
      };

      expect(reducePending(pendingSnapshot, rangeFinishEvent, nowMs)).toEqual(pendingSnapshot);
    });

    test.each([
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('%s → FINISHED', (_label, nowMs) => {
      const rangeFinishEvent: TRangeFinishEvent = {
        type: eventType.RANGE_FINISH,
      };

      const finishedSnapshot: TFinishedSnapshot = {
        rangeStart,
        rangeEnd,
        state: machineState.FINISHED,
      };

      expect(reducePending(pendingSnapshot, rangeFinishEvent, nowMs)).toEqual(finishedSnapshot);
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
          restKind: restKind.LONG,
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

      expect(reducePending(pendingSnapshot, event, nowMs)).toEqual(pendingSnapshot);
    });
  });
});
