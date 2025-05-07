// src/pages/OAuthCallback.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function OAuthCallback() {
  const { handleOAuthRedirect } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    handleOAuthRedirect()
      .then(() => navigate("/build", { replace: true }))
      .catch(console.error);
  }, [handleOAuthRedirect, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Finishing login…</p>
    </div>
  );
}
