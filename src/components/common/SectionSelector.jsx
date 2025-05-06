import { useResumeData } from "../../hooks/useResumeData";

const sectionList = [
  { key: "summary", label: "Summary" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "certificates", label: "Certificates" },
];

export default function SectionSelector() {
  const { resumeData, updateSection } = useResumeData();

  const toggleSection = (key) => {
    updateSection("sections", {
      ...resumeData.sections,
      [key]: !resumeData.sections[key],
    });
  };

  return (
    <div className="bg-white shadow rounded-md p-4 mb-6">
      <h3 className="text-lg font-semibold mb-3 text-indigo-600">
        🧩 Customize Sections
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {sectionList.map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={resumeData.sections[key]}
              onChange={() => toggleSection(key)}
              className="accent-indigo-600"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}
