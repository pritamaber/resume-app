import { useResumeData } from "../../hooks/useResumeData";
import { useState } from "react";

export default function ProjectsStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleChange = (index, field, value) => {
    const updated = [...resumeData.projects];
    updated[index][field] = value;
    updateSection("projects", updated);
  };

  const addProject = () => {
    updateSection("projects", [
      ...resumeData.projects,
      { title: "", description: "", link: "" },
    ]);
  };

  const removeProject = (index) => {
    const updated = resumeData.projects.filter((_, i) => i !== index);
    updateSection("projects", updated);
  };

  const handlePolishClick = async (index) => {
    const project = resumeData.projects[index];
    if (!project.description?.trim()) return;

    setLoadingIndex(index);
    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "project", input: project.description }),
      });
      if (!res.ok) throw new Error("Network response was not ok");
      const { output } = await res.json();
      handleChange(index, "description", output);
    } catch (err) {
      console.error("Polish error", err);
      // Optionally show a toast notification here
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Projects</h2>

      {resumeData.projects.map((project, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg bg-indigo-50 space-y-2 relative"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />

          <div className="relative">
            <textarea
              rows={3}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border border-gray-300 rounded p-2 pr-10"
              disabled={loadingIndex === index}
            />
            <button
              type="button"
              onClick={() => handlePolishClick(index)}
              disabled={loadingIndex === index}
              className={`absolute right-2 top-2 text-2xl leading-none focus:outline-none transition ${
                loadingIndex === index
                  ? "text-gray-400"
                  : "text-yellow-500 hover:text-yellow-600"
              }`}
              title="Polish description with AI"
            >
              {loadingIndex === index ? "…" : "💡"}
            </button>
          </div>

          <input
            type="url"
            placeholder="GitHub or Live Link"
            value={project.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />

          <button
            onClick={() => removeProject(index)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addProject}
        className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        Add Project
      </button>
    </div>
  );
}
