import { restKind } from '@core/constants/segment.const';

export type TRestKind = (typeof restKind)[keyof typeof restKind];

export type TRestDuration = Readonly<{
  long: number;
  short: number;
}>;

export type TSettings = Readonly<{
  startTimestamp: number;
  endTimestamp: number;
  workDuration: number;
  alertWorkTime: number;
  restDuration: TRestDuration;
}>;
