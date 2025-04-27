// src/lib/auth-context.tsx
"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  memberId: number | null;
  login: (token: string, memberId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedMemberId = localStorage.getItem("memberId");
    if (storedToken && storedMemberId) {
      setToken(storedToken);
      setMemberId(parseInt(storedMemberId));
    }
  }, []);

  const login = (newToken: string, newMemberId: number) => {
    setToken(newToken);
    setMemberId(newMemberId);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("memberId", newMemberId.toString());
  };

  const logout = () => {
    setToken(null);
    setMemberId(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("memberId");
  };

  return (
    <AuthContext.Provider value={{ token, memberId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
