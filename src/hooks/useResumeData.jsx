import { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    contact: {
      name: "",
      email: "",
      phone: "",
      linkedin: "",
    },
    summary: "",
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certificates: [],
  });

  const updateSection = (section, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateSection }}>
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
