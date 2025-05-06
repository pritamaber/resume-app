import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.75,
    color: "#000",
  },
  section: {
    marginBottom: 16,
  },
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
  small: { fontSize: 10, color: "gray" },
  hr: { borderBottom: "1 solid #ccc", marginVertical: 6 },
  bullet: { marginLeft: 10, marginBottom: 2 },
});

export default function ResumePDF({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.subheading}>{data.contact.name}</Text>
          <Text>
            {data.contact.email} | {data.contact.phone}
          </Text>
          <Text>{data.contact.linkedin}</Text>
          {data.contact.portfolio && <Text>{data.contact.portfolio}</Text>}
          {data.contact.github && <Text>{data.contact.github}</Text>}
          {data.contact.location && <Text>{data.contact.location}</Text>}
          {data.contact.twitter && <Text>{data.contact.twitter}</Text>}
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.heading}>Summary</Text>
            <Text>{data.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Education</Text>
            {data.education.map((edu, idx) => (
              <View key={idx}>
                <Text style={styles.subheading}>{edu.school}</Text>
                <Text>
                  <Text style={styles.italic}>{edu.degree}</Text> ·{" "}
                  <Text style={styles.italic}>{edu.year}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Experience</Text>
            {data.experience.map((exp, idx) => (
              <View key={idx}>
                <Text style={styles.subheading}>{exp.company}</Text>
                <Text>
                  <Text style={styles.italic}>{exp.role}</Text> ·{" "}
                  <Text style={styles.italic}>{exp.duration}</Text>
                </Text>
                <Text style={styles.bullet}>- {exp.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Insert break only if needed */}
        <View break />

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Skills</Text>
            <Text>{data.skills.join(", ")}</Text>
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Projects</Text>
            {data.projects.map((proj, idx) => (
              <View key={idx}>
                <Text style={styles.subheading}>{proj.title}</Text>
                <Text>{proj.description}</Text>
                {proj.link && <Text style={styles.italic}>{proj.link}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.heading}>Certificates</Text>
            {data.certificates.map((cert, idx) => (
              <View key={idx}>
                <Text style={styles.subheading}>{cert.title}</Text>
                <Text>
                  {cert.issuer} · <Text style={styles.italic}>{cert.year}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
