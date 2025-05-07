// src/pages/Home.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Illustration from "../assets/resume-illustration.svg";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-white">
      {/* Hero */}
      <header className="bg-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-6xl font-extrabold leading-tight">
              Elevate Your Resume
            </h1>
            <p className="text-xl">
              Craft standout, ATS-ready resumes in minutes with AI-driven
              insights.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              {user ? (
                <Link
                  to="/build"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Start Building
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition"
                >
                  Get Started
                </Link>
              )}
              <Link
                to="/features"
                className="px-6 py-3 border border-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src={Illustration}
              alt="AI-powered resume illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-indigo-700">
            Why Choose ResumeAI?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">
                AI-Powered Suggestions
              </h3>
              <p>
                Leverage machine learning to highlight your strengths and
                optimize for recruiters.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">ATS-Friendly</h3>
              <p>
                Ensure your resume passes Applicant Tracking Systems and lands
                in human hands.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">Custom Templates</h3>
              <p>
                Choose from sleek, professional templates tailored for any
                industry or role.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
