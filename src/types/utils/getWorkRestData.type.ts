import type { TRestKind } from '@core/types/common.type';

export type TGetWorkRestDataReturn = {
  formattedTime: string;
  primaryKind: TRestKind;
  secondaryKind: TRestKind;
  recommendedRestText: string;
  isNegativeTime: boolean;
  restInfoText: string;
  workInfoText: string;
  isMoreHourDowntime: boolean;
};
