import type { TPendingSnapshot, TSnapshot } from '@core/types/snapshot.type';
import type { TEvent } from '@core/types/events.type';
import { machineState } from '@core/constants/machine.const';
import { reduceDefault } from '@core/utils/reduce/reduceDefault.util';
import { eventType } from '@core/constants/events.const';

export function reducePending(snapshot: TPendingSnapshot, event: TEvent, nowMs: number): TSnapshot {
  switch (event.type) {
    case eventType.RESET:
      return {
        state: machineState.SETUP,
      };
    case eventType.RANGE_FINISH:
      if (nowMs < snapshot.rangeEnd) {
        break;
      }

      return {
        state: machineState.FINISHED,
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
      };
    case eventType.WORK_START:
      if (nowMs < snapshot.rangeStart || nowMs >= snapshot.rangeEnd) {
        break;
      }

      return {
        state: machineState.WORK,
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        segmentStart: nowMs,
        workSegmentCount: 0,
      };
  }

  return reduceDefault(snapshot, event.type);
}
