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

export default function ResumePDF({ data }) {
  const sections = data.sections || {};
  const contact = data.contact || {};

  const renderLine = (label) => (label ? <Text>{label}</Text> : null);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact Section */}
        <View style={styles.section}>
          {renderLine(contact.name)}
          {renderLine(
            [contact.email, contact.phone].filter(Boolean).join(" | ")
          )}
          {renderLine(contact.linkedin)}
          {renderLine(contact.portfolio)}
          {renderLine(contact.github)}
          {renderLine(contact.location)}
          {renderLine(contact.twitter)}
        </View>

        {/* Summary */}
        {sections.summary && data.summary && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{data.summary}</Text>
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
                  {renderLine(edu.school)}
                  {renderLine(
                    [edu.degree, edu.year].filter(Boolean).join(" · ")
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
                  {renderLine(exp.company)}
                  {renderLine(
                    [exp.role, exp.duration].filter(Boolean).join(" · ")
                  )}
                  {renderLine(exp.description ? `- ${exp.description}` : "")}
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
              <Text>{data.skills.join(", ")}</Text>
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
                  {renderLine(proj.title)}
                  {renderLine(proj.description)}
                  {renderLine(proj.link)}
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
                  {renderLine(cert.title)}
                  {renderLine(
                    [cert.issuer, cert.year].filter(Boolean).join(" · ")
                  )}
                </View>
              ))}
            </View>
          )}
      </Page>
    </Document>
  );
}
