import type { TEvent } from '@core/types/events.type';
import type { TRestSnapshot, TSnapshot } from '@core/types/snapshot.type';
import { eventType } from '@core/constants/events.const';
import { machineState } from '@core/constants/machine.const';
import { reduceDefault } from '@core/utils/reduce/reduceDefault.util';

export function reduceRest(snapshot: TRestSnapshot, event: TEvent, nowMs: number): TSnapshot {
  switch (event.type) {
    case eventType.RANGE_FINISH:
      if (nowMs < snapshot.rangeEnd) {
        break;
      }

      return {
        state: machineState.FINISHED,
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
      };
    case eventType.RESET:
      return {
        state: machineState.SETUP,
      };
    case eventType.WORK_START:
      if (nowMs >= snapshot.rangeEnd) {
        break;
      }

      return {
        state: machineState.WORK,
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        segmentStart: nowMs,
        workSegmentCount: snapshot.workSegmentCount,
      };
  }

  return reduceDefault(snapshot, event.type);
}
