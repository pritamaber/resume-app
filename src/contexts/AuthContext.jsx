// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { account } from "../config/appwriteConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    account
      .get()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const logout = () =>
    account.deleteSession("current").then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
