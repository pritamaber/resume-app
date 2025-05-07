// src/pages/Login.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/build" replace />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Sign In</h1>
      <GoogleLoginButton />
    </div>
  );
}
