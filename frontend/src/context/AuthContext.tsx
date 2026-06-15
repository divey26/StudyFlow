import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { authApi } from '../api/authApi';
import { LoginInput, RegisterInput, User } from '../types/auth';

type AuthContextValue = {
  user: User | null;
  token: string | null;
  initializing: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('mindai_user');
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('mindai_token'));
  const [initializing, setInitializing] = useState(Boolean(token));

  useEffect(() => {
    if (!token) {
      setInitializing(false);
      return;
    }
    authApi
      .me()
      .then((currentUser) => {
        setUser(currentUser);
        localStorage.setItem('mindai_user', JSON.stringify(currentUser));
      })
      .catch(() => {
        setToken(null);
        setUser(null);
      })
      .finally(() => setInitializing(false));
  }, [token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      initializing,
      async login(input) {
        const response = await authApi.login(input);
        localStorage.setItem('mindai_token', response.accessToken);
        localStorage.setItem('mindai_user', JSON.stringify(response.user));
        setToken(response.accessToken);
        setUser(response.user);
        toast.success('Welcome back');
      },
      async register(input) {
        await authApi.register(input);
        toast.success('Account created. You can log in now.');
      },
      logout() {
        localStorage.removeItem('mindai_token');
        localStorage.removeItem('mindai_user');
        setToken(null);
        setUser(null);
      },
    }),
    [initializing, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
