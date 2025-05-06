import { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function ExperienceStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...resumeData.experience];
    updated[index][field] = value;
    updateSection("experience", updated);
  };

  const addEntry = () => {
    updateSection("experience", [
      ...resumeData.experience,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const removeEntry = (index) => {
    const updated = resumeData.experience.filter((_, i) => i !== index);
    updateSection("experience", updated);
  };

  const enhanceDescription = async (index) => {
    try {
      setLoadingIndex(index);
      const entry = resumeData.experience[index];
      const response = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "experience",
          input: `Role: ${entry.role}, Company: ${entry.company}, Description: ${entry.description}`,
        }),
      });
      const result = await response.json();
      if (result.output) {
        handleChange(index, "description", result.output);
      } else {
        alert("AI enhancement failed.");
      }
    } catch (err) {
      console.error("AI enhance error:", err);
      alert("Something went wrong while enhancing experience.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Work Experience
      </h2>

      {resumeData.experience.map((entry, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg bg-indigo-50 space-y-2 relative"
        >
          <input
            type="text"
            placeholder="Company"
            value={entry.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Role/Position"
            value={entry.role}
            onChange={(e) => handleChange(index, "role", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Duration (e.g. Jan 2021 – Present)"
            value={entry.duration}
            onChange={(e) => handleChange(index, "duration", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <div className="relative">
            <textarea
              rows={3}
              placeholder="Brief description of your responsibilities and achievements..."
              value={entry.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-2 pr-10"
            />
            <button
              type="button"
              onClick={() => enhanceDescription(index)}
              disabled={loadingIndex === index}
              className="absolute right-2 top-2 text-yellow-500 hover:text-yellow-600"
              title="Get AI suggestion"
            >
              {loadingIndex === index ? "⏳" : "💡"}
            </button>
          </div>

          <button
            onClick={() => removeEntry(index)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addEntry}
        className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        Add Experience
      </button>
    </div>
  );
}
