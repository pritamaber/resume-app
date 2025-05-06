import { useResumeData } from "../../hooks/useResumeData";

export default function ContactStep() {
  const { resumeData, updateSection } = useResumeData();

  const handleChange = (e) => {
    updateSection("contact", {
      ...resumeData.contact,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          value={resumeData.contact.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
        />
        <input
          name="email"
          value={resumeData.contact.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          name="phone"
          value={resumeData.contact.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border p-2 rounded"
        />
        <input
          name="linkedin"
          value={resumeData.contact.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}
