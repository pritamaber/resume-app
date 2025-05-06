import { useResumeData } from "../../hooks/useResumeData";

export default function SummaryStep() {
  const { resumeData, updateSection } = useResumeData();

  const handleChange = (e) => {
    updateSection("summary", e.target.value);
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

      {/* Placeholder for AI suggestions */}
      <div className="mt-2 text-sm text-gray-500">
        💡 Coming soon: AI suggestions for your summary!
      </div>
    </div>
  );
}
