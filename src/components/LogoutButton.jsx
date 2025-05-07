// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function LogoutButton({ className = "" }) {
  const { logout } = useContext(AuthContext);

  return (
    <button
      onClick={logout}
      className={`border border-gray-300 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded transition ${className}`}
    >
      Logout
    </button>
  );
}
