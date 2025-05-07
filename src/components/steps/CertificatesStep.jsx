// src/components/steps/CertificatesStep.jsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useResumeData } from "../../hooks/useResumeData";

export default function CertificatesStep() {
  const { resumeData, updateSection } = useResumeData();
  const certs = resumeData.certifications || [];

  const handleChange = (idx, field, value) => {
    const updated = [...certs];
    updated[idx] = { ...updated[idx], [field]: value };
    updateSection("certifications", updated);
  };

  const addCert = () => {
    updateSection("certifications", [
      ...certs,
      { name: "", issuer: "", year: "", link: "" },
    ]);
  };

  const removeCert = (idx) => {
    updateSection(
      "certifications",
      certs.filter((_, i) => i !== idx)
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <h2 className="text-xl font-semibold text-indigo-600">Certifications</h2>

      {certs.map((cert, idx) => (
        <div
          key={idx}
          className="relative border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3"
        >
          <input
            type="text"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => handleChange(idx, "name", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={cert.issuer}
            onChange={(e) => handleChange(idx, "issuer", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Year"
            value={cert.year}
            onChange={(e) => handleChange(idx, "year", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="url"
            placeholder="Certificate Link (optional)"
            value={cert.link}
            onChange={(e) => handleChange(idx, "link", e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <button
            onClick={() => removeCert(idx)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition"
            title="Remove certification"
          >
            <Trash2 />
          </button>
        </div>
      ))}

      <button
        onClick={addCert}
        className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        <Plus size={16} />
        <span>Add Certification</span>
      </button>
    </div>
  );
}
