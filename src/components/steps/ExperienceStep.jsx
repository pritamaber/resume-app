// src/components/steps/ExperienceStep.jsx
import React, { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";
import { Plus, Trash2, Lightbulb } from "lucide-react";

export default function ExperienceStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loadingIdx, setLoadingIdx] = useState(null);

  const handleChange = (idx, field, value) => {
    const updated = [...resumeData.experience];
    updated[idx][field] = value;
    updateSection("experience", updated);
  };
  const addEntry = () =>
    updateSection("experience", [
      ...resumeData.experience,
      { company: "", role: "", duration: "", description: "" },
    ]);
  const removeEntry = (idx) =>
    updateSection(
      "experience",
      resumeData.experience.filter((_, i) => i !== idx)
    );
  const enhance = async (idx) => {
    setLoadingIdx(idx);
    const entry = resumeData.experience[idx];
    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "experience",
          input: `Role: ${entry.role}, Company: ${entry.company}, Description: ${entry.description}`,
        }),
      });
      const data = await res.json();
      if (data.output) handleChange(idx, "description", data.output);
    } catch {
      // handle error
    } finally {
      setLoadingIdx(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">Work Experience</h2>
      {resumeData.experience.map((entry, idx) => (
        <div
          key={idx}
          className="relative p-4 border border-indigo-200 rounded-lg bg-indigo-50 space-y-3"
        >
          <input
            type="text"
            placeholder="Company"
            value={entry.company}
            onChange={(e) => handleChange(idx, "company", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Role/Position"
            value={entry.role}
            onChange={(e) => handleChange(idx, "role", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Duration (e.g. Jan 2021 – Present)"
            value={entry.duration}
            onChange={(e) => handleChange(idx, "duration", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Description..."
              value={entry.description}
              onChange={(e) => handleChange(idx, "description", e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <button
              onClick={() => enhance(idx)}
              disabled={loadingIdx === idx}
              className={`absolute right-2 top-2 transition ${
                {
                  true: "text-gray-400",
                }[loadingIdx === idx]
              } md:hover:text-yellow-600`}
              title="Enhance description"
            >
              <Lightbulb size={18} />
            </button>
          </div>
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
        <span>Add Experience</span>
      </button>
    </div>
  );
}
