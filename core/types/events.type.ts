import type { TRestKind } from '@core/types/common.type';
import { eventType } from '@core/constants/events.const';

export type TSetupStartEvent = {
  type: typeof eventType.SETUP_START;
  startTimestamp: number;
  endTimestamp: number;
};

export type TResetEvent = {
  type: typeof eventType.RESET;
};

export type TWorkStartEvent = {
  type: typeof eventType.WORK_START;
};

export type TRestStartEvent = {
  type: typeof eventType.REST_START;
  restKind: TRestKind;
};

export type TRangeFinishEvent = {
  type: typeof eventType.RANGE_FINISH;
};

export type TFinishConfirmEvent = {
  type: typeof eventType.FINISH_CONFIRM;
};

export type TEvent =
  | TSetupStartEvent
  | TResetEvent
  | TWorkStartEvent
  | TRestStartEvent
  | TRangeFinishEvent
  | TFinishConfirmEvent;
