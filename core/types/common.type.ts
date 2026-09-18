import { restKind } from '@core/constants/segment.const';

export type TRestKind = (typeof restKind)[keyof typeof restKind];

export type TSegmentIntervals = {
  workDuration: number;
  alertWorkTime: number;
  restShort: number;
  restLong: number;
};

export type TSettings = Readonly<
  {
    startTimestamp: number;
    endTimestamp: number;
  } & TSegmentIntervals
>;

export type TPossibleEmptySegmentIntervals = { [K in keyof TSegmentIntervals]: number | null };
