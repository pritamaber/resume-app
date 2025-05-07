// src/pages/ResumeBuilder.jsx
import React, { useState } from "react";

import StepIndicator from "../components/common/StepIndicator";
import ContactStep from "../components/steps/ContactStep";
import SummaryStep from "../components/steps/SummaryStep";
import EducationStep from "../components/steps/EducationStep";
import ExperienceStep from "../components/steps/ExperienceStep";
import SkillsStep from "../components/steps/SkillsStep";
import ProjectsStep from "../components/steps/ProjectsStep";
import CertificatesStep from "../components/steps/CertificatesStep";
import CustomSectionsStep from "../components/steps/CustomSectionsStep";
import ReviewStep from "../components/steps/ReviewStep";

import { useDummyResumeData } from "../hooks/useDummyResumeData";

export default function ResumeBuilder() {
  useDummyResumeData();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { component: <ContactStep />, title: "Contact" },
    { component: <SummaryStep />, title: "Summary" },
    { component: <EducationStep />, title: "Education" },
    { component: <ExperienceStep />, title: "Experience" },
    { component: <SkillsStep />, title: "Skills" },
    { component: <ProjectsStep />, title: "Projects" },
    { component: <CertificatesStep />, title: "Certificates" },
    { component: <CustomSectionsStep />, title: "Custom Sections" },
    { component: <ReviewStep />, title: "Review" },
  ];

  const goNext = () => setCurrentStep((i) => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setCurrentStep((i) => Math.max(i - 1, 0));

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <StepIndicator currentStep={currentStep} setStep={setCurrentStep} />
      <div className="bg-white shadow-lg rounded-xl mt-6 p-6">
        {steps[currentStep].component}
        <div className="flex justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition disabled:opacity-50"
          >
            Previous
          </button>
          {currentStep < steps.length - 1 && (
            <button
              onClick={goNext}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
