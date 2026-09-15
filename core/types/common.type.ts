import { restKind } from '@core/constants/segment.const';

export type TRestKind = (typeof restKind)[keyof typeof restKind];

export type TRestDuration = Readonly<{
  long: number;
  short: number;
}>;

export type TSegmentIntervals = {
  workDuration: number;
  alertWorkTime: number;
  restDuration: TRestDuration;
};

export type TSettings = Readonly<
  {
    startTimestamp: number;
    endTimestamp: number;
  } & TSegmentIntervals
>;
