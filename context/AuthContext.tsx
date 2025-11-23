import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import * as tokenService from '../services/tokenService';
import { User } from '../types/user.types';
import { AuthResponse } from '../types/auth.types';
import { API_ROUTES } from '@/constants/ApiRoutes';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromToken() {
      const token = await tokenService.getToken();
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const response = await api.get<User>(API_ROUTES.USERS.ME);
          setUser(response.data);
        } catch (error) {
          console.log('Token inválido, borrando...', error);
          await tokenService.removeToken();
        }
      }
      setIsLoading(false);
    }
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, {
        email,
        password,
      });

      const { accessToken, user } = response.data;

      await tokenService.saveToken(accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      setUser(user);

    } catch (error) {
      console.error('Error en el login:', error);
      throw new Error('Email o contraseña incorrectos.');
    }
  };

  const logout = async () => {
    await tokenService.removeToken();
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const deleteAccount = async () => {
    try {
      await api.delete(API_ROUTES.USERS.ME);
      await logout();
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        deleteAccount,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};