import { restKind } from '@core/constants/segment.const';
import type { TRestKind } from '@core/types/common.type';

export function getRestKind(value: Record<string, unknown>): TRestKind | null {
  return typeof value.restKind === 'string' &&
    (value.restKind === restKind.LONG || value.restKind === restKind.SHORT)
    ? value.restKind
    : null;
}
