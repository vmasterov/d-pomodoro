import type { TSnapshot } from '@core/types/snapshot.type';
import { machineState } from '@core/constants/machine.const';
import { getNumberFieldValue } from '@storage/utils/getNumberFieldValue';
import { getRestKind } from '@storage/utils/getRestKind';
import { getIntervals } from '@storage/utils/getIntervals';

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

        const intervals = getIntervals(value);

        if (rangeStart === null || rangeEnd === null || intervals === null) {
          return null;
        }

        return {
          state: machineState.PENDING,
          rangeStart,
          rangeEnd,
          ...intervals,
        };
      }
      case machineState.WORK: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');
        const segmentStart = getNumberFieldValue(value, 'segmentStart');
        const workSegmentCount = getNumberFieldValue(value, 'workSegmentCount');

        const intervals = getIntervals(value);

        if (
          rangeStart === null ||
          rangeEnd === null ||
          segmentStart === null ||
          workSegmentCount === null ||
          intervals === null
        ) {
          return null;
        }

        return {
          state: machineState.WORK,
          rangeStart,
          rangeEnd,
          segmentStart,
          workSegmentCount,
          ...intervals,
        };
      }
      case machineState.REST: {
        const rangeStart = getNumberFieldValue(value, 'rangeStart');
        const rangeEnd = getNumberFieldValue(value, 'rangeEnd');
        const segmentStart = getNumberFieldValue(value, 'segmentStart');
        const workSegmentCount = getNumberFieldValue(value, 'workSegmentCount');
        const restKind = getRestKind(value);

        const intervals = getIntervals(value);

        if (
          rangeStart === null ||
          rangeEnd === null ||
          segmentStart === null ||
          workSegmentCount === null ||
          restKind === null ||
          intervals === null
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
          ...intervals,
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
