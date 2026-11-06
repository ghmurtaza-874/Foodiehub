import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import type { User } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { STORAGE_KEYS } from '../utils/storage';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => User;
  register: (fullName: string, email: string, phone?: string) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Frontend-only demo auth. No real authentication — purely localStorage.
 * Never stores passwords or sensitive data.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showToast } = useToast();
  const [user, setUser] = useLocalStorage<User | null>(STORAGE_KEYS.user, null);

  const login = useCallback(
    (email: string): User => {
      // Derive a demo name from the email's local part.
      const localPart = email.split('@')[0] ?? 'Customer';
      const name = localPart
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const newUser: User = {
        id: `u-${Date.now()}`,
        fullName: name,
        email,
        joinedAt: Date.now(),
      };
      setUser(newUser);
      showToast('success', `Welcome back, ${name}!`);
      return newUser;
    },
    [setUser, showToast],
  );

  const register = useCallback(
    (fullName: string, email: string, phone?: string): User => {
      const newUser: User = {
        id: `u-${Date.now()}`,
        fullName,
        email,
        phone,
        joinedAt: Date.now(),
      };
      setUser(newUser);
      showToast('success', `Account created. Welcome to FoodieHub, ${fullName}!`);
      return newUser;
    },
    [setUser, showToast],
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast('info', 'You have been signed out.');
  }, [setUser, showToast]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
