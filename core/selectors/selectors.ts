import type { TWorkSnapshot, TRestSnapshot, TSnapshot } from '@core/types/snapshot.type';
import { MS_PER_MINUTE } from '@core/constants/common.const';
import { machineState } from '@core/constants/machine.const';
import { restKind } from '@core/constants/segment.const';
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

export function restDurationMin(snapshot: TWorkSnapshot | TRestSnapshot, kind: TRestKind) {
  const { restLong, restShort } = snapshot;
  return kind === restKind.LONG ? restLong : restShort;
}

export function segmentDurationMs(snapshot: TWorkSnapshot | TRestSnapshot): number {
  const durationMin =
    snapshot.state === machineState.WORK
      ? snapshot.workDuration
      : restDurationMin(snapshot, snapshot.restKind);

  return durationMin * MS_PER_MINUTE;
}
