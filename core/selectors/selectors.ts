import type { TWorkSnapshot, TRestSnapshot } from '../types/snapshot.type';
import { MS_PER_MINUTE } from '../constants/common.const';
import { machineState } from '../constants/machine.const';
import { workDuration, restDuration, restKind } from '../constants/segment.const';
import type { TRestKind } from '../types/common.type';

export function remainingMs(snapshot: TWorkSnapshot | TRestSnapshot, nowMs: number): number {
  const duration =
    snapshot.state === machineState.WORK ? workDuration : restDuration[snapshot.restKind];
  return duration * MS_PER_MINUTE + snapshot.segmentStart - nowMs;
}

export function isRangeOver(rangeEnd: number, nowMs: number): boolean {
  return nowMs >= rangeEnd;
}

export function recommendedRest(workSegmentCount: number): TRestKind {
  return workSegmentCount % 2 === 0 ? restKind.SHORT : restKind.LONG;
}
