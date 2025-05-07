// src/components/common/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import LogoutButton from "../LogoutButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Only show 'Build Resume' for authenticated users
  const navItems = user ? [{ name: "Build Resume", to: "/build" }] : [];

  // Logo link destination
  const logoLink = user ? "/build" : "/";

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
        {/* Logo links dynamically based on auth */}
        <Link to={logoLink} className="flex items-center">
          <img
            src="/src/assets/logo.svg"
            alt="resum.ai logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Menu */}
        {navItems.length > 0 && (
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md transition ${
                    isActive ? "font-semibold border-b-2 border-indigo-600" : ""
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Auth Actions */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">{user.name || user.email}</span>
              <LogoutButton />
            </>
          ) : (
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Create Resume
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded text-gray-700 hover:bg-gray-100 focus:outline-none"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {navItems.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
            <div className="border-t my-2" />
            {user ? (
              <div className="px-3 py-2 space-y-2">
                <span className="block text-gray-700">
                  Hi, {user.name || user.email}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block text-center bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
