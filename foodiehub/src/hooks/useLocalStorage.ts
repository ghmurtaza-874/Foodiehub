import { useCallback, useEffect, useRef, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

/**
 * Persisted state hook. Safely handles corrupt storage and writes on change.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initialValue));
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  // Cross-tab sync.
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === keyRef.current && e.newValue !== null) {
        try {
          setValue(JSON.parse(e.newValue) as T);
        } catch {
          // ignore corrupt
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, setValue, reset] as const;
}
