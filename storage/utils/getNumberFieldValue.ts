export function getNumberFieldValue(value: Record<string, unknown>, name: string): number | null {
  return typeof value[name] === 'number' && Number.isFinite(value[name]) ? value[name] : null;
}
