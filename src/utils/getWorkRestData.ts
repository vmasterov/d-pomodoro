import { recommendedRest, remainingMs } from '@core/selectors/selectors';
import { convertRemainingMsToFormattedTime } from '@core/utils/date.util';
import type { TRestKind } from '@core/types/common.type';
import { restKind } from '@core/constants/segment.const';
import { MS_PER_HOUR } from '@core/constants/common.const';
import type { TRestSnapshot, TWorkSnapshot } from '@core/types/snapshot.type';
import type { TGetWorkRestDataReturn } from '@/types/utils/getWorkRestData.type';

export function getWorkRestData(
  snapshot: TWorkSnapshot | TRestSnapshot,
  nowMs: number,
): TGetWorkRestDataReturn {
  const currentRemainingMs = remainingMs(snapshot, nowMs);
  const formattedTime = convertRemainingMsToFormattedTime(currentRemainingMs);

  const primaryKind: TRestKind = recommendedRest(snapshot.workSegmentCount);
  const secondaryKind: TRestKind = primaryKind === restKind.SHORT ? restKind.LONG : restKind.SHORT;

  const recommendedRestText =
    primaryKind === restKind.SHORT
      ? 'Рекомендуется короткий перерыв'
      : 'Рекомендуется длинный перерыв';

  const isNegativeTime = currentRemainingMs < 0;

  const restInfoText = isNegativeTime ? 'Переход к отдыху просрочен на' : 'До начала отдыха';
  const workInfoText = isNegativeTime ? 'Переход к работе просрочен на' : 'До начала работы';

  const isMoreHourDowntime = Math.abs(currentRemainingMs) >= MS_PER_HOUR;

  return {
    formattedTime,
    primaryKind,
    secondaryKind,
    recommendedRestText,
    isNegativeTime,
    restInfoText,
    workInfoText,
    isMoreHourDowntime,
  };
}
