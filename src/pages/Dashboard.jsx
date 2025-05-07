// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  // Redirect unauthenticated users to signup
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
          {/* Authenticated Sub-Nav */}
          <div className="flex space-x-4">
            <NavLink
              to="build"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Build
            </NavLink>
            <NavLink
              to="review"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Review
            </NavLink>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              Hello, {user.name || user.email}
            </span>
            <LogoutButton />
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-4xl mx-auto px-4">
        <Outlet />
      </main>
    </div>
  );
}
