export interface ContactInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  graduationYear: string;
}

export interface CVData {
  targetJobTitle: string;
  contact: ContactInfo;
  summary: string;
  skills: string[];
  experience: WorkExperience[];
  education: Education[];
}

