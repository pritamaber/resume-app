// src/components/pdf/ResumePDF.jsx
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
  section: { marginBottom: 8 },
  heading: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    borderBottom: "1 solid #000",
    paddingBottom: 2,
  },
  subheading: { fontSize: 12, fontWeight: "bold", marginBottom: 2 },
  italic: { fontStyle: "italic" },
  bullet: { marginLeft: 8, marginBottom: 2 },
  bold: { fontWeight: "bold" },
  tightSection: { marginBottom: 0 },
  contactSection: { marginBottom: 12 },
  link: { color: "#0000EE", textDecoration: "underline" },
});

const isNonEmptyText = (val) =>
  typeof val === "string" && val.trim().length > 0;

const parseHTMLString = (html) => {
  const segments = [];
  let lastIndex = 0;
  const regex = /<strong[^>]*>(.*?)<\/strong>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: html.slice(lastIndex, match.index), bold: false });
    }
    segments.push({ text: match[1], bold: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < html.length) {
    segments.push({ text: html.slice(lastIndex), bold: false });
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

  const contact = data.contact || {};
  const summary = data.summary || "";
  const education = Array.isArray(data.education) ? data.education : [];
  const experience = Array.isArray(data.experience) ? data.experience : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const certifications = Array.isArray(data.certifications)
    ? data.certifications
    : [];
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
                .join(" | ")}
            </Text>
          )}
          {isNonEmptyText(contact.linkedin) && (
            <Link src={contact.linkedin.trim()} style={styles.link}>
              {contact.linkedin.trim()}
            </Link>
          )}
          {isNonEmptyText(contact.portfolio) && (
            <Link src={contact.portfolio.trim()} style={styles.link}>
              {contact.portfolio.trim()}
            </Link>
          )}
        </View>

        {/* Summary */}
        {isNonEmptyText(summary) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{summary.trim()}</Text>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.tightSection}>
                {isNonEmptyText(edu.school) && (
                  <Text style={styles.subheading}>{edu.school.trim()}</Text>
                )}
                {[edu.degree, edu.year].filter(isNonEmptyText).join(" · ") && (
                  <Text>
                    {[edu.degree, edu.year]
                      .filter(isNonEmptyText)
                      .map((v) => v.trim())
                      .join(" · ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Experience</Text>
            {experience.map((exp, i) => (
              <View
                key={i}
                style={[
                  styles.tightSection,
                  i < experience.length - 1 ? { marginBottom: 2 } : {},
                ]}
              >
                {isNonEmptyText(exp.company) && (
                  <Text style={styles.subheading}>{exp.company.trim()}</Text>
                )}
                {[exp.role, exp.duration]
                  .filter(isNonEmptyText)
                  .join(" · ") && (
                  <Text>
                    {[exp.role, exp.duration]
                      .filter(isNonEmptyText)
                      .map((v) => v.trim())
                      .join(" · ")}
                  </Text>
                )}
                {isNonEmptyText(exp.description) && (
                  <Text style={styles.bullet}>
                    •
                    {parseHTMLString(exp.description.trim()).map(
                      (part, idx) => (
                        <Text key={idx} style={part.bold ? styles.bold : {}}>
                          {part.text}
                        </Text>
                      )
                    )}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <Text>{skills.filter(isNonEmptyText).join(", ")}</Text>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {projects.map((proj, i) => (
              <View
                key={i}
                style={[
                  styles.tightSection,
                  i < projects.length - 1 ? { marginBottom: 2 } : {},
                ]}
              >
                {isNonEmptyText(proj.title) && (
                  <Text style={styles.subheading}>{proj.title.trim()}</Text>
                )}
                {isNonEmptyText(proj.description) && (
                  <Text style={styles.bullet}>
                    •
                    {parseHTMLString(proj.description.trim()).map(
                      (part, idx) => (
                        <Text key={idx} style={part.bold ? styles.bold : {}}>
                          {part.text}
                        </Text>
                      )
                    )}
                  </Text>
                )}
                {isNonEmptyText(proj.link) && (
                  <Link src={proj.link.trim()} style={styles.link}>
                    {proj.link.trim()}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={styles.tightSection}>
                {isNonEmptyText(cert.name) && (
                  <Text style={styles.subheading}>{cert.name.trim()}</Text>
                )}
                {[cert.issuer, cert.year]
                  .filter(isNonEmptyText)
                  .join(" · ") && (
                  <Text>
                    {[cert.issuer, cert.year]
                      .filter(isNonEmptyText)
                      .map((v) => v.trim())
                      .join(" · ")}
                  </Text>
                )}
                {isNonEmptyText(cert.link) && (
                  <Link src={cert.link.trim()} style={styles.link}>
                    {cert.link.trim()}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && (
          <View style={styles.section}>
            {customSections.map((section, idx) => (
              <View key={idx} style={styles.tightSection}>
                {isNonEmptyText(section.title) && (
                  <Text style={styles.heading}>{section.title.trim()}</Text>
                )}
                {Array.isArray(section.items) &&
                  section.items.filter(isNonEmptyText).map((item, j) => (
                    <Text key={j} style={styles.bullet}>
                      • {item.trim()}
                    </Text>
                  ))}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
