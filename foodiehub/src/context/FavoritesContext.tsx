import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { Favorite, Product } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { STORAGE_KEYS } from '../utils/storage';

interface FavoritesContextValue {
  favorites: Favorite[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  clearFavorites: () => void;
  count: number;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const [favorites, setFavorites] = useLocalStorage<Favorite[]>(
    STORAGE_KEYS.favorites,
    [],
  );

  const isFavorite = useCallback(
    (productId: string) => favorites.some((f) => f.product.id === productId),
    [favorites],
  );

  const addFavorite = useCallback(
    (product: Product) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.product.id === product.id)) return prev;
        return [{ product, addedAt: Date.now() }, ...prev];
      });
      showToast('success', `${product.name} added to favorites.`);
    },
    [setFavorites, showToast],
  );

  const removeFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => prev.filter((f) => f.product.id !== productId));
    },
    [setFavorites],
  );

  const toggleFavorite = useCallback(
    (product: Product) => {
      setFavorites((prev) => {
        if (prev.some((f) => f.product.id === product.id)) {
          showToast('info', `${product.name} removed from favorites.`);
          return prev.filter((f) => f.product.id !== product.id);
        }
        showToast('success', `${product.name} added to favorites.`);
        return [{ product, addedAt: Date.now() }, ...prev];
      });
    },
    [setFavorites, showToast],
  );

  const clearFavorites = useCallback(() => setFavorites([]), [setFavorites]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      count: favorites.length,
    }),
    [favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
};
