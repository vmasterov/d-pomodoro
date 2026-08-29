import type { TUseMachineReturn } from '@/types/hooks/useMachineReturn.type';
import type { TRestSnapshot } from '@core/types/snapshot.type';

export type TRestProps = {
  workStart: TUseMachineReturn['workStart'];
  reset: TUseMachineReturn['reset'];
  nowMs: number;
  snapshot: TRestSnapshot;
};
