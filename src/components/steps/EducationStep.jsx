// src/components/steps/EducationStep.jsx
import React from "react";
import { useResumeData } from "../../hooks/useResumeData";
import { Plus, Trash2 } from "lucide-react";

export default function EducationStep() {
  const { resumeData, updateSection } = useResumeData();
  const handleChange = (idx, field, value) => {
    const updated = [...resumeData.education];
    updated[idx][field] = value;
    updateSection("education", updated);
  };
  const addEntry = () =>
    updateSection("education", [
      ...resumeData.education,
      { school: "", degree: "", year: "" },
    ]);
  const removeEntry = (idx) =>
    updateSection(
      "education",
      resumeData.education.filter((_, i) => i !== idx)
    );

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">Education</h2>
      {resumeData.education.map((entry, idx) => (
        <div
          key={idx}
          className="relative p-4 border border-indigo-200 rounded-lg bg-indigo-50 space-y-3"
        >
          <input
            type="text"
            placeholder="School/College"
            value={entry.school}
            onChange={(e) => handleChange(idx, "school", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Degree"
            value={entry.degree}
            onChange={(e) => handleChange(idx, "degree", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Year"
            value={entry.year}
            onChange={(e) => handleChange(idx, "year", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={() => removeEntry(idx)}
            className="absolute top-3 right-3 text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <button
        onClick={addEntry}
        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        <Plus size={16} />
        <span>Add Education</span>
      </button>
    </div>
  );
}
