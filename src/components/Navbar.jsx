// src/components/Navbar.jsx
import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import LogoutButton from "./LogoutButton";

const navItems = [
  { name: "Home", to: "/" },
  { name: "Build Resume", to: "/build" },
  // you can add more routes here
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ResumeAI
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map(({ name, to }) => (
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

          {/* Auth / Actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.name || user.email}</span>
                <LogoutButton />
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ name, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
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
                className="block text-center bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition"
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
