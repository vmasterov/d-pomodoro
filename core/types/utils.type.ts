export type TConvertHoursToTimestamp = {
  h: number;
  m?: number;
  date: Date;
  dayOffset?: number;
};

export type TCheckIsIntervalHasErrorsParam<Intervals> = {
  [Interval in keyof Intervals]: string | null;
};
