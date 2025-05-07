// src/components/steps/ReviewStep.jsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useResumeData } from "../../hooks/useResumeData";
import ResumePDF from "../pdf/ResumePDF";

export default function ReviewStep() {
  const { resumeData } = useResumeData();

  // Guard against missing data
  if (!resumeData || typeof resumeData !== "object" || !resumeData.contact) {
    return (
      <div className="text-center text-gray-500">Loading resume data...</div>
    );
  }

  const {
    contact,
    summary,
    education,
    experience,
    skills,
    projects,
    certifications = [],
    customSections = [],
  } = resumeData;

  // Only show certifications if at least one field is non-empty
  const showCertifications =
    Array.isArray(certifications) &&
    certifications.some((c) => c.name || c.issuer || c.year || c.link);

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="mb-4 text-right">
        <PDFDownloadLink
          document={
            <ResumePDF
              data={{
                ...resumeData,
                customSections,
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
      </div>

      <div className="bg-white p-6 shadow-lg text-[13px] leading-tight space-y-4 font-sans">
        {/* Contact */}
        <section>
          <h1 className="text-2xl font-bold">{contact.name}</h1>
          <p>
            {contact.email} | {contact.phone}
          </p>
          {contact.linkedin && <p>{contact.linkedin}</p>}
          {contact.portfolio && <p>{contact.portfolio}</p>}
          {contact.github && <p>{contact.github}</p>}
          {contact.location && <p>{contact.location}</p>}
          {contact.twitter && <p>{contact.twitter}</p>}
        </section>

        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Summary
            </h2>
            <p>{summary}</p>
          </section>
        )}

        {/* Education */}
        {Array.isArray(education) && education.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Education
            </h2>
            {education.map((edu, idx) => (
              <div key={idx}>
                <p className="font-medium">
                  {edu.school} — {edu.degree}
                </p>
                <p className="text-sm text-gray-600">{edu.year}</p>
              </div>
            ))}
          </section>
        )}

        {/* Experience */}
        {Array.isArray(experience) && experience.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Experience
            </h2>
            {experience.map((exp, idx) => (
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

        {/* Skills */}
        {Array.isArray(skills) && skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">Skills</h2>
            <p>{skills.join(", ")}</p>
          </section>
        )}

        {/* Projects */}
        {Array.isArray(projects) && projects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Projects
            </h2>
            {projects.map((proj, idx) => (
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

        {/* Certifications */}
        {showCertifications && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Certifications
            </h2>
            {certifications.map((cert, idx) => (
              <div key={idx}>
                <p className="font-medium">{cert.name}</p>
                <p className="text-sm text-gray-600">
                  {cert.issuer} — {cert.year}
                </p>
                {cert.link && (
                  <p className="text-sm text-blue-600">{cert.link}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Custom Sections */}
        {Array.isArray(customSections) && customSections.length > 0 && (
          <section className="mt-4">
            {customSections.map((section, sIdx) => (
              <div key={sIdx} className="mb-2">
                <h2 className="text-lg font-semibold border-b pb-1 mb-1">
                  {section.title}
                </h2>
                {section.items.map((item, i) => (
                  <p key={i} className="text-sm">
                    • {item}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
