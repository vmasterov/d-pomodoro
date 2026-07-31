import { describe, test, expect, vi, beforeEach } from 'vitest';
import { reduceSetup } from './reduceSetup';
import { reducePending } from './reducePending';
import { reduceWork } from './reduceWork';
import { reduceRest } from './reduceRest';
import { reduceFinished } from './reduceFinished';
import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import type { TEvent } from '@core/types/events.type';
import { eventType } from '@core/constants/events.const';
import { endMinutes, rangeEnd, rangeStart, startMinutes } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';
import { reduce } from '@core/reduce/index';
import { restKind } from '@core/constants/segment.const';
import { silenceConsoleWarn } from '@testUtils/silenceConsoleWarn';

vi.mock('./reduceSetup.ts', { spy: true });
vi.mock('./reducePending.ts', { spy: true });
vi.mock('./reduceWork.ts', { spy: true });
vi.mock('./reduceRest.ts', { spy: true });
vi.mock('./reduceFinished.ts', { spy: true });

beforeEach(() => {
  vi.clearAllMocks();
});

silenceConsoleWarn();

const handlers = [reduceSetup, reducePending, reduceWork, reduceRest, reduceFinished];

function expectToBeCalled(
  snapshot: TSnapshot,
  event: TEvent,
  nowMs: number,
  correctHandler: unknown,
) {
  for (const handler of handlers) {
    if (handler === correctHandler) {
      expect(handler).toHaveBeenCalledWith(snapshot, event, nowMs);
    } else {
      expect(handler).not.toHaveBeenCalled();
    }
  }
}

const nowMs = convertHoursToTimestamp(10);

const setupSnapshot = {
  state: machineState.SETUP,
};

const pendingSnapshot = {
  state: machineState.PENDING,
  rangeStart,
  rangeEnd,
};

const workSnapshot = {
  state: machineState.WORK,
  rangeStart,
  rangeEnd,
  segmentStart: nowMs,
  workSegmentCount: 1,
};

const restSnapshot = {
  state: machineState.REST,
  rangeStart,
  rangeEnd,
  restKind: restKind.LONG,
  segmentStart: nowMs,
  workSegmentCount: 1,
};

const finishedSnapshot = {
  state: machineState.FINISHED,
  rangeStart,
  rangeEnd,
};

const setupEvent = {
  type: eventType.SETUP_START,
  startMinutes,
  endMinutes,
};

describe('Тестирование функции reduce', () => {
  const cases: [string, TSnapshot, TEvent, unknown][] = [
    ['SETUP', setupSnapshot, setupEvent, reduceSetup],
    ['PENDING', pendingSnapshot, setupEvent, reducePending],
    ['WORK', workSnapshot, setupEvent, reduceWork],
    ['REST', restSnapshot, setupEvent, reduceRest],
    ['FINISHED', finishedSnapshot, setupEvent, reduceFinished],
  ];

  test.each(cases)('%s', (_label, snapshot, event, handler) => {
    reduce(snapshot, event, nowMs);
    expectToBeCalled(snapshot, event, nowMs, handler);
  });
});
