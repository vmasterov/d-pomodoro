import type { SegmentType } from './types';
import { segmentType } from './constants';

export function switchSegmentType(type: SegmentType): SegmentType {
  return type === segmentType.WORK ? segmentType.REST : segmentType.WORK;
}
