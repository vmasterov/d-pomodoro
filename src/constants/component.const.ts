import type { TTimepickerError } from '@/types/timepicker.type';

export const buttonVariant = {
  ACCENT: 'accent',
  DEFAULT: 'default',
  DANGER: 'danger',
} as const;

export const buttonMod = {
  BUTTON: 'button',
  FIELD: 'field',
} as const;

export const TIMEPICKER_PLACEHOLDER = '--:--';

export const INIT_TIMEPICKER_ERRORS: TTimepickerError = {
  startDateErrorText: null,
  endDateErrorText: null,
};
