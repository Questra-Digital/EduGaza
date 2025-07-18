import { useState, useEffect } from 'react';
import { User, getUserData, isAuthenticated, clearAuth } from '../lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUserData();
        setUser(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout
  };
};