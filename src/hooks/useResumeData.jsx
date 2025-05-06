import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    contact: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      portfolio: "",
      github: "",
      location: "",
      twitter: "",
    },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certificates: [],
    customSections: [],
    sections: {
      summary: true,
      education: true,
      experience: true,
      skills: true,
      projects: true,
      certificates: true,
    },
  });

  const updateSection = (section, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // ✅ Add custom section
  const addCustomSection = (section) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, section],
    }));
  };

  // ✅ Update a custom section by index
  const updateCustomSection = (index, updatedSection) => {
    setResumeData((prev) => {
      const updated = [...prev.customSections];
      updated[index] = updatedSection;
      return { ...prev, customSections: updated };
    });
  };

  // ✅ Delete a custom section
  const deleteCustomSection = (index) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        updateSection,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeData = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeData must be used within ResumeProvider");
  }
  return context;
};
