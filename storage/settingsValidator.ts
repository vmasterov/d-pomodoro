import type { TSettings } from '@core/types/common.type';
import { getNumberFieldValue } from '@storage/utils/getNumberFieldValue';
import { intervals } from '@core/constants/segment.const';
import { getIntervals } from '@storage/utils/getIntervals';

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

    return {
      startTimestamp,
      endTimestamp,
      ...(getIntervals(value) ?? intervals),
    };
  }

  return null;
}
