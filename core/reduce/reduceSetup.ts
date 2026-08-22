import type { TSetupSnapshot, TSnapshot } from '@core/types/snapshot.type';
import type { TEvent } from '@core/types/events.type';
import { eventType } from '@core/constants/events.const';
import { getTimeFromTimestamp } from '@core/utils/date.util';
import { machineState } from '@core/constants/machine.const';
import { reduceDefault } from '@core/utils/reduce/reduceDefault.util';

export function reduceSetup(snapshot: TSetupSnapshot, event: TEvent, nowMs: number): TSnapshot {
  if (event.type !== eventType.SETUP_START) {
    return reduceDefault(snapshot, event.type);
  }

  const { startTimestamp, endTimestamp } = event;
  let rangeStart = getTimeFromTimestamp(nowMs, startTimestamp);
  let rangeEnd = getTimeFromTimestamp(nowMs, endTimestamp);
  const isTomorrow = nowMs >= rangeEnd;
  const isBeforeStart = nowMs < rangeStart;
  const isPending = isTomorrow || isBeforeStart;

  if (isPending) {
    if (isTomorrow) {
      rangeStart = getTimeFromTimestamp(nowMs, startTimestamp, 1);
      rangeEnd = getTimeFromTimestamp(nowMs, endTimestamp, 1);
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
