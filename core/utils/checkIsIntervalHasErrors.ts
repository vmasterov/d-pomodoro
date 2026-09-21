import type { TCheckIsIntervalHasErrorsParam } from '@core/types/utils.type';

export function checkIsIntervalHasErrors<T>(
  possibleEmptyErrors: TCheckIsIntervalHasErrorsParam<T>,
) {
  return Object.values(possibleEmptyErrors).some((intervalField) => intervalField);
}
