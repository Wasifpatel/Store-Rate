
import React, { createContext, useState, useEffect, useMemo } from 'react';
import type { User } from '@/lib/definitions';
import { users, addStore as addNewStore } from '@/lib/data';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Store } from '@/lib/definitions';

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (values: Omit<User, 'id'>) => boolean;
  loading: boolean;
  addUser: (values: Omit<User, 'id' | 'address'> & { address?: string }) => boolean;
  addStore: (storeData: Omit<Store, 'id' | 'imageHint'> & { imageUrl?: string }) => Store;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // re-fetch user from 'DB' to get latest data
        const freshUser = users.find(u => u.id === parsedUser.id);
        setUser(freshUser || null);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/login' || pathname === '/register';
    const isAppPage = !isAuthPage;

    if (!user && isAppPage) {
      navigate('/login');
    }
    
    if (user && isAuthPage) {
      const targetPath = user.role === 'admin' ? '/admin/dashboard' : user.role === 'owner' ? '/owner/dashboard' : '/stores';
      navigate(targetPath);
    }
  }, [user, loading, pathname, navigate]);

  const addUser = (values: Omit<User, 'id' | 'address'> & { address?: string }): boolean => {
    const existingUser = users.find(u => u.email === values.email);
    if (existingUser) {
      return false; // User already exists
    }

    const newUser: User = {
      id: String(users.length + 1),
      ...values,
      address: values.address || 'N/A',
    };
    
    // This is a mock implementation. In a real app, you'd save to a database.
    users.push(newUser);
    return true;
  };
  
  const addStore = (storeData: Omit<Store, 'id' | 'imageHint'> & { imageUrl?: string }): Store => {
    return addNewStore(storeData);
  }

  const login = (email: string) => {
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const register = (values: Omit<User, 'id'>): boolean => {
    const success = addUser(values);
    if (success) {
      const newUser = users.find(u => u.email === values.email);
      if (newUser) {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        navigate('/stores');
      }
    }
    return success;
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    register,
    loading,
    addUser,
    addStore
  }), [user, loading]);

  const showLoadingSpinner = () => (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );

  if (loading) {
    return showLoadingSpinner();
  }
  
  const isAuthPage = pathname === '/login' || pathname === '/register';
  // Allow access to auth pages if not logged in
  if (!user && !isAuthPage) {
    return showLoadingSpinner();
  }
  // Redirect if logged in and on an auth page
  if (user && isAuthPage) {
     return showLoadingSpinner();
  }
  // For other routes, let them render
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
