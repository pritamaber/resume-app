import { useResumeData } from "../../hooks/useResumeData";

export default function CertificatesStep() {
  const { resumeData, updateSection } = useResumeData();

  const handleChange = (index, field, value) => {
    const updated = [...resumeData.certificates];
    updated[index][field] = value;
    updateSection("certificates", updated);
  };

  const addCertificate = () => {
    updateSection("certificates", [
      ...resumeData.certificates,
      { title: "", issuer: "", year: "" },
    ]);
  };

  const removeCertificate = (index) => {
    const updated = resumeData.certificates.filter((_, i) => i !== index);
    updateSection("certificates", updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Certificates
      </h2>

      {resumeData.certificates.map((cert, index) => (
        <div
          key={index}
          className="mb-4 p-4 border rounded-lg bg-indigo-50 space-y-2 relative"
        >
          <input
            type="text"
            placeholder="Certificate Title"
            value={cert.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Issuer / Organization"
            value={cert.issuer}
            onChange={(e) => handleChange(index, "issuer", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Year (e.g. 2023)"
            value={cert.year}
            onChange={(e) => handleChange(index, "year", e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
          <button
            onClick={() => removeCertificate(index)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={addCertificate}
        className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition"
      >
        Add Certificate
      </button>
    </div>
  );
}
