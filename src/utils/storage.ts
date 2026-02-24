// buat token
const storage = typeof window === 'undefined'? null : localStorage;

const getLocalStorage = <T>(key: string): T | null => {
  if (!storage) return null;

  const item = storage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error("Invalid JSON in localStorage:", error);
    return null;
  }
};

const setLocalStorage = (key: string, value: unknown) => storage?.setItem(key, JSON.stringify(value));

const removeLocalStorage = (key: string) => storage?.removeItem(key);

export {getLocalStorage, setLocalStorage, removeLocalStorage};