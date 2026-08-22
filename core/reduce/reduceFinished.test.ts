import { test, describe, expect } from 'vitest';
import { reduceFinished } from '@core/reduce/reduceFinished';
import { machineState } from '@core/constants/machine.const';
import { eventType } from '@core/constants/events.const';
import type { TFinishedSnapshot, TSetupSnapshot } from '@core/types/snapshot.type';
import type { TEvent, TFinishConfirmEvent } from '@core/types/events.type';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { rangeStart, rangeEnd, startTimestamp, endTimestamp } from '@testUtils/fixtures';
import { restKind } from '@core/constants/segment.const';
import { silenceConsoleWarn } from '@testUtils/silenceConsoleWarn';

const finishedSnapshot: TFinishedSnapshot = {
  state: machineState.FINISHED,
  rangeStart,
  rangeEnd,
};

silenceConsoleWarn();

describe('Тестирование reduceFinished', () => {
  describe('FINISH_CONFIRM', () => {
    test.each([
      ['now < rangeStart', convertHoursToTimestamp(8)],
      ['rangeStart <= now < rangeEnd', convertHoursToTimestamp(10)],
      ['now = rangeEnd', rangeEnd],
      ['now > rangeEnd', convertHoursToTimestamp(19)],
    ])('→ SETUP (%s)', (_label, nowMs) => {
      const finishConfirmEvent: TFinishConfirmEvent = {
        type: eventType.FINISH_CONFIRM,
      };

      const setupSnapshot: TSetupSnapshot = {
        state: machineState.SETUP,
      };

      expect(reduceFinished(finishedSnapshot, finishConfirmEvent, nowMs)).toEqual(setupSnapshot);
    });
  });

  describe('INVALID EVENTS', () => {
    test.each([
      [
        'SETUP_START → снимок без изменений',
        {
          type: eventType.SETUP_START,
          startTimestamp,
          endTimestamp,
        },
      ],
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
    ])('%s', (_label: string, event: TEvent) => {
      const nowMs = convertHoursToTimestamp(19);

      expect(reduceFinished(finishedSnapshot, event, nowMs)).toEqual(finishedSnapshot);
    });
  });
});
