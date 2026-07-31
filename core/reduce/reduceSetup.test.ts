import { test, describe, expect } from 'vitest';
import { reduceSetup } from './reduceSetup';
import { machineState } from '@core/constants/machine.const';
import { eventType } from '@core/constants/events.const';
import type { TPendingSnapshot, TSetupSnapshot, TWorkSnapshot } from '@core/types/snapshot.type';
import type { TEvent, TSetupStartEvent } from '@core/types/events.type';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import {
  rangeStart,
  rangeEnd,
  rangeStartTomorrow,
  rangeEndTomorrow,
  startMinutes,
  endMinutes,
} from '@testUtils/fixtures';
import { restKind } from '@core/constants/segment.const';
import { silenceConsoleWarn } from '@testUtils/silenceConsoleWarn';

const setupSnapshot: TSetupSnapshot = {
  state: machineState.SETUP,
};

const setupStartEvent: TSetupStartEvent = {
  type: eventType.SETUP_START,
  startMinutes,
  endMinutes,
};

silenceConsoleWarn();

describe('Тестирование reduceSetup', () => {
  describe('SETUP_START', () => {
    test('now < rangeStart → PENDING (диапазон на сегодня)', () => {
      const nowMs = convertHoursToTimestamp(8);

      const pendingSnapshot: TPendingSnapshot = {
        state: machineState.PENDING,
        rangeStart,
        rangeEnd,
      };

      expect(reduceSetup(setupSnapshot, setupStartEvent, nowMs)).toEqual(pendingSnapshot);
    });

    test.each([
      ['now = rangeStart', rangeStart],
      ['rangeStart < now < rangeEnd', convertHoursToTimestamp(10)],
    ])('%s → WORK', (_label, nowMs) => {
      const workSnapshot: TWorkSnapshot = {
        state: machineState.WORK,
        rangeStart,
        rangeEnd,
        segmentStart: nowMs,
        workSegmentCount: 0,
      };

      expect(reduceSetup(setupSnapshot, setupStartEvent, nowMs)).toEqual(workSnapshot);
    });

    test.each([
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('%s → PENDING (диапазон на завтра)', (_label, nowMs) => {
      const pendingSnapshot: TPendingSnapshot = {
        state: machineState.PENDING,
        rangeStart: rangeStartTomorrow,
        rangeEnd: rangeEndTomorrow,
      };

      expect(reduceSetup(setupSnapshot, setupStartEvent, nowMs)).toEqual(pendingSnapshot);
    });
  });

  describe('INVALID EVENTS', () => {
    test.each([
      [
        'RESET → снимок без изменений',
        {
          type: eventType.RESET,
        },
      ],
      [
        'WORK_START → снимок без изменений',
        {
          type: eventType.WORK_START,
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
        'RANGE_FINISH → снимок без изменений',
        {
          type: eventType.RANGE_FINISH,
        },
      ],
      [
        'FINISH_CONFIRM → снимок без изменений',
        {
          type: eventType.FINISH_CONFIRM,
        },
      ],
    ])('%s', (_label: string, event: TEvent) => {
      const nowMs = convertHoursToTimestamp(10);

      expect(reduceSetup(setupSnapshot, event, nowMs)).toEqual(setupSnapshot);
    });
  });
});
