import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveItem(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Erro ao salvar item:", e);
  }
}

export async function getItem(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error("Erro ao obter item:", e);
    return null;
  }
}

export async function deleteItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Erro ao remover item:", e);
  }
}
