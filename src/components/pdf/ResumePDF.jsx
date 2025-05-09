// src/components/pdf/ResumePDF.jsx
import React from "react";
import { Document, Page, Text, View, Link } from "@react-pdf/renderer";
import { pdfLayoutStyles } from "../../styles/pdfLayoutStyles";

const isNonEmpty = (t) => typeof t === "string" && t.trim().length > 0;

const parseHTML = (html) => {
  const segs = [];
  let last = 0;
  const re = /<strong>(.*?)<\/strong>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last)
      segs.push({ text: html.slice(last, m.index), bold: false });
    segs.push({ text: m[1], bold: true });
    last = m.index + m[0].length;
  }
  if (last < html.length) segs.push({ text: html.slice(last), bold: false });
  return segs;
};

export default function ResumePDF({ data, layoutStyle = "classic" }) {
  if (!data || typeof data !== "object") {
    return (
      <Document>
        <Page size="A4" style={{ padding: 30 }}>
          <Text>Invalid resume data</Text>
        </Page>
      </Document>
    );
  }

  const layout = pdfLayoutStyles[layoutStyle] || pdfLayoutStyles.classic;
  const {
    contact = {},
    summary = "",
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certifications = [],
    customSections = [],
  } = data;

  return (
    <Document>
      <Page size="A4" style={layout.page}>
        {/* Contact */}
        <View style={[layout.section, layout.contactSection]}>
          {isNonEmpty(contact.name) && (
            <Text style={layout.subheading}>{contact.name}</Text>
          )}
          {[contact.email, contact.phone].filter(isNonEmpty).join(" | ") && (
            <Text style={layout.text}>
              {[contact.email, contact.phone].filter(isNonEmpty).join(" | ")}
            </Text>
          )}
          {isNonEmpty(contact.linkedin) && (
            <Link style={layout.link} src={contact.linkedin}>
              {contact.linkedin}
            </Link>
          )}
          {isNonEmpty(contact.portfolio) && (
            <Link style={layout.link} src={contact.portfolio}>
              {contact.portfolio}
            </Link>
          )}
        </View>

        {/* Summary */}
        {isNonEmpty(summary) && (
          <View style={layout.section}>
            <Text style={layout.heading}>Summary</Text>
            <Text style={layout.text}>{summary}</Text>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={layout.section}>
            <Text style={layout.heading}>Education</Text>
            {education.map((edu, i) => (
              <View key={i} style={layout.tightSection}>
                {isNonEmpty(edu.school) && (
                  <Text style={layout.subheading}>{edu.school}</Text>
                )}
                {[edu.degree, edu.year].filter(isNonEmpty).join(" · ") && (
                  <Text style={layout.text}>
                    {[edu.degree, edu.year].filter(isNonEmpty).join(" · ")}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={layout.section}>
            <Text style={layout.heading}>Experience</Text>
            {experience.map((exp, i) => (
              <View
                key={i}
                style={[
                  layout.tightSection,
                  i < experience.length - 1 && { marginBottom: 2 },
                ]}
              >
                {isNonEmpty(exp.company) && (
                  <Text style={layout.subheading}>{exp.company}</Text>
                )}
                {[exp.role, exp.duration].filter(isNonEmpty).join(" · ") && (
                  <Text style={layout.text}>
                    {[exp.role, exp.duration].filter(isNonEmpty).join(" · ")}
                  </Text>
                )}
                {isNonEmpty(exp.description) && (
                  <Text style={layout.bullet}>
                    •{" "}
                    {parseHTML(exp.description).map((p, idx) => (
                      <Text key={idx} style={p.bold ? layout.bold : {}}>
                        {p.text}
                      </Text>
                    ))}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <View style={layout.section}>
            <Text style={layout.heading}>Skills</Text>
            <Text style={layout.text}>
              {skills.filter(isNonEmpty).join(", ")}
            </Text>
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={layout.section}>
            <Text style={layout.heading}>Projects</Text>
            {projects.map((prj, i) => (
              <View
                key={i}
                style={[
                  layout.tightSection,
                  i < projects.length - 1 && { marginBottom: 2 },
                ]}
              >
                {isNonEmpty(prj.title) && (
                  <Text style={layout.subheading}>{prj.title}</Text>
                )}
                {isNonEmpty(prj.description) && (
                  <Text style={layout.bullet}>
                    •{" "}
                    {parseHTML(prj.description).map((p, idx) => (
                      <Text key={idx} style={p.bold ? layout.bold : {}}>
                        {p.text}
                      </Text>
                    ))}
                  </Text>
                )}
                {isNonEmpty(prj.link) && (
                  <Link style={layout.link} src={prj.link}>
                    {prj.link}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={layout.section}>
            <Text style={layout.heading}>Certifications</Text>
            {certifications.map((cert, i) => (
              <View key={i} style={layout.tightSection}>
                {isNonEmpty(cert.name) && (
                  <Text style={layout.subheading}>{cert.name}</Text>
                )}
                {[cert.issuer, cert.year].filter(isNonEmpty).join(" · ") && (
                  <Text style={layout.text}>
                    {[cert.issuer, cert.year].filter(isNonEmpty).join(" · ")}
                  </Text>
                )}
                {isNonEmpty(cert.link) && (
                  <Link style={layout.link} src={cert.link}>
                    {cert.link}
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Custom Sections */}
        {customSections.length > 0 && (
          <View style={layout.section}>
            {customSections.map((sec, i) => (
              <View key={i} style={layout.tightSection}>
                {isNonEmpty(sec.title) && (
                  <Text style={layout.heading}>{sec.title}</Text>
                )}
                {sec.items.filter(isNonEmpty).map((item, j) => (
                  <Text key={j} style={layout.bullet}>
                    • {item}
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
