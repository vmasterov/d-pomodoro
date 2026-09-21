import { getNumberFieldValue } from '@storage/utils/getNumberFieldValue';
import { validateIntervals } from '@core/utils/validateIntervals';
import { checkIsIntervalHasErrors } from '@core/utils/checkIsIntervalHasErrors';
import type { TSegmentIntervals } from '@core/types/common.type';

export function getIntervals(value: Record<string, unknown>): TSegmentIntervals | null {
  const workDuration = getNumberFieldValue(value, 'workDuration');
  const alertWorkTime = getNumberFieldValue(value, 'alertWorkTime');
  const restShort = getNumberFieldValue(value, 'restShort');
  const restLong = getNumberFieldValue(value, 'restLong');

  if (workDuration === null || alertWorkTime === null || restShort === null || restLong === null) {
    return null;
  }

  const intervalsFromStorage = {
    workDuration,
    alertWorkTime,
    restShort,
    restLong,
  };

  const possibleEmptyErrors = validateIntervals(intervalsFromStorage);
  const isIntervalErrors = checkIsIntervalHasErrors(possibleEmptyErrors);

  if (isIntervalErrors) {
    return null;
  }

  return intervalsFromStorage;
}
