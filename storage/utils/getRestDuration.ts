import type { TRestDuration } from '@core/types/common.type';

export function getRestDuration(value: Record<string, unknown>): TRestDuration | null {
  if (
    value['restDuration'] !== null &&
    typeof value['restDuration'] === 'object' &&
    'short' in value['restDuration'] &&
    'long' in value['restDuration']
  ) {
    const short = value['restDuration']['short'];
    const long = value['restDuration']['long'];

    if (typeof short === 'number' && typeof long === 'number') {
      return { short, long };
    }
  }

  return null;
}
