// src/components/GoogleLoginButton.jsx
import React from "react";
import { account } from "../config/appwriteConfig";
import { SiGoogle } from "react-icons/si";

export default function GoogleLoginButton() {
  const redirectUrl = `${window.location.origin}/oauth/callback`;

  const handleGoogleLogin = () => {
    account.createOAuth2Session("google", redirectUrl);
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg transition"
    >
      <SiGoogle className="w-5 h-5 text-red-600" />
      <span>Continue with Google</span>
    </button>
  );
}
