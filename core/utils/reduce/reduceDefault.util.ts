import type { TSnapshot } from '@core/types/snapshot.type';
import type { TEvent } from '@core/types/events.type';

export function reduceDefault(snapshot: TSnapshot, eventType: TEvent['type']): TSnapshot {
  console.warn(`${eventType} is invalid here`);
  return snapshot;
}
