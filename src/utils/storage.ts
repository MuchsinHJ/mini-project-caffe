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

const isAuthExpired = (key: string):boolean => {
  const expiredAt = getLocalStorage(key);
  if(!expiredAt) return true;
  return Date.now() > Number(expiredAt);
}

export {getLocalStorage, setLocalStorage, removeLocalStorage, isAuthExpired};