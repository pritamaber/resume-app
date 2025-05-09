// src/utils/downloadPDF.js
import html2pdf from "html2pdf.js";

/**
 * Generates and downloads a PDF of the resume directly from the DOM,
 * without opening any new windows or iframes.
 * @param {string} elementId - The ID of the element to convert.
 */
export const downloadResumeAsPDF = (elementId = "resume-preview") => {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Deep clone the resume content to avoid affecting the React DOM
  const cloned = element.cloneNode(true);

  // Prepend Tailwind CSS CDN link so styles are applied
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  cloned.prepend(link);

  // Create an off-screen container to hold the clone
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "-10000px";
  container.appendChild(cloned);
  document.body.appendChild(container);

  // Configure and run html2pdf
  html2pdf()
    .from(cloned)
    .set({
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .save()
    .then(() => {
      // Cleanup the off-screen container
      document.body.removeChild(container);
    });
};
