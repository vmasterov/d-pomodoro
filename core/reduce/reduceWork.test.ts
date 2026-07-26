import { test, describe, expect } from 'vitest';
import type {
  TFinishedSnapshot,
  TRestSnapshot,
  TSetupSnapshot,
  TWorkSnapshot,
} from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import type {
  TEvent,
  TRangeFinishEvent,
  TResetEvent,
  TRestStartEvent,
} from '@core/types/events.type';
import { eventType } from '@core/constants/events.const';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { reduceWork } from './reduceWork';
import { restKind } from '@core/constants/segment.const';
import { rangeStart, rangeEnd, startMinutes, endMinutes } from '@testUtils/fixtures';

describe('Тестирование reduceWork', () => {
  describe('RESET', () => {
    test.each([
      ['now < rangeEnd', convertHoursToTimestamp(8)],
      ["now >= rangeStart && 'now < rangeEnd", convertHoursToTimestamp(10)],
      ['now >= rangeEnd', convertHoursToTimestamp(19)],
    ])('→ SETUP (%s)', (_label, nowMs) => {
      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: convertHoursToTimestamp(17),
        workSegmentCount: 0,
      };

      const resetEvent: TResetEvent = {
        type: eventType.RESET,
      };

      const setupSnapshot: TSetupSnapshot = {
        state: machineState.SETUP,
      };

      expect(reduceWork(workSnapshot, resetEvent, nowMs)).toEqual(setupSnapshot);
    });
  });

  describe('RANGE_FINISH', () => {
    test.each([
      ['now = rangeEnd → FINISHED', rangeEnd],
      ['now > rangeEnd → FINISHED', convertHoursToTimestamp(19)],
    ])('%s', (_label, nowMs) => {
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

    test('now < rangeEnd → снимок без изменений', () => {
      const nowMs = convertHoursToTimestamp(15);

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
  });

  describe('REST_START', () => {
    test.each([
      ['now = rangeEnd → снимок без изменений', rangeEnd],
      ['now > rangeEnd → снимок без изменений', convertHoursToTimestamp(19)],
    ])('%s', (_label, nowMs) => {
      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: convertHoursToTimestamp(17),
        workSegmentCount: 0,
      };

      const restStartEvent: TRestStartEvent = {
        type: eventType.REST_START,
        restKind: restKind.LONG,
      };

      expect(reduceWork(workSnapshot, restStartEvent, nowMs)).toEqual(workSnapshot);
    });

    test('now < rangeEnd → REST', () => {
      const nowMs = convertHoursToTimestamp(15);

      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: convertHoursToTimestamp(14),
        workSegmentCount: 2,
      };

      const restStartEvent: TRestStartEvent = {
        type: eventType.REST_START,
        restKind: restKind.LONG,
      };

      const restSnapshot: TRestSnapshot = {
        state: machineState.REST,
        rangeStart,
        rangeEnd,
        restKind: restKind.LONG,
        segmentStart: nowMs,
        workSegmentCount: 3,
      };

      expect(reduceWork(workSnapshot, restStartEvent, nowMs)).toEqual(restSnapshot);
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
        'WORK_START → снимок без изменений',
        {
          type: eventType.WORK_START,
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

      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: convertHoursToTimestamp(14),
        workSegmentCount: 2,
      };

      expect(reduceWork(workSnapshot, event, nowMs)).toEqual(workSnapshot);
    });
  });
});
