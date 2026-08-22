import type { TSnapshot } from '@core/types/snapshot.type';
import type { TEvent } from '@core/types/events.type';
import { reduceSetup } from '@core/reduce/reduceSetup';
import { reducePending } from '@core/reduce/reducePending';
import { reduceWork } from '@core/reduce/reduceWork';
import { reduceRest } from '@core/reduce/reduceRest';
import { reduceFinished } from '@core/reduce/reduceFinished';
import { machineState } from '@core/constants/machine.const';

export function reduce(snapshot: TSnapshot, event: TEvent, nowMs: number): TSnapshot {
  switch (snapshot.state) {
    case machineState.SETUP:
      return reduceSetup(snapshot, event, nowMs);
    case machineState.PENDING:
      return reducePending(snapshot, event, nowMs);
    case machineState.WORK:
      return reduceWork(snapshot, event, nowMs);
    case machineState.REST:
      return reduceRest(snapshot, event, nowMs);
    case machineState.FINISHED:
      return reduceFinished(snapshot, event, nowMs);
    default: {
      const _exhaustive: never = snapshot;
      return snapshot;
    }
  }
}
