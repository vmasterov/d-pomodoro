import { delStorageData, getStorageData, setStorageData } from './asyncStorage';
import type { TSnapshot } from '@core/types/snapshot.type';
import { snapshotValidator } from './snapshotValidator';
import type { TSettings } from '@core/types/common.type';
import { settingsValidator } from './settingsValidator';

const SNAPSHOT_KEY = 'snapshot';
const SETTINGS_KEY = 'settings';

export async function loadSnapshot(): Promise<TSnapshot | null> {
  const raw = await getStorageData(SNAPSHOT_KEY);

  return snapshotValidator(raw);
}

export async function saveSnapshot(snapshot: TSnapshot): Promise<void> {
  await setStorageData(SNAPSHOT_KEY, snapshot);
}

export async function clearSnapshot(): Promise<void> {
  await delStorageData(SNAPSHOT_KEY);
}

export async function loadSettings(): Promise<TSettings | null> {
  const raw = await getStorageData(SETTINGS_KEY);

  return settingsValidator(raw);
}

export async function saveSettings(settings: TSettings): Promise<void> {
  await setStorageData(SETTINGS_KEY, settings);
}
