import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStorageData(key: string): Promise<unknown> {
  try {
    const raw = await AsyncStorage.getItem(key);

    if (raw === null) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.warn(error);
    return null;
  }
}

export async function setStorageData(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
}

export async function delStorageData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn(error);
  }
}
