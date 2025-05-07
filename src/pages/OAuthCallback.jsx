// src/pages/OAuthCallback.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../config/appwriteConfig";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthCallback() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    account
      .get()
      .then((user) => {
        setUser(user);
        navigate("/build", { replace: true });
      })
      .catch(() => {
        navigate("/login?error=oauth", { replace: true });
      });
  }, []);

  return <p className="p-8 text-center">Signing you in…</p>;
}
