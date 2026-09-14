export const restKind = {
  LONG: 'long',
  SHORT: 'short',
} as const;

export const WORK_DURATION = 30 as const;

export const ALERT_WORK_TIME = 5 as const;

export const restDuration = Object.freeze({
  long: 8,
  short: 5,
});

export const intervals = Object.freeze({
  workDuration: WORK_DURATION,
  alertWorkTime: ALERT_WORK_TIME,
  restDuration,
});

export const LIMIT = 240 as const;
