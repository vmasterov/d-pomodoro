import { machineState } from '@core/constants/machine.const';
import { restKind } from '@core/constants/segment.const';
import type {
  TSetupSnapshot,
  TPendingSnapshot,
  TWorkSnapshot,
  TRestSnapshot,
  TFinishedSnapshot,
} from '@core/types/snapshot.type';
import { rangeStart, rangeEnd } from '@testUtils/fixtures';
import { convertHoursToTimestamp } from '@testUtils/convertHoursToTimestamp';

const range = { rangeStart, rangeEnd };

export const setupSnapshot: TSetupSnapshot = {
  state: machineState.SETUP,
};

export const pendingSnapshot: TPendingSnapshot = {
  state: machineState.PENDING,
  ...range,
};

export const workSnapshot: TWorkSnapshot = {
  state: machineState.WORK,
  ...range,
  segmentStart: convertHoursToTimestamp(9),
  workSegmentCount: 1,
};

export const restLongSnapshot: TRestSnapshot = {
  state: machineState.REST,
  ...range,
  restKind: restKind.LONG,
  segmentStart: convertHoursToTimestamp(9, 2),
  workSegmentCount: 1,
};

export const restShortSnapshot: TRestSnapshot = {
  state: machineState.REST,
  ...range,
  restKind: restKind.SHORT,
  segmentStart: convertHoursToTimestamp(9, 1),
  workSegmentCount: 1,
};

export const finishedSnapshot: TFinishedSnapshot = {
  state: machineState.FINISHED,
  ...range,
};
