import { Link } from "react-router-dom";

export default function Review() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-50 p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Review Your Resume
      </h1>
      <p className="text-gray-600 mb-8 text-center">
        Review step content will be added here soon.
      </p>
      <Link
        to="/build"
        className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition"
      >
        Go Back
      </Link>
    </div>
  );
}
