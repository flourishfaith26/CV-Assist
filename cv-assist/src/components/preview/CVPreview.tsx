import React from 'react';
import type { CVData } from '../../types/cv';

interface CVPreviewProps {
  data: CVData;
  zoomScale?: number;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, zoomScale = 1 }) => {
  const { contact, targetJobTitle, summary, experience, education, skills } = data;

  const contactParts: string[] = [];
  if (contact.email) contactParts.push(contact.email);
  if (contact.phone) contactParts.push(contact.phone);
  if (contact.location) contactParts.push(contact.location);
  if (contact.linkedin) contactParts.push(contact.linkedin);
  if (contact.portfolio) contactParts.push(contact.portfolio);

  const contactString = contactParts.join('  •  ');

  return (
    <div className="w-full flex justify-center bg-gray-100 dark:bg-gray-900 p-2 sm:p-4 rounded-md overflow-x-auto transition-colors">
      {/* A4 Sheet Container: 210mm x 297mm, 36pt margins, white background, 1px solid border, shadow-sm */}
      <div
        className="w-full max-w-[210mm] min-h-[297mm] bg-white border border-gray-200 dark:border-gray-700 shadow-sm p-[36pt] text-[#111827] flex flex-col box-border font-sans transition-transform select-text origin-top"
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          transform: `scale(${zoomScale})`,
        }}
      >
        {/* Name & Contact Header */}
        <header className="text-center pb-[10pt] mb-[10pt] border-b border-gray-200">
          <h1 className="text-[20pt] font-extrabold text-[#111827] tracking-tight leading-none mb-1.5">
            {contact.fullName || 'Your Full Name'}
          </h1>
          {targetJobTitle && (
            <p className="text-[10pt] font-bold text-[#4A5D23] uppercase tracking-wider mb-2">
              {targetJobTitle}
            </p>
          )}
          {contactString ? (
            <p className="text-[8.5pt] font-medium text-[#4B5563] leading-normal flex items-center justify-center flex-wrap gap-x-2">
              {contactParts.map((part, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-[#9CA3AF]">•</span>}
                  <span>{part}</span>
                </React.Fragment>
              ))}
            </p>
          ) : (
            <p className="text-[8.5pt] text-gray-400 italic">
              email@example.com • +1 (555) 000-0000 • City, State • linkedin.com/in/username
            </p>
          )}
        </header>

        {/* Professional Summary */}
        {summary && summary.trim().length > 0 && (
          <section className="mb-[12pt]">
            <h2 className="text-[10pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b-2 border-gray-200 pb-[2pt] mb-[6pt]">
              Professional Summary
            </h2>
            <p className="text-[9.5pt] leading-[1.5] text-[#1F2937] text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Core Skills & Competencies */}
        {skills && skills.length > 0 && (
          <section className="mb-[12pt]">
            <h2 className="text-[10pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b-2 border-gray-200 pb-[2pt] mb-[6pt]">
              Skills & Technical Expertise
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center text-[8.5pt] font-medium text-[#1F2937] bg-gray-50 border border-gray-200 px-2 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="mb-[12pt]">
            <h2 className="text-[10pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b-2 border-gray-200 pb-[2pt] mb-[6pt]">
              Professional Experience
            </h2>
            <div className="space-y-[10pt]">
              {experience.map((job) => (
                <div key={job.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-[2pt]">
                    <div>
                      <span className="text-[10pt] font-bold text-[#111827]">
                        {job.jobTitle || 'Job Title'}
                      </span>
                      {job.company && (
                        <span className="text-[9.5pt] font-semibold text-[#4A5D23]">
                          {' '}– {job.company}
                        </span>
                      )}
                    </div>
                    {(job.startDate || job.endDate || job.isCurrent) && (
                      <span className="text-[8.5pt] text-[#4B5563] font-medium whitespace-nowrap ml-2">
                        {job.startDate}
                        {job.startDate && (job.endDate || job.isCurrent) ? ' – ' : ''}
                        {job.isCurrent ? 'Present' : job.endDate}
                      </span>
                    )}
                  </div>

                  {/* Bullet points: standard round markers, 12pt left margin */}
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="ml-[10pt] mt-[3pt] space-y-[2.5pt]">
                      {job.bullets
                        .filter((bullet) => bullet.trim().length > 0)
                        .map((bullet, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="w-[10pt] text-[9.5pt] text-[#4A5D23] font-bold leading-[1.45] flex-shrink-0">
                              •
                            </span>
                            <span className="text-[9.5pt] leading-[1.45] text-[#1F2937]">
                              {bullet}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-[8pt]">
            <h2 className="text-[10pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b-2 border-gray-200 pb-[2pt] mb-[6pt]">
              Education & Credentials
            </h2>
            <div className="space-y-[4pt]">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                  <div>
                    <span className="text-[9.5pt] font-bold text-[#111827]">
                      {edu.degree || 'Degree / Major'}
                    </span>
                    {edu.institution && (
                      <span className="text-[9.5pt] text-[#4B5563]">
                        {' '}– {edu.institution}
                      </span>
                    )}
                  </div>
                  {edu.graduationYear && (
                    <span className="text-[8.5pt] text-[#4B5563] font-medium whitespace-nowrap ml-2">
                      {edu.graduationYear}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
