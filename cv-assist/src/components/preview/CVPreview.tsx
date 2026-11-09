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

  const contactString = contactParts.join('  |  ');

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
        <header className="text-center mb-[14pt]">
          <h1 className="text-[18pt] font-bold text-[#111827] leading-tight mb-1">
            {contact.fullName || 'Your Full Name'}
          </h1>
          {targetJobTitle && (
            <p className="text-[10.5pt] font-bold text-[#4A5D23] uppercase tracking-wide mb-1">
              {targetJobTitle}
            </p>
          )}
          {contactString ? (
            <p className="text-[8.5pt] text-[#4B5563] leading-normal">
              {contactString}
            </p>
          ) : (
            <p className="text-[8.5pt] text-gray-400 italic">
              email@example.com | +1 (555) 000-0000 | City, State | linkedin.com/in/username
            </p>
          )}
        </header>

        {/* Professional Summary */}
        {summary && summary.trim().length > 0 && (
          <section className="mt-[10pt] mb-[4pt]">
            <h2 className="text-[11pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b border-[#E5E7EB] pb-[2pt] mb-[6pt]">
              Professional Summary
            </h2>
            <p className="text-[9.5pt] leading-[1.4] text-[#111827] text-justify">
              {summary}
            </p>
          </section>
        )}

        {/* Skills & Competencies */}
        {skills && skills.length > 0 && (
          <section className="mt-[10pt] mb-[4pt]">
            <h2 className="text-[11pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b border-[#E5E7EB] pb-[2pt] mb-[6pt]">
              Skills & Competencies
            </h2>
            <p className="text-[9.5pt] leading-[1.4] text-[#111827]">
              {skills.join('  •  ')}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section className="mt-[10pt] mb-[4pt]">
            <h2 className="text-[11pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b border-[#E5E7EB] pb-[2pt] mb-[6pt]">
              Work Experience
            </h2>
            <div className="space-y-[8pt]">
              {experience.map((job) => (
                <div key={job.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-[1pt]">
                    <div className="flex items-baseline flex-wrap gap-1">
                      <span className="text-[10pt] font-bold text-[#111827]">
                        {job.jobTitle || 'Job Title'}
                      </span>
                      {job.company && (
                        <span className="text-[9.5pt] text-[#4B5563]">
                          , {job.company}
                        </span>
                      )}
                    </div>
                    {(job.startDate || job.endDate || job.isCurrent) && (
                      <span className="text-[8.5pt] text-[#4B5563] font-normal whitespace-nowrap ml-2">
                        {job.startDate}
                        {job.startDate && (job.endDate || job.isCurrent) ? ' – ' : ''}
                        {job.isCurrent ? 'Present' : job.endDate}
                      </span>
                    )}
                  </div>

                  {/* Bullet points: standard round black markers, 12pt left margin */}
                  {job.bullets && job.bullets.length > 0 && (
                    <div className="ml-[12pt] mt-[2pt] space-y-[2pt]">
                      {job.bullets
                        .filter((bullet) => bullet.trim().length > 0)
                        .map((bullet, idx) => (
                          <div key={idx} className="flex items-start">
                            <span className="w-[10pt] text-[9.5pt] text-[#111827] leading-[1.4] flex-shrink-0">
                              •
                            </span>
                            <span className="text-[9.5pt] leading-[1.4] text-[#111827]">
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
          <section className="mt-[10pt] mb-[4pt]">
            <h2 className="text-[11pt] font-bold uppercase text-[#4A5D23] tracking-wider border-b border-[#E5E7EB] pb-[2pt] mb-[6pt]">
              Education
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
                        , {edu.institution}
                      </span>
                    )}
                  </div>
                  {edu.graduationYear && (
                    <span className="text-[8.5pt] text-[#4B5563] whitespace-nowrap ml-2">
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
