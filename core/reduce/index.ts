import type { TSnapshot } from '../types/snapshot.type';
import type { TEvent } from '../types/events.type';
import { reduceSetup } from './reduceSetup';
import { reducePending } from './reducePending';
import { reduceWork } from './reduceWork';
import { reduceRest } from './reduceRest';
import { reduceFinished } from './reduceFinished';
import { machineState } from '../constants/machine.const';

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
