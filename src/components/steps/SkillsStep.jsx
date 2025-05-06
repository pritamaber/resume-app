import { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function SkillsStep() {
  const { resumeData, updateSection } = useResumeData();
  const [input, setInput] = useState("");

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !resumeData.skills.includes(skill)) {
      updateSection("skills", [...resumeData.skills, skill]);
      setInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = resumeData.skills.filter((s) => s !== skillToRemove);
    updateSection("skills", updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSmartSuggest = () => {
    alert("💡 Smart Skill Suggestions coming soon!");
    // Later: connect to Appwrite function and update skills
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Skills</h2>

      <div className="flex gap-2 mb-4 relative">
        <input
          type="text"
          placeholder="Enter a skill and press Enter"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-indigo-500"
        />
        <button
          onClick={addSkill}
          className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
        >
          Add
        </button>
        <button
          title="Suggest Skills (AI)"
          onClick={handleSmartSuggest}
          className="absolute -right-10 top-1 text-yellow-500 hover:text-yellow-600 text-xl"
        >
          💡
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-indigo-500 hover:text-red-500"
              title="Remove skill"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
