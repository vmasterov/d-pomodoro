export const restKind = {
  LONG: 'long',
  SHORT: 'short',
} as const;

export const WORK_DURATION = 30 as const;

export const ALERT_WORK_TIME = 5 as const;

export const REST_DURATION_SHORT = 5 as const;
export const REST_DURATION_LONG = 8 as const;

export const intervals = Object.freeze({
  workDuration: WORK_DURATION,
  alertWorkTime: ALERT_WORK_TIME,
  restShort: REST_DURATION_SHORT,
  restLong: REST_DURATION_LONG,
});

export const LIMIT = 59 as const;
