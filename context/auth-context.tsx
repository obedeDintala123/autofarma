import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getItem, saveItem, deleteItem } from '@/utils/storage'; 

interface User {
  error: string;
  success: string;
  message: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = async (userData: User | null) => {
    setUserState(userData);
    if (userData) {
      await saveItem('user', JSON.stringify(userData));
    } else {
      await deleteItem('user');
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const stored = await getItem('user');
      if (stored) {
        setUserState(JSON.parse(stored));
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user: user || null, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
