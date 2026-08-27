import type { TUseMachineReturn } from '@/types/hooks/useMachineReturn.type';
import type { TPendingSnapshot } from '@core/types/snapshot.type';

export type TPendingProps = {
  nowMs: number;
  reset: TUseMachineReturn['reset'];
  workStart: TUseMachineReturn['workStart'];
  rangeStart: TPendingSnapshot['rangeStart'];
};
