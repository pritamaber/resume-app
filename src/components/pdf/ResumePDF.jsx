import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.3, // Tightened line height
    color: "#000",
  },
  section: {
    marginBottom: 4, // Minimal bottom margin
  },
  heading: {
    fontSize: 14,
    marginBottom: 2, // Reduced heading margin
    fontWeight: "bold",
    borderBottom: "1 solid #000",
    paddingBottom: 1,
  },
  subheading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 1, // Tight subheading spacing
  },
  italic: { fontStyle: "italic" },
  bullet: {
    marginLeft: 8,
    marginBottom: 1, // Minimal bullet spacing
  },
  tightSection: {
    marginBottom: 0, // For sections where we want no extra space
  },
  contactSection: {
    marginBottom: 6, // Slightly more space after contact info
  },
});

const safeText = (value) =>
  typeof value === "string" || typeof value === "number" ? String(value) : "";

export default function ResumePDF({ data }) {
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
        {/* Contact - Slightly more space after this section */}
        <View style={[styles.section, styles.contactSection]}>
          {safeText(contact.name) && (
            <Text style={styles.subheading}>{safeText(contact.name)}</Text>
          )}
          {[contact.email, contact.phone].filter(Boolean).length > 0 && (
            <Text>
              {[safeText(contact.email), safeText(contact.phone)]
                .filter(Boolean)
                .join(" | ")}
            </Text>
          )}
          {safeText(contact.linkedin) && (
            <Text>{safeText(contact.linkedin)}</Text>
          )}
          {safeText(contact.portfolio) && (
            <Text>{safeText(contact.portfolio)}</Text>
          )}
        </View>

        {/* Summary */}
        {sections.summary && safeText(data.summary) && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{safeText(data.summary)}</Text>
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
                  {safeText(edu.school) && (
                    <Text style={styles.subheading}>
                      {safeText(edu.school)}
                    </Text>
                  )}
                  {[edu.degree, edu.year].filter(Boolean).length > 0 && (
                    <Text>
                      {[safeText(edu.degree), safeText(edu.year)]
                        .filter(Boolean)
                        .join(" · ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Experience - Critical section for spacing */}
        {sections.experience &&
          Array.isArray(data.experience) &&
          data.experience.length > 0 && (
            <View style={styles.tightSection}>
              <Text style={[styles.heading, { marginBottom: 1 }]}>
                Experience
              </Text>
              {data.experience.map((exp, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.tightSection,
                    idx < data.experience.length - 1 ? { marginBottom: 2 } : {},
                  ]}
                >
                  {safeText(exp.company) && (
                    <Text style={styles.subheading}>
                      {safeText(exp.company)}
                    </Text>
                  )}
                  {[exp.role, exp.duration].filter(Boolean).length > 0 && (
                    <Text>
                      {[safeText(exp.role), safeText(exp.duration)]
                        .filter(Boolean)
                        .join(" · ")}
                    </Text>
                  )}
                  {safeText(exp.description) && (
                    <Text style={styles.bullet}>
                      • {safeText(exp.description)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Skills - Right after Experience with minimal gap */}
        {sections.skills &&
          Array.isArray(data.skills) &&
          data.skills.length > 0 && (
            <View style={[styles.section, { marginTop: 1 }]}>
              <Text style={styles.heading}>Skills</Text>
              <Text>{data.skills.map(safeText).join(", ")}</Text>
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
                  {safeText(proj.title) && (
                    <Text style={styles.subheading}>
                      {safeText(proj.title)}
                    </Text>
                  )}
                  {safeText(proj.description) && (
                    <Text style={styles.bullet}>
                      • {safeText(proj.description)}
                    </Text>
                  )}
                  {safeText(proj.link) && (
                    <Text style={styles.italic}>{safeText(proj.link)}</Text>
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
                  {safeText(cert.title) && (
                    <Text style={styles.subheading}>
                      {safeText(cert.title)}
                    </Text>
                  )}
                  {[cert.issuer, cert.year].filter(Boolean).length > 0 && (
                    <Text>
                      {[safeText(cert.issuer), safeText(cert.year)]
                        .filter(Boolean)
                        .join(" · ")}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        {/* Custom Sections */}
        {customSections.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.heading}>{safeText(section.title)}</Text>
            {Array.isArray(section.items) &&
              section.items.map((item, i) => (
                <Text key={i} style={styles.bullet}>
                  • {safeText(item)}
                </Text>
              ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
