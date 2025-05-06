import { useRef } from "react";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { useResumeData } from "../../hooks/useResumeData";

export default function ReviewStep() {
  const { resumeData } = useResumeData();
  const pdfRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="mb-4 text-right">
        <button
          onClick={downloadPDF}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          📄 Download Resume (PDF)
        </button>
      </div>

      <div
        ref={pdfRef}
        className="bg-white p-6 shadow-lg text-[13px] leading-tight space-y-4 font-sans"
      >
        <section>
          <h1 className="text-2xl font-bold">{resumeData.contact.name}</h1>
          <p>
            {resumeData.contact.email} | {resumeData.contact.phone}
          </p>
          <p>{resumeData.contact.linkedin}</p>
        </section>

        {resumeData.summary && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">
              Summary
            </h2>
            <p>{resumeData.summary}</p>
          </section>
        )}

        {resumeData.education.length > 0 && (
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

        {resumeData.experience.length > 0 && (
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

        {resumeData.skills.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold border-b pb-1 mb-1">Skills</h2>
            <p>{resumeData.skills.join(", ")}</p>
          </section>
        )}

        {resumeData.projects.length > 0 && (
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

        {resumeData.certificates.length > 0 && (
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
      </div>
    </div>
  );
}
