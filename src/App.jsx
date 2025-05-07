// 1. Framework
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// 2. Contexts / Services
import { AuthProvider } from "./contexts/AuthContext";
// 3. Layout / Common Components
import Navbar from "./components/common/Navbar";
// 4. Helpers / HOCs
import ProtectedRoute from "./components/ProtectedRoute";
// 5. Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import ResumeBuilder from "./pages/ResumeBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Global Navbar */}
        <Navbar />

        {/* Application Routes */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />

          {/* Protected resume builder flow */}
          <Route
            path="/build"
            element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
