export type TRangeFieldsError = {
  startDateErrorText?: string;
  endDateErrorText?: string;
};

export type TTimeRange = {
  startDate: Date | null;
  endDate: Date | null;
  updateRangeField: (field: Date, type: 'start' | 'end') => void;
  errors?: TRangeFieldsError;
};
