import type { TErrors, TIntervals, TRule, TValidators } from '@core/types/validators.type';
import { LIMIT } from '@core/constants/segment.const';

const isGreaterThanRestSmall = (intervals: TIntervals) =>
  intervals.restDuration.long > intervals.restDuration.short;

const validators: TValidators = {
  workDuration: {
    rules: {
      isFilled: (intervals: TIntervals) => Number.isFinite(intervals.workDuration),
      isInteger: (intervals: TIntervals) => Number.isInteger(intervals.workDuration),
      isGreaterThanZero: (intervals: TIntervals) => intervals.workDuration > 0,
      isLessThanOrEqualLimit: (intervals: TIntervals) => intervals.workDuration <= LIMIT,
      isGreaterThanAlert: (intervals: TIntervals) => {
        if (!Number.isFinite(intervals.alertWorkTime)) {
          return true;
        }

        return intervals.workDuration > intervals.alertWorkTime;
      },
    },
    errors: {
      isFilled: 'Поле обязательно для заполнения',
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isGreaterThanAlert: 'Значение должно быть больше, чем сигнал о перерыве',
    },
  },
  alertWorkTime: {
    rules: {
      isFilled: (intervals: TIntervals) => Number.isFinite(intervals.alertWorkTime),
      isInteger: (intervals: TIntervals) => Number.isInteger(intervals.alertWorkTime),
      isValidValue: (intervals: TIntervals) => {
        if (!Number.isFinite(intervals.workDuration)) {
          return true;
        }

        return 0 < intervals.alertWorkTime && intervals.alertWorkTime <= intervals.workDuration - 1;
      },
    },
    errors: {
      isFilled: 'Поле обязательно для заполнения',
      isInteger: 'Значение должно быть целочисленным',
      isValidValue: 'Значение должно быть больше 0 и меньше длительности рабочего диапазона',
    },
  },
  restLong: {
    rules: {
      isFilled: (intervals: TIntervals) => Number.isFinite(intervals.restDuration.long),
      isInteger: (intervals: TIntervals) => Number.isInteger(intervals.restDuration.long),
      isGreaterThanZero: (intervals: TIntervals) => intervals.restDuration.long > 0,
      isLessThanOrEqualLimit: (intervals: TIntervals) => intervals.restDuration.long <= LIMIT,
      isGreaterThanRestSmall: (intervals: TIntervals) => {
        if (!Number.isFinite(intervals.restDuration.short)) {
          return true;
        }

        return isGreaterThanRestSmall(intervals);
      },
    },
    errors: {
      isFilled: 'Поле обязательно для заполнения',
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isGreaterThanRestSmall: 'Значение должно быть длиннее, чем короткий перерыв',
    },
  },
  restShort: {
    rules: {
      isFilled: (intervals: TIntervals) => Number.isFinite(intervals.restDuration.short),
      isInteger: (intervals: TIntervals) => Number.isInteger(intervals.restDuration.short),
      isGreaterThanZero: (intervals: TIntervals) => intervals.restDuration.short > 0,
      isLessThanOrEqualLimit: (intervals: TIntervals) => intervals.restDuration.short <= LIMIT,
      isLessThanRestLong: (intervals: TIntervals) => {
        if (!Number.isFinite(intervals.restDuration.long)) {
          return true;
        }

        return isGreaterThanRestSmall(intervals);
      },
    },
    errors: {
      isFilled: 'Поле обязательно для заполнения',
      isInteger: 'Значение должно быть целочисленным',
      isGreaterThanZero: 'Значение должно быть больше 0',
      isLessThanOrEqualLimit: `Значение не должно превышать ${LIMIT}`,
      isLessThanRestLong: 'Значение должно быть короче, чем длинный перерыв',
    },
  },
};

export function validateIntervals(intervals: TIntervals) {
  const validateField = <T extends Record<string, TRule>>(rules: T, errors: TErrors<T>) => {
    for (const rule in rules) {
      if (!rules[rule](intervals)) {
        return errors[rule];
      }
    }
  };

  return {
    workDuration: validateField(validators.workDuration.rules, validators.workDuration.errors),
    alertWorkTime: validateField(validators.alertWorkTime.rules, validators.alertWorkTime.errors),
    restLong: validateField(validators.restLong.rules, validators.restLong.errors),
    restShort: validateField(validators.restShort.rules, validators.restShort.errors),
  };
}
