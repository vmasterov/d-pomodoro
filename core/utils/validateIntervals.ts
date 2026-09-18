import type { TCrossRule, TValidator, TValidators, TValueRule } from '@core/types/validators.type';
import { LIMIT } from '@core/constants/segment.const';
import type { TPossibleEmptySegmentIntervals } from '@core/types/common.type';

const isGreaterThanRestSmall = (intervals: TPossibleEmptySegmentIntervals) => {
  if (intervals.restLong !== null && intervals.restShort !== null) {
    return intervals.restLong > intervals.restShort;
  }

  return true;
};

const validators: TValidators = {
  workDuration: {
    valueRules: {
      isInteger: (workDuration: number) => Number.isInteger(workDuration),
      isGreaterThanZero: (workDuration: number) => workDuration > 0,
      isLessThanOrEqualLimit: (workDuration: number) => workDuration <= LIMIT,
    },
    crossRules: {
      isGreaterThanAlert: (intervals: TPossibleEmptySegmentIntervals) => {
        if (intervals.workDuration !== null && intervals.alertWorkTime !== null) {
          return intervals.workDuration > intervals.alertWorkTime;
        }

        return true;
      },
    },
    errors: {
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isGreaterThanAlert: 'Значение должно быть больше, чем сигнал о перерыве',
    },
  },
  alertWorkTime: {
    valueRules: {
      isInteger: (alertWorkTime: number) => Number.isInteger(alertWorkTime),
      isGreaterThanZero: (alertWorkTime: number) => 0 < alertWorkTime,
    },
    crossRules: {
      isLessThanWorkDuration: (intervals: TPossibleEmptySegmentIntervals) => {
        if (intervals.workDuration !== null && intervals.alertWorkTime !== null) {
          return intervals.alertWorkTime <= intervals.workDuration - 1;
        }

        return true;
      },
    },
    errors: {
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanWorkDuration: 'Значение должно быть меньше длительности рабочего сегмента',
    },
  },
  restLong: {
    valueRules: {
      isInteger: (restLong: number) => Number.isInteger(restLong),
      isGreaterThanZero: (restLong: number) => restLong > 0,
      isLessThanOrEqualLimit: (restLong: number) => restLong <= LIMIT,
    },
    crossRules: {
      isGreaterThanRestSmall: (intervals: TPossibleEmptySegmentIntervals) => {
        return isGreaterThanRestSmall(intervals);
      },
    },
    errors: {
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isGreaterThanRestSmall: 'Значение должно быть длиннее, чем короткий перерыв',
    },
  },
  restShort: {
    valueRules: {
      isInteger: (restShort: number) => Number.isInteger(restShort),
      isGreaterThanZero: (restShort: number) => restShort > 0,
      isLessThanOrEqualLimit: (restShort: number) => restShort <= LIMIT,
    },
    crossRules: {
      isLessThanRestLong: (intervals: TPossibleEmptySegmentIntervals) => {
        return isGreaterThanRestSmall(intervals);
      },
    },
    errors: {
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isLessThanRestLong: 'Значение должно быть короче, чем длинный перерыв',
    },
  },
};

const validateField = <
  Value extends Record<string, TValueRule>,
  Cross extends Record<string, TCrossRule>,
>(
  intervals: TPossibleEmptySegmentIntervals,
  value: number | null,
  validator: TValidator<Value, Cross>,
) => {
  if (value === null) {
    return 'Поле обязательно для заполнения';
  }

  const { valueRules, crossRules, errors } = validator;

  for (const rule in valueRules) {
    if (!valueRules[rule](value)) {
      return errors[rule];
    }
  }

  for (const rule in crossRules) {
    if (!crossRules[rule](intervals)) {
      return errors[rule];
    }
  }

  return null;
};

export function validateIntervals(intervals: TPossibleEmptySegmentIntervals) {
  return {
    workDuration: validateField(intervals, intervals.workDuration, validators.workDuration),
    alertWorkTime: validateField(intervals, intervals.alertWorkTime, validators.alertWorkTime),
    restLong: validateField(intervals, intervals.restLong, validators.restLong),
    restShort: validateField(intervals, intervals.restShort, validators.restShort),
  };
}
