import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check auth state on initial load
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (email: string) => {
    // In a real app, you would call your API here
    localStorage.setItem('userEmail', email);
    console.log(`OTP would be sent to: ${email}`);
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    // Mock verification - always accept "123456"
    if (otp === '123456') {
      localStorage.setItem('authToken', 'dummy-token');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, verifyOtp, logout }}>
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