import type { TFieldType } from '@/types/components/timeField.type';

export type TRangeFieldsError = {
  startDateErrorText?: string;
  endDateErrorText?: string;
};

export type TTimeRange = {
  startDate: Date | null;
  endDate: Date | null;
  updateRangeField: (field: Date, type: TFieldType) => void;
  errors?: TRangeFieldsError;
};
