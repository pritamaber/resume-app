// src/components/LinkedinLoginButton.jsx
import React from "react";
import { account } from "../config/appwriteConfig";
import { Linkedin } from "lucide-react";

export default function LinkedinLoginButton() {
  const redirectUrl = `${window.location.origin}/oauth/callback`;
  const handleLinkedinLogin = () =>
    account.createOAuth2Session("linkedin", redirectUrl);

  return (
    <button
      onClick={handleLinkedinLogin}
      className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-100 text-blue-600 px-4 py-2 rounded-lg transition"
    >
      <Linkedin className="w-5 h-5" />
      <span>Continue with LinkedIn</span>
    </button>
  );
}
