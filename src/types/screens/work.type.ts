import type { TUseMachineReturn } from '@/types/hooks/useMachineReturn.type';
import type { TWorkSnapshot } from '@core/types/snapshot.type';

export type TWorkProps = {
  restStart: TUseMachineReturn['restStart'];
  reset: TUseMachineReturn['reset'];
  nowMs: number;
  snapshot: TWorkSnapshot;
};
