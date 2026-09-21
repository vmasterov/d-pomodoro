import type { TPossibleEmptySegmentIntervals } from '@core/types/common.type';

export type TValueRule = (value: number) => boolean;
export type TCrossRule = (intervals: TPossibleEmptySegmentIntervals) => boolean;

export type TWorkDurationValueRules = {
  isInteger: TValueRule;
  isGreaterThanZero: TValueRule;
  isLessThanOrEqualLimit: TValueRule;
};

export type TWorkDurationCrossRules = {
  isGreaterThanAlert: TCrossRule;
};

export type TAlertWorkTimeValueRules = {
  isInteger: TValueRule;
  isGreaterThanZero: TValueRule;
};

export type TAlertWorkTimeCrossRules = {
  isLessThanWorkDuration: TCrossRule;
};

export type TRestLongValueRules = {
  isInteger: TValueRule;
  isGreaterThanZero: TValueRule;
  isLessThanOrEqualLimit: TValueRule;
};

export type TRestLongCrossRules = {
  isGreaterThanRestShort: TCrossRule;
};

export type TRestShortValueRules = {
  isInteger: TValueRule;
  isGreaterThanZero: TValueRule;
  isLessThanOrEqualLimit: TValueRule;
};

export type TRestShortCrossRules = {
  isLessThanRestLong: TCrossRule;
};

export type TErrors<Rules> = { [Rule in keyof Rules]: string };

export type TValidator<Value, Cross> = {
  valueRules: Value;
  crossRules: Cross;
  errors: TErrors<Value & Cross>;
};

export type TValidators = {
  workDuration: TValidator<TWorkDurationValueRules, TWorkDurationCrossRules>;
  alertWorkTime: TValidator<TAlertWorkTimeValueRules, TAlertWorkTimeCrossRules>;
  restLong: TValidator<TRestLongValueRules, TRestLongCrossRules>;
  restShort: TValidator<TRestShortValueRules, TRestShortCrossRules>;
};
