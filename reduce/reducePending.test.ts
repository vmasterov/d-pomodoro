import { test, describe, expect } from 'vitest';
import { reducePending } from './reducePending';
import { machineState } from '../constants/machine.const';
import { eventType } from '../constants/events.const';
import type { TPendingSnapshot, TSetupSnapshot } from '../types/snapshot.type';
import type { TResetEvent } from '../types/events.type';
import { convertHoursToTimestamp } from '../testUtils/convertHoursToTimestamp';

describe('Тестирование reducePending', () => {
  test.each([
    ['до начала диапазона', convertHoursToTimestamp(8)],
    ['внутри диапазона', convertHoursToTimestamp(10)],
    ['после завершения диапазона', convertHoursToTimestamp(19)],
  ])('При получении события RESET система переходит в состояние SETUP %s', (_label, nowMs) => {
    const pendingSnapshot: TPendingSnapshot = {
      rangeStart: convertHoursToTimestamp(9),
      rangeEnd: convertHoursToTimestamp(18),
      state: machineState.PENDING,
    };

    const resetEvent: TResetEvent = {
      type: eventType.RESET,
    };

    const setupSnapshot: TSetupSnapshot = {
      state: machineState.SETUP,
    };

    expect(reducePending(pendingSnapshot, resetEvent, nowMs)).toEqual(setupSnapshot);
  });
});
