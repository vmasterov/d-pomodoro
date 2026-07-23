import type { TSnapshot, TWorkSnapshot } from '../types/snapshot.type';
import type { TEvent } from '../types/events.type';
import { eventType } from '../constants/events.const';
import { reduceDefault } from '../utils/reduce/reduceDefault.util';
import { machineState } from '../constants/machine.const';

export function reduceWork(snapshot: TWorkSnapshot, event: TEvent, nowMs: number): TSnapshot {
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
    case eventType.REST_START:
      if (nowMs >= snapshot.rangeEnd) {
        break;
      }

      return {
        state: machineState.REST,
        rangeStart: snapshot.rangeStart,
        rangeEnd: snapshot.rangeEnd,
        restKind: event.restKind,
        segmentStart: nowMs,
        workSegmentCount: snapshot.workSegmentCount + 1,
      };
  }

  return reduceDefault(snapshot, event.type);
}
