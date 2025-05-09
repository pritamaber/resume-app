// src/styles/resumeLayoutStyles.js

export const resumeLayoutStyles = {
  classic: {
    name: "text-left text-2xl font-bold",
    contact: "space-y-1 text-sm",
    sectionTitle: "text-left text-lg font-semibold border-b pb-1 mb-2",
    sectionContent: "text-left text-[13px] leading-tight space-y-2",
  },
  modernCentered: {
    name: "text-center text-3xl font-bold",
    contact: "flex justify-center gap-4 text-sm",
    sectionTitle: "text-center text-lg font-semibold border-b pb-1 mb-2",
    sectionContent: "text-center text-[13px] leading-tight space-y-2",
  },
  leftNameRightContact: {
    nameWrapper: "flex justify-between items-center",
    name: "text-left text-2xl font-bold",
    contact: "text-right space-x-3 text-sm",
    sectionTitle: "text-left text-lg font-semibold border-b pb-1 mb-2",
    sectionContent: "text-left text-[13px] leading-tight space-y-2",
  },
  indigoAccent: {
    name: "text-left text-3xl font-bold text-indigo-800",
    contact: "space-y-1 text-sm text-indigo-600",
    sectionTitle: "text-indigo-700 text-lg font-bold border-b pb-1 mb-2",
    sectionContent: "text-left",
  },
  minimalist: {
    name: "text-center text-xl font-semibold",
    contact: "text-center text-xs italic",
    sectionTitle: "text-left text-md font-semibold",
    sectionContent: "text-left text-sm",
  },
  boldSections: {
    name: "text-left text-2xl font-black",
    contact: "text-sm text-gray-800",
    sectionTitle:
      "text-left text-lg font-extrabold uppercase border-b pb-1 mb-2",
    sectionContent: "text-left",
  },
  timeline: {
    name: "text-left text-3xl font-bold",
    contact: "text-left text-sm italic",
    sectionTitle:
      "text-left text-md font-medium border-l-4 border-blue-500 pl-2",
    sectionContent: "text-left pl-4",
  },
  sleekGrid: {
    name: "text-left text-3xl font-bold",
    contact: "grid grid-cols-2 gap-x-4 text-sm",
    sectionTitle: "text-left text-lg font-semibold border-b pb-1 mb-2",
    sectionContent: "text-left",
  },
  headerHighlight: {
    name: "text-left text-3xl font-bold bg-indigo-50 p-2",
    contact: "flex justify-between text-xs text-gray-600",
    sectionTitle: "text-left text-lg font-semibold bg-gray-100 p-1",
    sectionContent: "text-left",
  },
  atsBoosted: {
    name: "text-left text-2xl font-bold",
    contact: "text-left text-sm",
    sectionTitle:
      "text-left text-lg font-semibold border-b pb-1 mb-2 text-black",
    sectionContent: "text-left text-sm",
  },
};
