// src/auth/auth.context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: number;
  nombre: string;
  email: string;
  imageUrl?: string;
  // otros campos que necesites
}

interface AuthContextData {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {}, // Este es el placeholder, se sobrescribe en el provider
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
