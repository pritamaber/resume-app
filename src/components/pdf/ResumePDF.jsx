import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.75,
    color: "#000",
  },
  section: { marginBottom: 16 },
  heading: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    borderBottom: "1 solid #000",
    paddingBottom: 2,
    wrap: false,
  },
  subheading: { fontSize: 12, fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  bullet: { marginLeft: 10, marginBottom: 2 },
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
        {/* Contact */}
        <View style={styles.section}>
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
          {safeText(contact.github) && <Text>{safeText(contact.github)}</Text>}
          {safeText(contact.location) && (
            <Text>{safeText(contact.location)}</Text>
          )}
          {safeText(contact.twitter) && (
            <Text>{safeText(contact.twitter)}</Text>
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
            <View style={styles.section} wrap={false}>
              <Text style={styles.heading}>Education</Text>
              {data.education.map((edu, idx) => (
                <View key={idx}>
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

        {/* Experience */}
        {sections.experience &&
          Array.isArray(data.experience) &&
          data.experience.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.heading}>Experience</Text>
              {data.experience.map((exp, idx) => (
                <View key={idx}>
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
                      - {safeText(exp.description)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

        <View break />

        {/* Skills */}
        {sections.skills &&
          Array.isArray(data.skills) &&
          data.skills.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.heading}>Skills</Text>
              <Text>{data.skills.map(safeText).join(", ")}</Text>
            </View>
          )}

        {/* Projects */}
        {sections.projects &&
          Array.isArray(data.projects) &&
          data.projects.length > 0 && (
            <View style={styles.section} wrap={false}>
              <Text style={styles.heading}>Projects</Text>
              {data.projects.map((proj, idx) => (
                <View key={idx}>
                  {safeText(proj.title) && (
                    <Text style={styles.subheading}>
                      {safeText(proj.title)}
                    </Text>
                  )}
                  {safeText(proj.description) && (
                    <Text>{safeText(proj.description)}</Text>
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
            <View style={styles.section} wrap={false}>
              <Text style={styles.heading}>Certificates</Text>
              {data.certificates.map((cert, idx) => (
                <View key={idx}>
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
          <View key={idx} style={styles.section} wrap={false}>
            <Text style={styles.heading}>{safeText(section.title)}</Text>
            {Array.isArray(section.items) &&
              section.items.map((item, i) => (
                <Text key={i}>• {safeText(item)}</Text>
              ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}
