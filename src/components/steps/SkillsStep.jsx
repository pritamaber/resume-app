import { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function SkillsStep() {
  const { resumeData, updateSection } = useResumeData();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const addSkill = () => {
    const skill = input.trim();
    if (skill && !resumeData.skills.includes(skill)) {
      updateSection("skills", [...resumeData.skills, skill]);
      setInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const updated = resumeData.skills.filter((s) => s !== skillToRemove);
    updateSection("skills", updated);
  };

  const toggleSuggestedSkill = (skill) => {
    if (resumeData.skills.includes(skill)) {
      removeSkill(skill);
    } else {
      updateSection("skills", [...resumeData.skills, skill]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSmartSuggest = async () => {
    const context = `${resumeData.summary || ""}\n${resumeData.experience
      .map((e) => e.description)
      .join("\n")}`;

    const input =
      "Based on this candidate's profile, suggest 8 professional skills. Return only a comma-separated list, no explanation.";

    try {
      setLoading(true);
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "skills", input, context }),
      });

      const { output } = await res.json();
      const parsed = output
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      setSuggestions(parsed);
    } catch (err) {
      alert("❌ Skill suggestion failed");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
          className="absolute -right-10 top-1 text-yellow-500 hover:text-yellow-600 text-xl"
        >
          💡
        </button>
      </div>

      {/* Suggested AI Skills */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm text-gray-500 mb-1">💡 AI Suggestions:</h4>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((skill, i) => {
              const alreadyAdded = resumeData.skills.includes(skill);
              return (
                <button
                  key={i}
                  onClick={() => toggleSuggestedSkill(skill)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    alreadyAdded
                      ? "bg-green-100 text-green-700 border-green-400"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-indigo-100 hover:border-indigo-400"
                  }`}
                >
                  {alreadyAdded ? "✓ " : ""}
                  {skill}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Existing Skills */}
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
