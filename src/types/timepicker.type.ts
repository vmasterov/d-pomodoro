export type TTimepickerError = {
  startDateErrorText: string | null;
  endDateErrorText: string | null;
};

export type TTimepicker = {
  startDate: Date | null;
  endDate: Date | null;
  updateRangeField: (field: Date, isStart?: boolean) => void;
  errors?: TTimepickerError;
};
