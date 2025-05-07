// src/pages/Login.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import GoogleLoginButton from "../components/GoogleLoginButton";
import GithubLoginButton from "../components/GithubLoginButton";
import LinkedinLoginButton from "../components/LinkedinLoginButton";

export default function Login() {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/build" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-indigo-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-6">
          Sign In
        </h2>
        <div className="space-y-4">
          <GoogleLoginButton />
          <GithubLoginButton />
          <LinkedinLoginButton />
        </div>
      </div>
    </div>
  );
}
