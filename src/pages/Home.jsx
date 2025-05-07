// src/pages/Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

import Illustration from "../assets/resume-illustration.svg";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <main className="flex-grow flex flex-col md:flex-row items-center max-w-7xl mx-auto px-4 py-12">
        <section className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-extrabold text-indigo-700">
            AI-Powered Resume Builder
          </h1>
          <p className="text-lg text-gray-600">
            Create ATS-friendly resumes in seconds with smart AI suggestions.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            {user ? (
              <>
                <Link
                  to="/build"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Start Building
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            )}
          </div>
        </section>
        <section className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src={Illustration}
            alt="Resume illustration"
            className="w-full max-w-md"
          />
        </section>
      </main>
    </div>
  );
}
