import type { TWorkSnapshot, TRestSnapshot, TSnapshot } from '@core/types/snapshot.type';
import { MS_PER_MINUTE } from '@core/constants/common.const';
import { machineState } from '@core/constants/machine.const';
import { workDuration, restDuration, restKind } from '@core/constants/segment.const';
import type { TRestKind } from '@core/types/common.type';

export function remainingMs(snapshot: TWorkSnapshot | TRestSnapshot, nowMs: number): number {
  return segmentDurationMs(snapshot) + snapshot.segmentStart - nowMs;
}

export function isRangeOver(rangeEnd: number, nowMs: number): boolean {
  return nowMs >= rangeEnd;
}

export function recommendedRest(workSegmentCount: number): TRestKind {
  return workSegmentCount % 2 === 0 ? restKind.SHORT : restKind.LONG;
}

export function getActiveRangeEnd(snapshot: TSnapshot | null) {
  if (
    !snapshot ||
    snapshot.state === machineState.FINISHED ||
    snapshot.state === machineState.SETUP
  ) {
    return null;
  }

  return snapshot.rangeEnd;
}

export function segmentDurationMs(snapshot: TWorkSnapshot | TRestSnapshot): number {
  return snapshot.state === machineState.WORK
    ? workDuration * MS_PER_MINUTE
    : restDuration[snapshot.restKind] * MS_PER_MINUTE;
}
