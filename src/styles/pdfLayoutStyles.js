// src/styles/pdfLayoutStyles.js
import { StyleSheet } from "@react-pdf/renderer";

const base = {
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  tightSection: { marginBottom: 6 },
  heading: { fontSize: 12, fontWeight: 600, marginBottom: 4 },
  subheading: { fontSize: 11, fontWeight: 500 },
  text: { fontSize: 10, lineHeight: 1.4 },
  bullet: { fontSize: 10, marginLeft: 10, lineHeight: 1.4 },
  bold: { fontWeight: 700 },
  link: { color: "#1a73e8", fontSize: 10, textDecoration: "underline" },
  contactSection: { marginBottom: 12 },
};

export const pdfLayoutStyles = {
  classic: StyleSheet.create({ ...base }),

  modernCentered: StyleSheet.create({
    ...base,
    section: { ...base.section, alignItems: "center", textAlign: "center" },
    contactSection: {
      ...base.contactSection,
      alignItems: "center",
      textAlign: "center",
    },
    heading: { ...base.heading, textAlign: "center" },
  }),

  leftNameRightContact: StyleSheet.create({
    ...base,
    contactSection: {
      ...base.contactSection,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    subheading: { ...base.subheading, fontSize: 12 },
  }),

  indigoAccent: StyleSheet.create({
    ...base,
    heading: { ...base.heading, color: "#4B0082" },
    subheading: { ...base.subheading, color: "#4B0082" },
    link: { ...base.link, color: "#4B0082" },
  }),

  minimalist: StyleSheet.create({
    ...base,
    heading: { ...base.heading, fontSize: 11, fontWeight: 500 },
    text: { ...base.text, fontSize: 9 },
    bullet: { ...base.bullet, fontSize: 9 },
  }),

  boldSections: StyleSheet.create({
    ...base,
    heading: {
      ...base.heading,
      fontSize: 13,
      fontWeight: 700,
      textTransform: "uppercase",
    },
    subheading: { ...base.subheading, fontWeight: 700 },
  }),

  timeline: StyleSheet.create({
    ...base,
    section: {
      ...base.section,
      borderLeft: "2px solid #007acc",
      paddingLeft: 8,
    },
    heading: { ...base.heading, color: "#007acc" },
  }),

  sleekGrid: StyleSheet.create({
    ...base,
    contactSection: {
      ...base.contactSection,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
  }),

  headerHighlight: StyleSheet.create({
    ...base,
    contactSection: {
      ...base.contactSection,
      backgroundColor: "#f0f0ff",
      padding: 6,
    },
    heading: { ...base.heading, backgroundColor: "#f8f8f8", padding: 4 },
  }),

  atsBoosted: StyleSheet.create({
    ...base,
    heading: { ...base.heading, color: "#000", fontWeight: 600 },
    subheading: { ...base.subheading, color: "#000" },
    link: { ...base.link, color: "#0000cc" },
  }),
};
