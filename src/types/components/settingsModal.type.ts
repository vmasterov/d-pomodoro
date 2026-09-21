import type { TPossibleEmptySegmentIntervals, TSegmentIntervals } from '@core/types/common.type';

export type TSettingsModalProps = {
  onClose: () => void;
  onSave: (intervals: TSegmentIntervals) => void;
  initIntervals: TPossibleEmptySegmentIntervals;
};
