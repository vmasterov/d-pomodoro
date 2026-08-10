import type { TSettings } from '@core/types/common.type';
import { getNumberFieldValue } from './utils/getNumberFieldValue';

export function settingsValidator(value: unknown): TSettings | null {
  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'startMinutes' in value &&
    'endMinutes' in value
  ) {
    const startMinutes = getNumberFieldValue(value, 'startMinutes');
    const endMinutes = getNumberFieldValue(value, 'endMinutes');

    if (startMinutes === null || endMinutes === null) {
      return null;
    }

    return {
      startMinutes,
      endMinutes,
    };
  }

  return null;
}
