export function convertValueToString(value: number | null): string {
  return Number.isFinite(value) ? String(value) : '';
}
