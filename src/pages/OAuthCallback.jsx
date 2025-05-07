// src/pages/OAuthCallback.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthCallback() {
  const { handleOAuthRedirect } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function finishLogin() {
      try {
        await handleOAuthRedirect();
        navigate("/build", { replace: true });
      } catch (err) {
        console.error("OAuth callback error", err);
      }
    }
    finishLogin();
  }, [handleOAuthRedirect, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Finishing login…</p>
    </div>
  );
}
