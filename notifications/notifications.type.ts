export type TScheduleNotification = {
  title: string;
  body: string;
  date: number;
};

export type TAddRangeEndNotificationProps = {
  rangeStart: number;
  rangeEnd: number;
  notifications: TScheduleNotification[];
  nowMs: number;
};
