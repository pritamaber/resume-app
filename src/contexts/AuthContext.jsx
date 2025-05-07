// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { account } from "../config/appwriteConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check existing session on load
  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const handleOAuthRedirect = async () => {
    // After OAuth, re-fetch session
    await account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  };

  return (
    <AuthContext.Provider value={{ user, logout, handleOAuthRedirect }}>
      {children}
    </AuthContext.Provider>
  );
}
