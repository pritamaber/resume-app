import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  // Auto-play the slideshow every 4 seconds
  useEffect(() => {
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
        {" "}
        {/* Centered content */}
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0">
          {" "}
          {/* Ensures content is centered */}
          <div className="md:w-1/2 space-y-4 text-center md:text-left">
            {" "}
            {/* Align text to center for small screens */}
            <h1 className="text-4xl font-extrabold leading-tight text-gray-800">
              Elevate Your Resume
            </h1>
            <p className="text-lg text-gray-600">
              Craft standout, ATS-ready resumes in minutes with AI-driven
              insights.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 justify-center md:justify-start">
              {" "}
              {/* Center buttons */}
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
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center relative overflow-hidden">
            <div
              className="flex transition-all duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {/* Render slides */}
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
    </div>
  );
}
