import { useResumeData } from "../../hooks/useResumeData";

export default function EducationStep() {
  const { resumeData, updateSection } = useResumeData();

  const handleChange = (index, field, value) => {
    const updated = [...resumeData.education];
    updated[index][field] = value;
    updateSection("education", updated);
  };

  const addEntry = () => {
    updateSection("education", [
      ...resumeData.education,
      { school: "", degree: "", year: "" },
    ]);
  };

  const removeEntry = (index) => {
    const updated = resumeData.education.filter((_, i) => i !== index);
    updateSection("education", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Education</h2>

      {resumeData.education.map((entry, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg bg-indigo-50 space-y-2 relative"
        >
          <input
            type="text"
            placeholder="School/College"
            value={entry.school}
            onChange={(e) => handleChange(index, "school", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Degree"
            value={entry.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Year"
            value={entry.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />

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
        Add Education
      </button>
    </div>
  );
}
