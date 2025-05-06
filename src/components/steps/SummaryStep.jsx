import { useResumeData } from "../../hooks/useResumeData";
import { useState } from "react";

export default function SummaryStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    updateSection("summary", e.target.value);
  };

  const handleAISuggestion = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "summary",
          input: resumeData.summary,
        }),
      });

      const data = await res.json();

      if (res.ok && data.output) {
        updateSection("summary", data.output);
      } else {
        setError(data.error || "Failed to get AI suggestion.");
      }
    } catch (err) {
      setError("Something went wrong while fetching AI suggestion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Professional Summary
      </h2>

      <textarea
        rows={6}
        placeholder="Briefly describe your experience and goals..."
        value={resumeData.summary}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:border-indigo-500 focus:ring-indigo-500 transition"
      />

      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={handleAISuggestion}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {loading ? "Thinking..." : "💡 Enhance with AI"}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
}
