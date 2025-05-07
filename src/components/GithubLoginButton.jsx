// src/components/GithubLoginButton.jsx
import React from "react";
import { account } from "../config/appwriteConfig";
import { Github } from "lucide-react";

export default function GithubLoginButton() {
  const redirectUrl = `${window.location.origin}/oauth/callback`;
  const handleGithubLogin = () =>
    account.createOAuth2Session("github", redirectUrl);

  return (
    <button
      onClick={handleGithubLogin}
      className="w-full flex items-center justify-center space-x-2 border border-gray-300 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg transition"
    >
      <Github className="w-5 h-5" />
      <span>Continue with GitHub</span>
    </button>
  );
}
