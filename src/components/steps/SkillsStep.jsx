// src/components/steps/SkillsStep.jsx
import React, { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";
import { Tag, X } from "lucide-react";

export default function SkillsStep() {
  const { resumeData, updateSection } = useResumeData();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  const addSkill = () => {
    const skill = input.trim();
    if (!skill) {
      setError("Skill cannot be empty.");
      return;
    }
    if (resumeData.skills.includes(skill)) {
      setError("Skill already added.");
      return;
    }
    updateSection("skills", [...resumeData.skills, skill]);
    setInput("");
    setError(null);
  };

  const removeSkill = (skill) => {
    updateSection(
      "skills",
      resumeData.skills.filter((s) => s !== skill)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">Skills</h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill and press Enter"
            className="w-full border border-gray-300 rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={addSkill}
            className="absolute right-2 top-2 text-indigo-600 hover:text-indigo-800 transition"
            title="Add skill"
          >
            <Tag size={20} />
          </button>
        </div>
        <button
          onClick={addSkill}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full space-x-1"
          >
            <span>{skill}</span>
            <button
              onClick={() => removeSkill(skill)}
              className="p-1 hover:text-red-600 transition"
              title="Remove skill"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
