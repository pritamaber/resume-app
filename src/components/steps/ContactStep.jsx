// src/components/steps/ContactStep.jsx
import React from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function ContactStep() {
  const { resumeData, updateSection } = useResumeData();
  const handleChange = (e) =>
    updateSection("contact", {
      ...resumeData.contact,
      [e.target.name]: e.target.value,
    });

  const fields = [
    { name: "name", placeholder: "Full Name" },
    { name: "email", placeholder: "Email" },
    { name: "phone", placeholder: "Phone Number" },
    { name: "linkedin", placeholder: "LinkedIn URL (optional)" },
    { name: "portfolio", placeholder: "Portfolio URL (optional)" },
    { name: "github", placeholder: "GitHub URL (optional)" },
    { name: "location", placeholder: "Location (optional)" },
    { name: "twitter", placeholder: "Twitter URL (optional)" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ name, placeholder }) => (
          <input
            key={name}
            name={name}
            value={resumeData.contact[name] || ""}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        ))}
      </div>
    </div>
  );
}
