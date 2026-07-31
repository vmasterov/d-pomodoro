import { afterEach, beforeEach, vi } from 'vitest';
import type { MockInstance } from 'vitest';

export function silenceConsoleWarn() {
  let spy: MockInstance;

  beforeEach(() => (spy = vi.spyOn(console, 'warn').mockImplementation(() => {})));
  afterEach(() => spy.mockRestore());

  return () => spy;
}
