// src/components/GoogleLoginButton.jsx
import React from "react";
import { account } from "../config/appwriteConfig";

export default function GoogleLoginButton() {
  const redirectUrl = `${window.location.origin}/oauth/callback`;
  const handleGoogleLogin = () =>
    account.createOAuth2Session("google", redirectUrl);

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      <img src="/google-icon.svg" alt="Google logo" className="w-5 h-5" />
      <span>Continue with Google</span>
    </button>
  );
}
