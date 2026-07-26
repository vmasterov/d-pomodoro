import type { TFinishedSnapshot, TSnapshot } from '@core/types/snapshot.type';
import type { TEvent } from '@core/types/events.type';
import { eventType } from '@core/constants/events.const';
import { reduceDefault } from '@core/utils/reduce/reduceDefault.util';
import { machineState } from '@core/constants/machine.const';

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
