import { PDFDownloadLink } from "@react-pdf/renderer";
import { useResumeData } from "../../hooks/useResumeData";
import ResumePDF from "../pdf/ResumePDF";

export default function ReviewStep() {
  const { resumeData } = useResumeData();

  // ✅ Guard early to avoid crashes
  if (
    !resumeData ||
    typeof resumeData !== "object" ||
    !resumeData.contact ||
    !resumeData.sections
  ) {
    return (
      <div className="text-center text-gray-500">Loading resume data...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="mb-4 text-right">
        {resumeData.sections && (
          <PDFDownloadLink
            document={
              <ResumePDF
                data={{
                  ...resumeData,
                  sections: resumeData.sections || {},
                  customSections: resumeData.customSections || [],
                }}
              />
            }
            fileName="resume.pdf"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "📄 Download ATS-Friendly Resume"
            }
          </PDFDownloadLink>
        )}
      </div>

      <div className="bg-white p-6 shadow-lg text-[13px] leading-tight space-y-4 font-sans">
        <section>
          <h1 className="text-2xl font-bold">{resumeData.contact.name}</h1>
          <p>
            {resumeData.contact.email} | {resumeData.contact.phone}
          </p>
          {resumeData.contact.linkedin && <p>{resumeData.contact.linkedin}</p>}
          {resumeData.contact.portfolio && (
            <p>{resumeData.contact.portfolio}</p>
          )}
          {resumeData.contact.github && <p>{resumeData.contact.github}</p>}
          {resumeData.contact.location && <p>{resumeData.contact.location}</p>}
          {resumeData.contact.twitter && <p>{resumeData.contact.twitter}</p>}
        </section>

        {resumeData.sections.summary && resumeData.summary && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Summary
            </h2>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.sections.education &&
          Array.isArray(resumeData.education) &&
          resumeData.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                Education
              </h2>
              {resumeData.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-medium">
                    {edu.school} — {edu.degree}
                  </p>
                  <p className="text-sm text-gray-600">{edu.year}</p>
                </div>
              ))}
            </section>
          )}

        {resumeData.sections.experience &&
          Array.isArray(resumeData.experience) &&
          resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                Experience
              </h2>
              {resumeData.experience.map((exp, idx) => (
                <div key={idx}>
                  <p className="font-medium">
                    {exp.company} — {exp.role}
                  </p>
                  <p className="text-sm text-gray-600">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

        {resumeData.sections.skills &&
          Array.isArray(resumeData.skills) &&
          resumeData.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                Skills
              </h2>
              <p>{resumeData.skills.join(", ")}</p>
            </section>
          )}

        {resumeData.sections.projects &&
          Array.isArray(resumeData.projects) &&
          resumeData.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                Projects
              </h2>
              {resumeData.projects.map((proj, idx) => (
                <div key={idx}>
                  <p className="font-medium">{proj.title}</p>
                  <p>{proj.description}</p>
                  {proj.link && (
                    <p className="text-sm text-blue-600">{proj.link}</p>
                  )}
                </div>
              ))}
            </section>
          )}

        {resumeData.sections.certificates &&
          Array.isArray(resumeData.certificates) &&
          resumeData.certificates.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                Certificates
              </h2>
              {resumeData.certificates.map((cert, idx) => (
                <div key={idx}>
                  <p className="font-medium">{cert.title}</p>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} — {cert.year}
                  </p>
                </div>
              ))}
            </section>
          )}

        {Array.isArray(resumeData.customSections) &&
          resumeData.customSections.map((section, idx) => (
            <section key={idx}>
              <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                {section.title}
              </h2>
              <ul className="list-disc pl-5 space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
      </div>
    </div>
  );
}
