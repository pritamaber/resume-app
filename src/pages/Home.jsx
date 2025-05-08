import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import AOS from "aos"; // Import AOS

import "aos/dist/aos.css"; // Import AOS styles

export default function Home() {
  const { user } = useContext(AuthContext);

  // Resumes for the slideshow
  const resumes = [
    { title: "Graphic Designer", img: "/assets/resume-preview01.svg" },
    { title: "Software Developer", img: "/assets/resume-preview02.svg" },
    { title: "Data Scientist", img: "/assets/resume-preview03.svg" },
    { title: "Marketing Manager", img: "/assets/resume-preview04.svg" },
    { title: "Product Manager", img: "/assets/resume-preview05.svg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Animation easing
      once: true, // Animation triggers only once
    });

    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  // Go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % resumes.length);
  };

  // Go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + resumes.length) % resumes.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-white">
      {/* Hero */}
      <header className="flex items-center justify-center text-gray-900 py-4 md:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
          <div
            className="md:w-1/2 space-y-4 text-center md:text-left"
            data-aos="fade-up"
          >
            <h1 className="text-4xl font-extrabold leading-tight text-gray-800">
              Elevate Your Resume
            </h1>
            <p className="text-lg text-gray-600">
              Craft standout, ATS-ready resumes in minutes with AI-driven
              insights.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
              {user ? (
                <Link
                  to="/build"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Start Building
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>
              )}
              <Link
                to="/features"
                className="px-6 py-3 border border-indigo-600 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Slide Show for Resumes */}
          <div
            className="md:w-1/2 mt-6 md:mt-0 flex justify-center relative overflow-hidden"
            data-aos="fade-left"
          >
            <div
              className="flex transition-all duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {resumes.map((resume, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                  style={{
                    transform: `scale(0.6)`, // Smaller images initially
                    transition: "transform 0.5s ease", // Smooth transition
                  }}
                >
                  <img
                    src={resume.img}
                    alt={resume.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 pl-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition"
              >
                <FaChevronLeft />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 pr-4">
              <button
                onClick={nextSlide}
                className="p-2 bg-gray-800 text-white rounded-full hover:bg-gray-600 transition"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-indigo-50 py-20" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-10">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-100 duration-300">
              <div className="mb-4 text-indigo-600">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11h-2V7h2v1zm0 2h-2v6h2v-6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                ATS-Ready Resumes
              </h3>
              <p className="text-gray-600">
                Generate resumes that pass through Applicant Tracking Systems
                and get noticed by recruiters.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-100 duration-300">
              <div className="mb-4 text-indigo-600">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 8a6 6 0 1112 0A6 6 0 012 8zM4 8a4 4 0 118 0A4 4 0 014 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                AI-Driven Insights
              </h3>
              <p className="text-gray-600">
                Our AI suggests improvements to your resume for better impact
                and relevance.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-100 duration-300">
              <div className="mb-4 text-indigo-600">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 4a1 1 0 011 1v8.618l6.447-3.235a1 1 0 111.06 1.732l-7 3.5A1 1 0 017 14V5a1 1 0 011-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Customizable Templates
              </h3>
              <p className="text-gray-600">
                Choose from a variety of professional templates to create the
                perfect resume.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-indigo-600 py-20 text-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-10">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-50 duration-300">
              <p className="italic">
                "This app helped me land my dream job! My resume looks great,
                and I feel confident in my applications."
              </p>
              <h3 className="font-semibold text-lg mt-4">John Doe</h3>
              <p>Software Engineer</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-50 duration-300">
              <p className="italic">
                "The AI-driven insights were a game-changer. I had no idea how
                much my resume needed improvement."
              </p>
              <h3 className="font-semibold text-lg mt-4">Jane Smith</h3>
              <p>Product Manager</p>
            </div>
            <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-indigo-50 duration-300">
              <p className="italic">
                "Fast, easy, and effective. I highly recommend this tool for
                anyone looking to improve their resume."
              </p>
              <h3 className="font-semibold text-lg mt-4">Michael Brown</h3>
              <p>Data Scientist</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
