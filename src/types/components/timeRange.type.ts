import type { TFieldType } from '@/types/components/timeField.type';

export type TRangeFieldsError = {
  startDateErrorText?: string;
  endDateErrorText?: string;
};

export type TTimeRange = {
  startDate: Date;
  endDate: Date;
  updateRangeField: (field: Date, type: TFieldType) => void;
  errors?: TRangeFieldsError;
};
