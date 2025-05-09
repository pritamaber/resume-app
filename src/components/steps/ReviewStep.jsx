// src/components/steps/ReviewStep.jsx
import React, { useState, useMemo } from "react";
import { useResumeData } from "../../hooks/useResumeData";
import { resumeLayoutStyles } from "../../styles/resumeLayoutStyles";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../pdf/ResumePDF";

export default function ReviewStep() {
  const { resumeData } = useResumeData();
  const [styleName, setStyleName] = useState("classic");

  if (!resumeData || !resumeData.contact) {
    return (
      <div className="text-center text-gray-500">Loading resume data...</div>
    );
  }

  const layout = useMemo(() => resumeLayoutStyles[styleName], [styleName]);

  const cycleStyle = (dir) => {
    const keys = Object.keys(resumeLayoutStyles);
    const idx = keys.indexOf(styleName);
    setStyleName(keys[(idx + dir + keys.length) % keys.length]);
  };

  return (
    <div className="relative max-w-6xl mx-auto my-10 px-4">
      {/* ◀ / ▶ style switch */}
      <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
        <button
          onClick={() => cycleStyle(-1)}
          className="bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
          title="Previous Style"
        >
          ◀
        </button>
      </div>
      <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
        <button
          onClick={() => cycleStyle(1)}
          className="bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded-full shadow-lg w-10 h-10 flex items-center justify-center"
          title="Next Style"
        >
          ▶
        </button>
      </div>

      {/* PDFDownloadLink */}
      <div className="mb-4 text-right">
        <PDFDownloadLink
          document={<ResumePDF data={resumeData} layoutStyle={styleName} />}
          fileName="resume.pdf"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {({ loading }) =>
            loading ? "Preparing PDF…" : "📄 Download ATS-Friendly Resume"
          }
        </PDFDownloadLink>
      </div>

      {/* Current Style Indicator */}
      <div className="text-center font-medium mb-4 capitalize text-gray-600">
        Current Style:{" "}
        <span className="font-semibold text-black">{styleName}</span>
        <br />
        <span className="text-sm text-gray-500">Use ◀ ▶ to switch layouts</span>
      </div>

      {/* On-screen preview */}
      <div
        id="resume-preview"
        className="bg-white p-6 shadow-lg font-sans text-[13px] leading-tight space-y-6"
      >
        {/* contact */}
        <section>
          {layout.nameWrapper ? (
            <div className={layout.nameWrapper}>
              <h1 className={layout.name}>{resumeData.contact.name}</h1>
              <div className={layout.contact}>
                {resumeData.contact.email && (
                  <span>{resumeData.contact.email}</span>
                )}
                {resumeData.contact.phone && (
                  <span>{resumeData.contact.phone}</span>
                )}
              </div>
            </div>
          ) : (
            <div>
              <h1 className={layout.name}>{resumeData.contact.name}</h1>
              <div className={layout.contact}>
                {resumeData.contact.email && <p>{resumeData.contact.email}</p>}
                {resumeData.contact.phone && <p>{resumeData.contact.phone}</p>}
                {resumeData.contact.linkedin && (
                  <p>{resumeData.contact.linkedin}</p>
                )}
                {resumeData.contact.portfolio && (
                  <p>{resumeData.contact.portfolio}</p>
                )}
                {resumeData.contact.github && (
                  <p>{resumeData.contact.github}</p>
                )}
                {resumeData.contact.location && (
                  <p>{resumeData.contact.location}</p>
                )}
                {resumeData.contact.twitter && (
                  <p>{resumeData.contact.twitter}</p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* summary */}
        {resumeData.summary && (
          <section>
            <h2 className={layout.sectionTitle}>Summary</h2>
            <p className={layout.sectionContent}>{resumeData.summary}</p>
          </section>
        )}

        {/* education */}
        {resumeData.education?.length > 0 && (
          <section>
            <h2 className={layout.sectionTitle}>Education</h2>
            <div className={layout.sectionContent}>
              {resumeData.education.map((edu, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">
                    {edu.school} — {edu.degree}
                  </p>
                  <p className="text-sm text-gray-600">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* experience */}
        {resumeData.experience?.length > 0 && (
          <section>
            <h2 className={layout.sectionTitle}>Experience</h2>
            <div className={layout.sectionContent}>
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">
                    {exp.company} — {exp.role}
                  </p>
                  <p className="text-sm text-gray-600">{exp.duration}</p>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* skills */}
        {resumeData.skills?.length > 0 && (
          <section>
            <h2 className={layout.sectionTitle}>Skills</h2>
            <p className={layout.sectionContent}>
              {resumeData.skills.join(", ")}
            </p>
          </section>
        )}

        {/* projects */}
        {resumeData.projects?.length > 0 && (
          <section>
            <h2 className={layout.sectionTitle}>Projects</h2>
            <div className={layout.sectionContent}>
              {resumeData.projects.map((prj, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">{prj.title}</p>
                  <p>{prj.description}</p>
                  {prj.link && (
                    <p className="text-sm text-blue-600">{prj.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* certifications */}
        {resumeData.certifications?.some((c) => c.name || c.issuer) && (
          <section>
            <h2 className={layout.sectionTitle}>Certifications</h2>
            <div className={layout.sectionContent}>
              {resumeData.certifications.map((cert, i) => (
                <div key={i} className="mb-2">
                  <p className="font-medium">{cert.name}</p>
                  <p className="text-sm text-gray-600">
                    {cert.issuer} — {cert.year}
                  </p>
                  {cert.link && (
                    <p className="text-sm text-blue-600">{cert.link}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* custom sections */}
        {resumeData.customSections?.length > 0 && (
          <section>
            {resumeData.customSections.map((sec, i) => (
              <div key={i} className="mb-2">
                <h2 className={layout.sectionTitle}>{sec.title}</h2>
                <div className={layout.sectionContent}>
                  {sec.items.map((item, j) => (
                    <p key={j} className="text-sm">
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
