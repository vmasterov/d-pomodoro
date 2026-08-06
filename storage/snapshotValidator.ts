import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { restKind } from '@core/constants/segment.const';
import type { TRestKind } from '@core/types/common.type';

const getNumberFieldValue = (value: Record<string, unknown>, name: string): number | null => {
  return typeof value[name] === 'number' && Number.isFinite(value[name]) ? value[name] : null;
};

const getRestKind = (value: Record<string, unknown>): TRestKind | null => {
  return typeof value.restKind === 'string' &&
    (value.restKind === restKind.LONG || value.restKind === restKind.SHORT)
    ? value.restKind
    : null;
};

export function snapshotValidator(value: unknown): TSnapshot | null {
  if (value !== null && typeof value === 'object' && !Array.isArray(value) && 'state' in value) {
    switch (value.state) {
      case machineState.SETUP: {
        return {
          state: machineState.SETUP,
        };
      }
      case machineState.PENDING: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');

        if (rangeStart === null || rangeEnd === null) {
          return null;
        }

        return {
          state: machineState.PENDING,
          rangeStart,
          rangeEnd,
        };
      }
      case machineState.WORK: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');
        const segmentStart = getNumberFieldValue(value, 'segmentStart');
        const workSegmentCount = getNumberFieldValue(value, 'workSegmentCount');

        if (
          rangeStart === null ||
          rangeEnd === null ||
          segmentStart === null ||
          workSegmentCount === null
        ) {
          return null;
        }

        return {
          state: machineState.WORK,
          rangeStart,
          rangeEnd,
          segmentStart,
          workSegmentCount,
        };
      }
      case machineState.REST: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');
        const segmentStart = getNumberFieldValue(value, 'segmentStart');
        const workSegmentCount = getNumberFieldValue(value, 'workSegmentCount');
        const restKind = getRestKind(value);

        if (
          rangeStart === null ||
          rangeEnd === null ||
          segmentStart === null ||
          workSegmentCount === null ||
          restKind === null
        ) {
          return null;
        }

        return {
          state: machineState.REST,
          rangeStart,
          rangeEnd,
          segmentStart,
          workSegmentCount,
          restKind,
        };
      }
      case machineState.FINISHED: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');

        if (rangeStart === null || rangeEnd === null) {
          return null;
        }

        return {
          state: machineState.FINISHED,
          rangeStart,
          rangeEnd,
        };
      }
      default:
        return null;
    }
  }

  return null;
}
