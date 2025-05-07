// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
    >
      Logout
    </button>
  );
}
