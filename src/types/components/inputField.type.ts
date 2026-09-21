import type { TPossibleEmptySegmentIntervals } from '@core/types/common.type';

export type TInputFieldProps = {
  onChangeText: (value: string, name: keyof TPossibleEmptySegmentIntervals) => void;
  name: keyof TPossibleEmptySegmentIntervals;
  value: number | null;
  label: string;
  error: string | null;
};
