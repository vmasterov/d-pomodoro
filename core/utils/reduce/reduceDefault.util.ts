import type { TSnapshot } from '../../types/snapshot.type';
import type { TEvent } from '../../types/events.type';

export function reduceDefault(snapshot: TSnapshot, eventType: TEvent['type']): TSnapshot {
  console.warn(`${eventType} is invalid here`);
  return snapshot;
}
