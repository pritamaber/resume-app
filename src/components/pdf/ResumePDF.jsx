import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.3,
    color: "#000",
  },
  section: { marginBottom: 4 },
  heading: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: "bold",
    borderBottom: "1 solid #000",
    paddingBottom: 1,
  },
  subheading: { fontSize: 12, fontWeight: "bold", marginBottom: 1 },
  italic: { fontStyle: "italic" },
  bullet: { marginLeft: 8, marginBottom: 1 },
  bold: { fontWeight: "bold" },
  tightSection: { marginBottom: 0 },
  contactSection: { marginBottom: 6 },
  link: {
    color: "#0000EE",
    textDecoration: "underline",
  },
});

const isNonEmptyText = (val) =>
  typeof val === "string" && val.trim().length > 0;

// Utility to parse <strong> tags into text segments for bold styling
const parseHTMLString = (htmlString) => {
  const segments = [];
  let lastIndex = 0;
  const tagRegex = /<strong[^>]*>(.*?)<\/strong>/g;
  let match;
  while ((match = tagRegex.exec(htmlString)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: htmlString.slice(lastIndex, match.index),
        bold: false,
      });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < htmlString.length) {
    segments.push({ text: htmlString.slice(lastIndex), bold: false });
  }
  return segments;
};

export default function ResumePDF({ data }) {
  if (!data || typeof data !== "object") {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Invalid resume data</Text>
        </Page>
      </Document>
    );
  }

  const sections = {
    summary: false,
    education: false,
    experience: false,
    skills: false,
    projects: false,
    certificates: false,
    ...data.sections,
  };

  const contact = data.contact || {};
  const customSections = Array.isArray(data.customSections)
    ? data.customSections
    : [];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact */}
        <View style={[styles.section, styles.contactSection]}>
          {isNonEmptyText(contact.name) && (
            <Text style={styles.subheading}>{contact.name.trim()}</Text>
          )}
          {(isNonEmptyText(contact.email) || isNonEmptyText(contact.phone)) && (
            <Text>
              {[contact.email, contact.phone]
                .filter(isNonEmptyText)
                .map((val) => val.trim())
                .join(" | ")}
            </Text>
          )}
          {isNonEmptyText(contact.linkedin) && (
            <Link src={contact.linkedin.trim()} style={styles.link} break>
              {contact.linkedin.trim()}
            </Link>
          )}
          {isNonEmptyText(contact.portfolio) && (
            <Link src={contact.portfolio.trim()} style={styles.link} break>
              {contact.portfolio.trim()}
            </Link>
          )}
        </View>

        {/* Summary */}
        {sections.summary && isNonEmptyText(data.summary) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{data.summary.trim()}</Text>
          </View>
        )}

        {/* Education */}
        {sections.education &&
          Array.isArray(data.education) &&
          data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Education</Text>
              {data.education.map((edu, idx) => (
                <View key={idx} style={styles.tightSection}>
                  {isNonEmptyText(edu.school) && (
                    <Text style={styles.subheading}>{edu.school.trim()}</Text>
                  )}
                  {[edu.degree, edu.year].filter(isNonEmptyText).length > 0 && (
                    <Text>
                      {[edu.degree, edu.year]
                        .filter(isNonEmptyText)
                        .map((val) => val.trim())
                        .join(" · ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Experience */}
        {sections.experience &&
          Array.isArray(data.experience) &&
          data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Experience</Text>
              {data.experience.map((exp, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tightSection,
                    idx < data.experience.length - 1 ? { marginBottom: 2 } : {},
                  ]}
                >
                  {isNonEmptyText(exp.company) && (
                    <Text style={styles.subheading}>{exp.company.trim()}</Text>
                  )}

                  {[exp.role, exp.duration].filter(isNonEmptyText).length >
                    0 && (
                    <Text>
                      {[exp.role, exp.duration]
                        .filter(isNonEmptyText)
                        .map((val) => val.trim())
                        .join(" · ")}
                    </Text>
                  )}

                  {isNonEmptyText(exp.description) && (
                    <Text style={styles.bullet}>
                      •{" "}
                      {parseHTMLString(
                        // Trim and remove any leading dash or hyphen + space
                        exp.description.trim().replace(/^[\-\–\—]\s*/, "")
                      ).map((part, i) => (
                        <Text
                          key={i}
                          style={part.bold ? styles.bold : undefined}
                        >
                          {part.text}
                        </Text>
                      ))}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        {/* Skills */}
        {sections.skills &&
          Array.isArray(data.skills) &&
          data.skills.some(isNonEmptyText) && (
            <View style={styles.section}>
              <Text style={styles.heading}>Skills</Text>
              <Text>
                {data.skills
                  .filter(isNonEmptyText)
                  .map((val) => val.trim())
                  .join(", ")}
              </Text>
            </View>
          )}

        {/* Projects */}
        {sections.projects &&
          Array.isArray(data.projects) &&
          data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Projects</Text>
              {data.projects.map((proj, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tightSection,
                    idx < data.projects.length - 1 ? { marginBottom: 2 } : {},
                  ]}
                >
                  {isNonEmptyText(proj.title) && (
                    <Text style={styles.subheading}>{proj.title.trim()}</Text>
                  )}
                  {isNonEmptyText(proj.description) && (
                    <Text style={styles.bullet}>
                      •{" "}
                      {parseHTMLString(proj.description).map((part, i) => (
                        <Text
                          key={i}
                          style={part.bold ? styles.bold : undefined}
                        >
                          {part.text}
                        </Text>
                      ))}
                    </Text>
                  )}
                  {isNonEmptyText(proj.link) && (
                    <Link src={proj.link.trim()} style={styles.link} break>
                      {proj.link.trim()}
                    </Link>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Certificates */}
        {sections.certificates &&
          Array.isArray(data.certificates) &&
          data.certificates.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.heading}>Certificates</Text>
              {data.certificates.map((cert, idx) => (
                <View key={idx} style={styles.tightSection}>
                  {isNonEmptyText(cert.title) && (
                    <Text style={styles.subheading}>{cert.title.trim()}</Text>
                  )}
                  {[cert.issuer, cert.year].filter(isNonEmptyText).length >
                    0 && (
                    <Text>
                      {[cert.issuer, cert.year]
                        .filter(isNonEmptyText)
                        .map((val) => val.trim())
                        .join(" · ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Custom Sections */}
        {Array.isArray(customSections) &&
          customSections.map((section, idx) => (
            <View key={idx} style={styles.section}>
              {isNonEmptyText(section.title) && (
                <Text style={styles.heading}>{section.title.trim()}</Text>
              )}
              {Array.isArray(section.items) &&
                section.items.filter(isNonEmptyText).map((item, i) => (
                  <Text key={i} style={styles.bullet}>
                    • {item.trim()}
                  </Text>
                ))}
            </View>
          ))}
      </Page>
    </Document>
  );
}
