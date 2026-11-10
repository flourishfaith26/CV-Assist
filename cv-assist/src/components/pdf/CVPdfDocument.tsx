import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { CVData } from '../../types/cv';

const styles = StyleSheet.create({
  page: {
    padding: 36, // 36pt margins as required by ATS spec
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#111827',
  },
  headerContainer: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    textAlign: 'center',
  },
  name: {
    fontSize: 19,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginBottom: 2,
    textTransform: 'none',
  },
  targetTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#4A5D23',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  contactLine: {
    fontSize: 8.5,
    color: '#4B5563',
    lineHeight: 1.3,
  },
  section: {
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#4A5D23',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1.5,
    borderBottomColor: '#D1D5DB',
    paddingBottom: 2,
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#1F2937',
    textAlign: 'justify',
  },
  experienceBlock: {
    marginBottom: 8,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  jobCompany: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#4A5D23',
  },
  jobDate: {
    fontSize: 8.5,
    fontFamily: 'Helvetica',
    color: '#4B5563',
  },
  bulletRow: {
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 2,
    marginBottom: 1,
  },
  bulletMarker: {
    width: 10,
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#4A5D23',
  },
  bulletContent: {
    flex: 1,
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#1F2937',
  },
  educationBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  educationDegree: {
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
  },
  educationInstitution: {
    fontSize: 9.5,
    color: '#4B5563',
  },
  educationYear: {
    fontSize: 8.5,
    color: '#4B5563',
  },
  skillsText: {
    fontSize: 9,
    lineHeight: 1.45,
    color: '#1F2937',
  },
});

interface CVPdfDocumentProps {
  data: CVData;
}

export const CVPdfDocument: React.FC<CVPdfDocumentProps> = ({ data }) => {
  const { contact, targetJobTitle, summary, experience, education, skills } = data;

  const contactParts: string[] = [];
  if (contact.email) contactParts.push(contact.email);
  if (contact.phone) contactParts.push(contact.phone);
  if (contact.location) contactParts.push(contact.location);
  if (contact.linkedin) contactParts.push(contact.linkedin);
  if (contact.portfolio) contactParts.push(contact.portfolio);

  const contactString = contactParts.join('  •  ');

  return (
    <Document title={`${contact.fullName || 'Resume'} - CV Assist`} author={contact.fullName}>
      <Page size="A4" style={styles.page}>
        {/* Name Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{contact.fullName || 'Your Name'}</Text>
          {targetJobTitle && (
            <Text style={styles.targetTitle}>{targetJobTitle}</Text>
          )}
          {contactString.length > 0 && (
            <Text style={styles.contactLine}>{contactString}</Text>
          )}
        </View>

        {/* Professional Summary */}
        {summary && summary.trim().length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Core Skills */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Technical Expertise</Text>
            <Text style={styles.skillsText}>
              {skills.join('   •   ')}
            </Text>
          </View>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experience.map((job) => (
              <View key={job.id} style={styles.experienceBlock} wrap={false}>
                <View style={styles.jobHeader}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline', flex: 1, flexWrap: 'wrap' }}>
                    <Text style={styles.jobTitle}>{job.jobTitle || 'Job Title'}</Text>
                    {job.company && (
                      <Text style={styles.jobCompany}> – {job.company}</Text>
                    )}
                  </View>
                  {(job.startDate || job.endDate || job.isCurrent) && (
                    <Text style={styles.jobDate}>
                      {job.startDate}
                      {job.startDate && (job.endDate || job.isCurrent) ? ' – ' : ''}
                      {job.isCurrent ? 'Present' : job.endDate}
                    </Text>
                  )}
                </View>

                {/* Bullets */}
                {job.bullets &&
                  job.bullets
                    .filter((bullet) => bullet.trim().length > 0)
                    .map((bullet, bIndex) => (
                      <View key={bIndex} style={styles.bulletRow}>
                        <Text style={styles.bulletMarker}>•</Text>
                        <Text style={styles.bulletContent}>{bullet}</Text>
                      </View>
                    ))}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Credentials</Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationBlock} wrap={false}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text style={styles.educationDegree}>{edu.degree || 'Degree'}</Text>
                  {edu.institution && (
                    <Text style={styles.educationInstitution}> – {edu.institution}</Text>
                  )}
                </View>
                {edu.graduationYear && (
                  <Text style={styles.educationYear}>{edu.graduationYear}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
