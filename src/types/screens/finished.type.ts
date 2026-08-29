import type { TUseMachineReturn } from '@/types/hooks/useMachineReturn.type';
import type { TFinishedSnapshot } from '@core/types/snapshot.type';

export type TFinishedProps = {
  finishConfirm: TUseMachineReturn['finishConfirm'];
  rangeStart: TFinishedSnapshot['rangeStart'];
  rangeEnd: TFinishedSnapshot['rangeEnd'];
};
