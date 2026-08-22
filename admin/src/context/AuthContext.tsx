import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPER_ADMIN' | 'USER';
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('ym_admin_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('ym_admin_token');
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res && res.success && res.data) {
            setUser(res.data);
            localStorage.setItem('ym_admin_user', JSON.stringify(res.data));
          } else {
            handleClearAuth();
          }
        } catch (error) {
          console.warn('[AuthContext] Session verification failed');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleClearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ym_admin_user');
    localStorage.removeItem('ym_admin_token');
  };

  const login = async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    if (res && res.success && res.data) {
      setUser(res.data);
      setToken(res.data.token || 'logged_in');
      localStorage.setItem('ym_admin_user', JSON.stringify(res.data));
      if (res.data.token) {
        localStorage.setItem('ym_admin_token', res.data.token);
      }
    }
    return res;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.warn('[AuthContext] Logout API error:', e);
    }
    handleClearAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'),
        isLoading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
