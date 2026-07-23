import type { TSetupSnapshot, TSnapshot } from '../types/snapshot.type';
import type { TEvent } from '../types/events.type';
import { eventType } from '../constants/events.const';
import { convertMinutesToTimestamp } from '../utils/date.util';
import { machineState } from '../constants/machine.const';
import { reduceDefault } from '../utils/reduce/reduceDefault.util';

export function reduceSetup(snapshot: TSetupSnapshot, event: TEvent, nowMs: number): TSnapshot {
  if (event.type !== eventType.SETUP_START) {
    return reduceDefault(snapshot, event.type);
  }

  const { startMinutes, endMinutes } = event;
  let rangeStart = convertMinutesToTimestamp(nowMs, startMinutes);
  let rangeEnd = convertMinutesToTimestamp(nowMs, endMinutes);
  const isTomorrow = nowMs >= rangeEnd;
  const isBeforeStart = nowMs < rangeStart;
  const isPending = isTomorrow || isBeforeStart;

  if (isPending) {
    if (isTomorrow) {
      rangeStart = convertMinutesToTimestamp(nowMs, startMinutes, 1);
      rangeEnd = convertMinutesToTimestamp(nowMs, endMinutes, 1);
    }

    return {
      state: machineState.PENDING,
      rangeStart,
      rangeEnd,
    };
  }

  return {
    state: machineState.WORK,
    rangeStart,
    rangeEnd,
    segmentStart: nowMs,
    workSegmentCount: 0,
  };
}
