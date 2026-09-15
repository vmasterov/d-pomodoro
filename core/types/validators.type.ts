import type { TSegmentIntervals } from '@core/types/common.type';

export type TRule = (intervals: TIntervals) => boolean;

export type TWorkDurationRules = {
  isFilled: TRule;
  isInteger: TRule;
  isGreaterThanZero: TRule;
  isLessThanOrEqualLimit: TRule;
  isGreaterThanAlert: TRule;
};

export type TAlertWorkTimeRules = {
  isFilled: TRule;
  isInteger: TRule;
  isValidValue: TRule;
};

export type TRestLongRules = {
  isFilled: TRule;
  isInteger: TRule;
  isGreaterThanZero: TRule;
  isLessThanOrEqualLimit: TRule;
  isGreaterThanRestSmall: TRule;
};

export type TRestShortRules = {
  isFilled: TRule;
  isInteger: TRule;
  isGreaterThanZero: TRule;
  isLessThanOrEqualLimit: TRule;
  isLessThanRestLong: TRule;
};

export type TErrors<Rules> = { [Rule in keyof Rules]: string };

export type TValidator<Validator> = {
  rules: Validator;
  errors: TErrors<Validator>;
};

export type TValidators = {
  workDuration: TValidator<TWorkDurationRules>;
  alertWorkTime: TValidator<TAlertWorkTimeRules>;
  restLong: TValidator<TRestLongRules>;
  restShort: TValidator<TRestShortRules>;
};

export type TIntervals = Readonly<TSegmentIntervals>;
