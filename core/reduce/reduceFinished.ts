import type { TFinishedSnapshot, TSnapshot } from '../types/snapshot.type';
import type { TEvent } from '../types/events.type';
import { eventType } from '../constants/events.const';
import { reduceDefault } from '../utils/reduce/reduceDefault.util';
import { machineState } from '../constants/machine.const';

export function reduceFinished(
  snapshot: TFinishedSnapshot,
  event: TEvent,
  _nowMs: number,
): TSnapshot {
  if (event.type !== eventType.FINISH_CONFIRM) {
    return reduceDefault(snapshot, event.type);
  }

  return {
    state: machineState.SETUP,
  };
}
