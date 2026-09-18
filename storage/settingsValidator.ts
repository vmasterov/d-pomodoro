import type { TSettings } from '@core/types/common.type';
import { getNumberFieldValue } from './utils/getNumberFieldValue';
import { intervals } from '@core/constants/segment.const';
import { validateIntervals } from '@core/utils/validateIntervals';

export function settingsValidator(value: unknown): TSettings | null {
  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'startTimestamp' in value &&
    'endTimestamp' in value
  ) {
    const startTimestamp = getNumberFieldValue(value, 'startTimestamp');
    const endTimestamp = getNumberFieldValue(value, 'endTimestamp');

    if (startTimestamp === null || endTimestamp === null) {
      return null;
    }

    const workDuration = getNumberFieldValue(value, 'workDuration');
    const alertWorkTime = getNumberFieldValue(value, 'alertWorkTime');
    const restShort = getNumberFieldValue(value, 'restShort');
    const restLong = getNumberFieldValue(value, 'restLong');

    if (
      workDuration === null ||
      alertWorkTime === null ||
      restShort === null ||
      restLong === null
    ) {
      return {
        startTimestamp,
        endTimestamp,
        ...intervals,
      };
    }

    const intervalsFromStorage = {
      workDuration,
      alertWorkTime,
      restShort,
      restLong,
    };

    const isIntervalErrors = Object.values(validateIntervals(intervalsFromStorage)).some(
      (intervalField) => intervalField,
    );

    if (isIntervalErrors) {
      return {
        startTimestamp,
        endTimestamp,
        ...intervals,
      };
    }

    return {
      startTimestamp,
      endTimestamp,
      ...intervalsFromStorage,
    };
  }

  return null;
}
