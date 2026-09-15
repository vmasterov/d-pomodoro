import type { TSnapshot } from '@core/types/snapshot.type';
import type { TRestKind, TSettings } from '@core/types/common.type';

export type TUseMachineReturn = {
  snapshot: TSnapshot | null;
  nowMs: number;
  setupStart: (settings: TSettings) => void;
  reset: () => void;
  workStart: () => void;
  restStart: (restKind: TRestKind) => void;
  finishConfirm: () => void;
};
