import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-4">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        AI-Powered Resume Builder
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Easily build ATS-friendly resumes with AI smart suggestions.
      </p>
      <Link
        to="/build"
        className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition"
      >
        Start Building Resume
      </Link>
    </div>
  );
}
