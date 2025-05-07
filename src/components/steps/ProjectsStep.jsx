// src/components/steps/ProjectsStep.jsx
import React, { useState } from "react";
import { useResumeData } from "../../hooks/useResumeData";
import { Plus, Trash2, Lightbulb } from "lucide-react";

export default function ProjectsStep() {
  const { resumeData, updateSection } = useResumeData();
  const [loadingIdx, setLoadingIdx] = useState(null);

  const handleChange = (idx, field, value) => {
    const projects = [...resumeData.projects];
    projects[idx] = { ...projects[idx], [field]: value };
    updateSection("projects", projects);
  };

  const addProject = () => {
    updateSection("projects", [
      ...resumeData.projects,
      { title: "", description: "", link: "" },
    ]);
  };

  const removeProject = (idx) => {
    updateSection(
      "projects",
      resumeData.projects.filter((_, i) => i !== idx)
    );
  };

  const enhance = async (idx) => {
    setLoadingIdx(idx);
    try {
      const res = await fetch("/api/ai-enhancer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "project",
          input: resumeData.projects[idx].description,
        }),
      });
      const data = await res.json();
      if (data.output) handleChange(idx, "description", data.output);
    } catch {
      // handle error
    } finally {
      setLoadingIdx(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">Projects</h2>
      {resumeData.projects.map((project, idx) => (
        <div
          key={idx}
          className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleChange(idx, "title", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <textarea
            rows={3}
            placeholder="Description"
            value={project.description}
            onChange={(e) => handleChange(idx, "description", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="url"
            placeholder="Project Link (optional)"
            value={project.link}
            onChange={(e) => handleChange(idx, "link", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={() => enhance(idx)}
            disabled={loadingIdx === idx}
            className="absolute top-2 right-2 text-gray-400 hover:text-indigo-600 transition"
            title="Enhance description with AI"
          >
            {loadingIdx === idx ? "…" : <Lightbulb />}
          </button>

          <button
            onClick={() => removeProject(idx)}
            className="absolute top-2 right-10 text-red-500 hover:text-red-600 transition"
            title="Remove project"
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        onClick={addProject}
        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        <Plus size={16} />
        <span>Add Project</span>
      </button>
    </div>
  );
}
