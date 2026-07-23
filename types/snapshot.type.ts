import { machineState } from '../constants/machine.const';
import type { TRestKind } from './common.type';

export type TSetupSnapshot = {
  state: typeof machineState.SETUP;
};

export type TPendingSnapshot = {
  state: typeof machineState.PENDING;
  rangeStart: number;
  rangeEnd: number;
};

export type TWorkSnapshot = {
  state: typeof machineState.WORK;
  rangeStart: number;
  rangeEnd: number;
  segmentStart: number;
  workSegmentCount: number;
};

export type TRestSnapshot = {
  state: typeof machineState.REST;
  rangeStart: number;
  rangeEnd: number;
  restKind: TRestKind;
  segmentStart: number;
  workSegmentCount: number;
};

export type TFinishedSnapshot = {
  state: typeof machineState.FINISHED;
  rangeStart: number;
  rangeEnd: number;
};

export type TSnapshot =
  TSetupSnapshot | TPendingSnapshot | TWorkSnapshot | TRestSnapshot | TFinishedSnapshot;
