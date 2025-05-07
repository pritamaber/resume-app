import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OAuthCallback from "./pages/OAuthCallback";
import ResumeBuilder from "./pages/ResumeBuilder";
import Review from "./pages/Review";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

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
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
