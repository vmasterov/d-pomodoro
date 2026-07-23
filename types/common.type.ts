import { restKind } from '../constants/segment.const';

export type TRestKind = (typeof restKind)[keyof typeof restKind];

export type TSettings = {
  startMinutes: number;
  endMinutes: number;
};
