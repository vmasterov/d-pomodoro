import { segmentDuration, segmentType } from './constants';
import type { SegmentType, GenerateResult } from './types';
import { switchSegmentType } from './utils';

export function generateSegments(
  start: number,
  end: number,
  type: SegmentType = segmentType.WORK,
): GenerateResult {
  if (start >= end) {
    throw Error('End must be greater than start');
  }

  const result: GenerateResult = {
    segments: [],
    warnings: [],
  };

  let position = start;
  let currentType = type;
  let stop = false;
  let workTime = 0;

  while (!stop) {
    let duration: number;

    if (currentType === segmentType.WORK) {
      duration = segmentDuration.work;
      workTime += segmentDuration.work;
    } else if (workTime % 60 === 0) {
      // При пересчёте с отдыха (workTime=0) сразу даём длинный перерыв из-за переработки.
      duration = segmentDuration.restLong;
      workTime = 0;
    } else {
      duration = segmentDuration.restShort;
    }

    const segmentEnd = position + duration;

    if (segmentEnd >= end) {
      if (currentType === segmentType.REST) {
        if (result.segments.length) {
          result.segments[result.segments.length - 1].end = end;
        } else {
          result.segments.push({
            start: position,
            end,
            type: segmentType.WORK,
          });
          result.warnings.push('REST_TRIMMED_TO_WORK');
        }
      } else {
        result.segments.push({
          start: position,
          end,
          type: currentType,
        });
      }

      stop = true;
      continue;
    }

    result.segments.push({
      start: position,
      end: segmentEnd,
      type: currentType,
    });

    position = segmentEnd;
    currentType = switchSegmentType(currentType);
  }

  return result;
}
