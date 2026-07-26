import { segmentType } from './constants';

export type SegmentType = (typeof segmentType)[keyof typeof segmentType];
export type WarningCode = 'REST_TRIMMED_TO_WORK';

export interface Segment {
  start: number;
  end: number;
  type: SegmentType;
}

export interface GenerateResult {
  segments: Segment[];
  warnings: WarningCode[];
}
