// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { account } from "../config/appwriteConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Called on app load & after OAuth redirects
  async function checkSession() {
    try {
      const session = await account.get();
      setUser(session);
    } catch {
      setUser(null);
    }
  }

  // After OAuth redirect from Appwrite, this refreshes session
  async function handleOAuthRedirect() {
    await checkSession();
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, logout, handleOAuthRedirect }}>
      {children}
    </AuthContext.Provider>
  );
}
