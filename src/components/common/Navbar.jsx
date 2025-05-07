// src/components/common/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import LogoutButton from "../LogoutButton";

const NAV_ITEMS = [
  { name: "Home", to: "/" },
  { name: "Build Resume", to: "/build" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 flex justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/src/assets/logo.svg"
            alt="resum.ai logo"
            className="h-8 w-auto"
          />
          {/* fallback text if you want
          <span className="hidden md:inline text-2xl font-bold text-indigo-600">
            resum.ai
          </span> */}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {NAV_ITEMS.map(({ name, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-gray-700 hover:text-indigo-600 ${
                  isActive ? "font-semibold border-b-2 border-indigo-600" : ""
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">{user.name || user.email}</span>
              <LogoutButton />
            </>
          ) : (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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
          <div className="px-4 py-2 space-y-1">
            {NAV_ITEMS.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {name}
              </NavLink>
            ))}
            <div className="border-t my-2" />
            {user ? (
              <div className="px-3 py-2">
                <span className="block text-gray-700 mb-2">
                  Hi, {user.name || user.email}
                </span>
                <LogoutButton />
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="block text-center bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
