// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";
import { ResumeProvider } from "./hooks/useResumeData";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Authentication context wraps entire app */}
    <AuthProvider>
      {/* Resume data context provided to all pages */}
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </AuthProvider>
  </React.StrictMode>
);
