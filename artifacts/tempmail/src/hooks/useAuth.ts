import { useState } from 'react';

interface Admin {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('admin_authenticated') === 'true';
  });

  const adminCredentials: Admin = {
    email: 'admin@tempmail.com',
    password: 'TempMail@2024Secure',
  };

  const login = (email: string, password: string): boolean => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    adminCredentials,
    login,
    logout,
  };
};
