import { restKind } from '@core/constants/segment.const';

export type TRestKind = (typeof restKind)[keyof typeof restKind];

export type TSettings = {
  startTimestamp: number;
  endTimestamp: number;
};
