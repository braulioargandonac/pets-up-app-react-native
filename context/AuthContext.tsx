import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import * as tokenService from '../services/tokenService';
import { User } from '../types/user.types';
import { AuthResponse } from '../types/auth.types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
          const response = await api.get<User>('/users/me'); 
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
      const response = await api.post<AuthResponse>('/auth/login', {
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

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
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