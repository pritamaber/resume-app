// src/components/steps/SummaryStep.jsx
import React, { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";

export default function SummaryStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => updateSection("summary", e.target.value);
  const handleAISuggestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "summary", input: resumeData.summary }),
      });
      const data = await res.json();
      if (res.ok && data.output) updateSection("summary", data.output);
      else setError(data.error || "Failed to get AI suggestion.");
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">
        Professional Summary
      </h2>
      <textarea
        rows={6}
        value={resumeData.summary}
        onChange={handleChange}
        placeholder="Briefly describe your experience and goals..."
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
      <div className="flex items-center space-x-4">
        <button
          onClick={handleAISuggestion}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Enhance with AI"}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
