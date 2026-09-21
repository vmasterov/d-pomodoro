import { convertHoursToTimestamp } from '@core/utils/date.util';
import { DEFAULT_WORK_END_HOUR, DEFAULT_WORK_START_HOUR } from '@/constants/component.const';

export function getInitDate() {
  const date = new Date();

  const startTimestamp = convertHoursToTimestamp({
    h: DEFAULT_WORK_START_HOUR,
    date,
  });

  const endTimestamp = convertHoursToTimestamp({
    h: DEFAULT_WORK_END_HOUR,
    date,
  });

  return {
    startTimestamp,
    endTimestamp,
  };
}
