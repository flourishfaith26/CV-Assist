import { useState, useCallback, useEffect } from 'react';
import type { CVData, ContactInfo, WorkExperience, Education } from '../types/cv';

const STORAGE_KEY = 'cv_assist_state_v1';

const getInitialData = (fallback: CVData): CVData => {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.contact) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage parse error and use fallback
  }
  return fallback;
};

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const STRESS_TEST_CV_DATA: CVData = {
  targetJobTitle: 'Staff Full-Stack & Systems Architecture Engineer',
  contact: {
    fullName: 'Dr. Elizabeth Cassandra Montgomery-Vanderbilt',
    email: 'elizabeth.c.montgomery.vanderbilt@enterprise-systems-solutions.co.uk',
    phone: '+1 (555) 987-6543 ext. 4201',
    location: 'San Francisco Bay Area, California, United States of America',
    linkedin: 'linkedin.com/in/elizabeth-cassandra-montgomery-vanderbilt-phd',
    portfolio: 'github.com/elizabeth-montgomery-vanderbilt-systems-research',
  },
  summary:
    'Distinguished Staff Engineer and Technical Architect with over 12 years of end-to-end expertise delivering globally distributed, mission-critical microservice architectures and high-throughput real-time web applications. Recognized authority in React, TypeScript, Node.js, and high-concurrency event-driven systems processing upwards of 500 million daily transactions. Adept at translating ambiguous enterprise requirements into mathematically rigorous, fault-tolerant technical solutions while mentoring dozens of senior and principal engineers across geographically dispersed organizations.',
  skills: [
    'React 18/19',
    'TypeScript',
    'Next.js Enterprise Architecture',
    'Distributed Systems',
    'GraphQL Federation',
    'gRPC & Protocol Buffers',
    'Tailwind CSS & Design Systems',
    'Kafka Event Streaming',
    'PostgreSQL Database Optimization',
    'Redis Cache Invalidation Patterns',
    'Kubernetes & Helm',
    'AWS Cloud Architecture',
    'Terraform Infrastructure-as-Code',
    'WebAssembly (Rust/C++)',
    'Zero-Downtime Migration Strategies',
  ],
  experience: [
    {
      id: 'job-stress-1',
      jobTitle: 'Principal Systems Architect & Staff Frontend Specialist',
      company: 'Global FinTech Infrastructure Corp',
      startDate: 'March 2021',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Spearheaded the complete ground-up re-architecture of the primary high-frequency trading dashboard utilizing React, WebAssembly, and custom Canvas rendering pipelines, reducing end-to-end telemetry latency from 145ms to 8.2ms under peak market volatility.',
        'Engineered an enterprise-grade micro-frontend platform managing 28 decoupled autonomous domain modules with zero cross-runtime bundle pollution and instantaneous sub-millisecond route transitions.',
        'Championed the migration of 450,000 lines of legacy JavaScript code to strictly typed TypeScript with verbatim module syntax, achieving a 99.98% decrease in production runtime TypeError exceptions.',
        'Authored foundational RFCs for multi-region active-active client state synchronization, utilizing optimistic concurrency control algorithms and CRDT-inspired reconciliation.',
      ],
    },
    {
      id: 'job-stress-2',
      jobTitle: 'Lead Senior Frontend Engineer',
      company: 'OmniCloud Data Platforms Inc',
      startDate: 'January 2017',
      endDate: 'February 2021',
      isCurrent: false,
      bullets: [
        'Led an engineering squad of 14 developers delivering cloud telemetry visualization consoles processing over 12TB of time-series observability metrics every single hour.',
        'Designed and standardized a unified UI design token system across web, desktop (Electron), and mobile platforms, cutting average cross-platform feature shipping cycles from 6 weeks to 9 calendar days.',
        'Pioneered automated visual regression testing frameworks with Playwright and Docker that ran across 12 distinct viewport breakpoints and simulated slow 3G cellular connections on every Git pull request.',
        'Reduced critical rendering path bundle sizes by 64% through aggressive AST tree-shaking, dynamic route-level preloading, and automated Brotli compression headers.',
      ],
    },
    {
      id: 'job-stress-3',
      jobTitle: 'Senior Software Engineer - Web Core Infrastructure',
      company: 'Vertex Cloud Labs',
      startDate: 'June 2014',
      endDate: 'December 2016',
      isCurrent: false,
      bullets: [
        'Developed real-time collaborative document editing interfaces leveraging WebSockets, Operational Transformation (OT), and React virtualized DOM rendering.',
        'Constructed custom server-side rendering pipelines capable of dynamically compiling customer tenant configurations in under 20ms at 99.9th percentile.',
        'Mentored 18 junior and mid-level engineers, resulting in 7 successful promotions to senior engineering roles over a consecutive 24-month duration.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-stress-1',
      degree: 'Ph.D. in Computer Science (Distributed Systems & Formal Verification)',
      institution: 'Stanford University, Stanford, California',
      graduationYear: '2014',
    },
    {
      id: 'edu-stress-2',
      degree: 'B.S. in Electrical Engineering & Computer Science (Summa Cum Laude)',
      institution: 'Massachusetts Institute of Technology (MIT), Cambridge, MA',
      graduationYear: '2010',
    },
  ],
};

export const INITIAL_CV_DATA: CVData = {
  targetJobTitle: 'Senior Frontend Engineer',
  contact: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexmorgan',
    portfolio: 'alexmorgan.dev',
  },
  summary:
    'Results-driven Senior Frontend Engineer with 6+ years of experience designing scalable web applications and high-performance design systems. Expert in React, TypeScript, and modern state architectures. Proven track record of improving web performance and mentoring engineering teams.',
  skills: [
    'React',
    'TypeScript',
    'JavaScript (ES6+)',
    'Next.js',
    'Tailwind CSS',
    'Redux Toolkit',
    'GraphQL',
    'REST APIs',
    'Jest / RTL',
    'Vite',
    'Webpack',
    'Git / GitHub',
  ],
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Frontend Engineer',
      company: 'TechCorp Solutions',
      startDate: '2022',
      endDate: 'Present',
      isCurrent: true,
      bullets: [
        'Architected and delivered high-traffic React and TypeScript micro-frontends serving over 1.2M monthly active users.',
        'Refactored legacy state management into lightweight hooks and optimized re-renders, reducing page load latency by 38%.',
        'Built an accessible internal design system adhering to WCAG 2.1 AA standards across 14 cross-functional product squads.',
      ],
    },
    {
      id: 'exp-2',
      jobTitle: 'Frontend Engineer',
      company: 'Pulse Innovations',
      startDate: '2019',
      endDate: '2022',
      isCurrent: false,
      bullets: [
        'Engineered responsive SPAs using React, Vite, and Tailwind CSS, collaborating closely with UX designers and product managers.',
        'Implemented end-to-end testing pipelines with Cypress and Jest, boosting overall regression test coverage from 45% to 88%.',
        'Streamlined client-side data fetching caching strategies, reducing redundant server requests by 25%.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      graduationYear: '2019',
    },
  ],
};

export function useCVState(initialData: CVData = INITIAL_CV_DATA) {
  const [cvData, setCvData] = useState<CVData>(() => getInitialData(initialData));

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
    } catch {
      // Ignore storage quota or access issues
    }
  }, [cvData]);

  const updateTargetJobTitle = useCallback((targetJobTitle: string) => {
    setCvData((prev) => ({
      ...prev,
      targetJobTitle,
    }));
  }, []);

  const updateContact = useCallback(
    <K extends keyof ContactInfo>(field: K, value: ContactInfo[K]) => {
      setCvData((prev) => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value,
        },
      }));
    },
    []
  );

  const updateSummary = useCallback((summary: string) => {
    setCvData((prev) => ({
      ...prev,
      summary,
    }));
  }, []);

  const updateSkills = useCallback((skills: string[]) => {
    setCvData((prev) => ({
      ...prev,
      skills: [...skills],
    }));
  }, []);

  // Work Experience Handlers
  const addExperience = useCallback(() => {
    const newExperience: WorkExperience = {
      id: generateId(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    };

    setCvData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  }, []);

  const updateExperience = useCallback(
    <K extends keyof WorkExperience>(
      id: string,
      field: K,
      value: WorkExperience[K]
    ) => {
      setCvData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => {
          if (exp.id !== id) return exp;
          return {
            ...exp,
            [field]: value,
          };
        }),
      }));
    },
    []
  );

  const addExperienceBullet = useCallback((experienceId: string) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => {
        if (exp.id !== experienceId) return exp;
        return {
          ...exp,
          bullets: [...exp.bullets, ''],
        };
      }),
    }));
  }, []);

  const updateExperienceBullet = useCallback(
    (experienceId: string, bulletIndex: number, value: string) => {
      setCvData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => {
          if (exp.id !== experienceId) return exp;
          const updatedBullets = [...exp.bullets];
          updatedBullets[bulletIndex] = value;
          return {
            ...exp,
            bullets: updatedBullets,
          };
        }),
      }));
    },
    []
  );

  const removeExperienceBullet = useCallback(
    (experienceId: string, bulletIndex: number) => {
      setCvData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) => {
          if (exp.id !== experienceId) return exp;
          return {
            ...exp,
            bullets: exp.bullets.filter((_, idx) => idx !== bulletIndex),
          };
        }),
      }));
    },
    []
  );

  // Education Handlers
  const addEducation = useCallback(() => {
    const newEducation: Education = {
      id: generateId(),
      degree: '',
      institution: '',
      graduationYear: '',
    };

    setCvData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  }, []);

  const removeEducation = useCallback((id: string) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  }, []);

  const updateEducation = useCallback(
    <K extends keyof Education>(id: string, field: K, value: Education[K]) => {
      setCvData((prev) => ({
        ...prev,
        education: prev.education.map((edu) => {
          if (edu.id !== id) return edu;
          return {
            ...edu,
            [field]: value,
          };
        }),
      }));
    },
    []
  );

  const resetCVData = useCallback(() => {
    setCvData(INITIAL_CV_DATA);
  }, []);

  const loadStressTestData = useCallback(() => {
    setCvData(STRESS_TEST_CV_DATA);
  }, []);

  const clearCVData = useCallback(() => {
    setCvData({
      targetJobTitle: '',
      contact: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
      },
      summary: '',
      skills: [],
      experience: [],
      education: [],
    });
  }, []);

  return {
    cvData,
    setCvData,
    updateTargetJobTitle,
    updateContact,
    updateSummary,
    updateSkills,
    addExperience,
    removeExperience,
    updateExperience,
    addExperienceBullet,
    updateExperienceBullet,
    removeExperienceBullet,
    addEducation,
    removeEducation,
    updateEducation,
    resetCVData,
    loadStressTestData,
    clearCVData,
  };
}
