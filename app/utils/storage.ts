import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AsyncStorageKeys {
  PREVIOUS_USER_UID = "previous-user-uid",
}

export const storeDataInAsyncStorage = async (
  key: AsyncStorageKeys,
  value: string
) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn(e);
  }
};

export const removeDataFromAsyncStorage = async (key: AsyncStorageKeys) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(e);
  }
};

export const getDataFromAsyncStorage = async (key: AsyncStorageKeys) => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value ?? undefined;
  } catch (e) {
    console.warn(e);
  }
};
