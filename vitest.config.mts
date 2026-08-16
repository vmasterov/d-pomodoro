import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'node',
    alias: {
      '@core': fileURLToPath(new URL('./core', import.meta.url)),
      '@testUtils': fileURLToPath(new URL('./testUtils', import.meta.url)),
      '@storage': fileURLToPath(new URL('./storage', import.meta.url)),
    },
  },
});
