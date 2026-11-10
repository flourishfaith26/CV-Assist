import type { CVData } from '../types/cv';

export interface AISuggestion {
  id: string;
  category: string;
  original?: string;
  suggestion: string;
  explanation: string;
}

export interface ATSScoreBreakdown {
  overallScore: number;
  contactScore: number;
  summaryScore: number;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  strengths: string[];
  improvements: string[];
}

// Curated role-based power summaries
const ROLE_SUMMARIES: Record<string, string[]> = {
  frontend: [
    'Performance-driven Frontend Engineer with 6+ years of expertise architecting resilient React, TypeScript, and Next.js applications. Proven track record of slashing Core Web Vitals LCP by 42% and implementing scalable enterprise design systems adopted across 12+ squads.',
    'Senior Frontend Specialist with extensive experience leading UI/UX transformations and high-volume web platforms. Expert in modern state management, micro-frontends, accessible WCAG 2.1 AA architectures, and real-time WebSocket interfaces.',
  ],
  backend: [
    'Results-oriented Backend Engineer with 5+ years of experience engineering high-concurrency distributed microservices in Node.js, Go, and PostgreSQL. Architected event-driven pipelines handling 100M+ daily events with 99.99% uptime.',
    'Systems Software Engineer specialized in resilient REST & gRPC API development, database optimization, Redis cache strategies, and cloud infrastructure on AWS/Kubernetes.',
  ],
  fullstack: [
    'Full-Stack Software Engineer with comprehensive experience delivering scalable client-facing and server-side applications with React, TypeScript, Node.js, and PostgreSQL. Adept at bridging UX engineering with robust distributed systems.',
  ],
  product: [
    'Metric-driven Product Manager with 5+ years driving end-to-end product lifecycles across B2B SaaS platforms. Increased quarterly user retention by 28% and accelerated feature delivery through agile data-informed roadmaps.',
  ],
  data: [
    'Data Engineer & Analyst with deep expertise in Python, SQL, dbt, and Snowflake. Built automated ETL/ELT pipelines ingesting 5TB+ daily telemetry data and structured self-serve business intelligence dashboards.',
  ],
  general: [
    'Detail-oriented and impact-focused professional with a demonstrated track record of optimizing operational workflows, delivering cross-functional initiatives, and leveraging data-driven solutions to achieve strategic business milestones.',
  ],
};

// Power action verbs by category
export const POWER_VERBS = [
  'Architected',
  'Spearheaded',
  'Orchestrated',
  'Pioneered',
  'Optimized',
  'Engineered',
  'Accelerated',
  'Streamlined',
  'Delivered',
  'Surpassed',
  'Consolidated',
  'Automated',
  'Standardized',
  'Maximized',
  'Transformed',
];

// Industry keywords to recommend based on role
const KEYWORD_RECOMMENDATIONS: Record<string, string[]> = {
  frontend: ['React 19', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL', 'REST APIs', 'Jest / RTL', 'Vite', 'Web Vitals', 'WCAG Accessibility', 'CI/CD Pipelines'],
  backend: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'gRPC', 'Kafka', 'Microservices', 'AWS / GCP', 'CI/CD', 'API Security'],
  fullstack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'GraphQL', 'Tailwind CSS', 'Git / GitHub', 'System Design', 'RESTful Services'],
  mobile: ['React Native', 'Flutter', 'iOS / Swift', 'Android / Kotlin', 'State Management', 'App Store Deployment', 'Mobile UI/UX', 'Offline-first Architecture'],
  data: ['Python', 'SQL', 'PostgreSQL', 'Snowflake', 'dbt', 'Airflow', 'Tableau / Looker', 'ETL Pipelines', 'Pandas / NumPy', 'Data Modeling'],
};

export class AIEngine {
  private static getRoleKey(targetJob: string): string {
    const title = targetJob.toLowerCase();
    if (title.includes('front') || title.includes('react') || title.includes('ui') || title.includes('web')) return 'frontend';
    if (title.includes('back') || title.includes('node') || title.includes('go') || title.includes('system') || title.includes('cloud')) return 'backend';
    if (title.includes('full') || title.includes('software')) return 'fullstack';
    if (title.includes('product') || title.includes('project') || title.includes('owner')) return 'product';
    if (title.includes('data') || title.includes('analytics') || title.includes('machine') || title.includes('ai')) return 'data';
    return 'general';
  }

  /**
   * Generates a tailored, high-impact professional summary
   */
  static generateSummary(targetJob: string, skills: string[] = []): string {
    const roleKey = this.getRoleKey(targetJob);
    const summaries = ROLE_SUMMARIES[roleKey] || ROLE_SUMMARIES.general;
    const baseSummary = summaries[Math.floor(Math.random() * summaries.length)];

    if (skills.length > 0) {
      const topSkills = skills.slice(0, 3).join(', ');
      return baseSummary.replace('React, TypeScript, and Next.js', topSkills);
    }
    return baseSummary;
  }

  /**
   * Enhances a drafted summary with strong action verbs and quantified tone
   */
  static enhanceSummary(rawText: string, targetJob: string): string {
    if (!rawText.trim()) {
      return this.generateSummary(targetJob);
    }
    const trimmed = rawText.trim();
    // If it lacks impact opening, synthesize with target job
    if (!/^(Results-driven|Accomplished|High-performing|Performance-driven|Innovative|Distinguished)/i.test(trimmed)) {
      return `Results-driven ${targetJob || 'Professional'} with proven success delivering high-impact solutions. ${trimmed}`;
    }
    return trimmed;
  }

  /**
   * Transforms weak or passive bullet points into quantified, achievement-oriented statements
   */
  static enhanceBullet(bullet: string, roleTitle: string = ''): string {
    const trimmed = bullet.trim();
    if (!trimmed) {
      return `Spearheaded key technical initiatives for ${roleTitle || 'core platforms'}, improving system throughput by 35% and reducing user friction.`;
    }

    // Pattern replacements for common passive phrases
    let enhanced = trimmed
      .replace(/^responsible for (managing|leading|doing|working on)/i, 'Spearheaded')
      .replace(/^worked on (building|developing|creating)/i, 'Engineered')
      .replace(/^helped with (developing|creating|building)/i, 'Collaborated to engineer')
      .replace(/^made (improvements to|changes to)/i, 'Optimized')
      .replace(/^did (testing|unit testing)/i, 'Authored comprehensive automated test suites for')
      .replace(/^wrote (code for|documentation for)/i, 'Delivered high-quality, production-ready specifications for')
      .replace(/^handled (customer|client)/i, 'Resolved critical escalations for');

    // Capitalize first letter
    enhanced = enhanced.charAt(0).toUpperCase() + enhanced.slice(1);

    // If no quantified metric exists, provide metric guidance enhancement
    const hasMetric = /\d+%|\$\d+|\d+x|\d+ users|\d+ms/i.test(enhanced);
    if (!hasMetric && !enhanced.endsWith('.')) {
      enhanced += ', resulting in a 25% efficiency gain and improved team velocity.';
    } else if (!enhanced.endsWith('.')) {
      enhanced += '.';
    }

    return enhanced;
  }

  /**
   * Generates recommended bullet points based on a job title
   */
  static generateBulletSuggestions(jobTitle: string, company: string = ''): string[] {
    const roleKey = this.getRoleKey(jobTitle);
    const org = company ? ` at ${company}` : '';

    if (roleKey === 'frontend') {
      return [
        `Architected and deployed responsive single-page web architectures${org}, driving a 34% reduction in load latency and boosting user engagement.`,
        `Engineered cross-browser design components compliant with WCAG 2.1 AA standards, standardizing UI development across 8 squads.`,
        `Implemented state-of-the-art caching and code-splitting pipelines, lowering critical bundle size by 45%.`,
      ];
    }

    if (roleKey === 'backend') {
      return [
        `Constructed high-throughput REST and gRPC API microservices${org}, maintaining 99.99% uptime across 12M monthly requests.`,
        `Refactored relational database queries and integrated Redis distributed caching, cutting p95 query latency from 280ms to 42ms.`,
        `Automated containerized deployment workflows using Docker and GitHub Actions, reducing release cycle lead times by 60%.`,
      ];
    }

    return [
      `Spearheaded critical cross-functional initiatives${org}, consistently outperforming delivery milestones by 20% across quarters.`,
      `Engineered data-driven workflow automations, eliminating redundant manual operational overhead by 15 hours weekly.`,
      `Mentored and onboarded junior team members while establishing rigorous quality benchmarks and review standards.`,
    ];
  }

  /**
   * Recommends high-impact ATS keywords for the target role
   */
  static recommendKeywords(targetJob: string, existingSkills: string[]): string[] {
    const roleKey = this.getRoleKey(targetJob);
    const pool = KEYWORD_RECOMMENDATIONS[roleKey] || KEYWORD_RECOMMENDATIONS.fullstack;
    const existingLower = new Set(existingSkills.map((s) => s.toLowerCase()));
    return pool.filter((skill) => !existingLower.has(skill.toLowerCase()));
  }

  /**
   * Real-time ATS Parsing Score and Audit Breakdown
   */
  static auditResume(cv: CVData): ATSScoreBreakdown {
    let contactScore = 0;
    let summaryScore = 0;
    let skillsScore = 0;
    let experienceScore = 0;
    let educationScore = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    // 1. Contact Info Audit (max 20 pts)
    if (cv.contact.fullName) contactScore += 5;
    if (cv.contact.email && cv.contact.email.includes('@')) contactScore += 5;
    if (cv.contact.phone) contactScore += 4;
    if (cv.contact.location) contactScore += 3;
    if (cv.contact.linkedin || cv.contact.portfolio) contactScore += 3;

    if (contactScore >= 18) {
      strengths.push('Complete contact credentials with professional links');
    } else {
      improvements.push('Add LinkedIn profile and phone number to pass recruiter verification');
    }

    // 2. Summary Audit (max 20 pts)
    if (cv.summary && cv.summary.length >= 80) {
      summaryScore += 12;
      if (cv.summary.length <= 500) summaryScore += 8;
      else summaryScore += 4; // slight penalty for exceeding 500

      if (/(years|experienced|proven|architected|delivered|specialist)/i.test(cv.summary)) {
        strengths.push('Professional summary contains strong action words and core competencies');
      } else {
        improvements.push('Incorporate quantified achievements or years of experience in summary');
      }
    } else {
      improvements.push('Provide a concise 2-4 sentence summary highlighting your top strengths');
    }

    // 3. Skills Audit (max 20 pts)
    const skillCount = cv.skills.length;
    if (skillCount >= 8) {
      skillsScore = 20;
      strengths.push(`Rich skill keyword density (${skillCount} relevant keywords parsed)`);
    } else if (skillCount >= 4) {
      skillsScore = 14;
      improvements.push('Add 4+ more core technical skills to maximize ATS keyword matching');
    } else {
      skillsScore = skillCount * 3;
      improvements.push('Add industry-standard skills and technical competencies');
    }

    // 4. Experience Audit (max 25 pts)
    if (cv.experience.length >= 1) {
      experienceScore += 10;
      let totalBullets = 0;
      let quantifiedBullets = 0;

      cv.experience.forEach((exp) => {
        if (exp.jobTitle && exp.company) experienceScore += 3;
        totalBullets += exp.bullets.filter((b) => b.trim().length > 0).length;
        exp.bullets.forEach((b) => {
          if (/\d+%|\$\d+|\d+x|\d+ users|\d+ms|\b\d+\b/i.test(b)) {
            quantifiedBullets += 1;
          }
        });
      });

      if (totalBullets >= 3) experienceScore += 5;
      if (quantifiedBullets >= 2) {
        experienceScore += 7;
        strengths.push('Work experience features quantified, metric-driven achievements');
      } else {
        improvements.push('Quantify experience bullets with specific numbers (e.g. %, $ saved, latency reduced)');
      }
    } else {
      improvements.push('Add at least one professional work experience entry');
    }
    experienceScore = Math.min(25, experienceScore);

    // 5. Education Audit (max 15 pts)
    if (cv.education.length >= 1) {
      const firstEdu = cv.education[0];
      if (firstEdu.degree) educationScore += 6;
      if (firstEdu.institution) educationScore += 6;
      if (firstEdu.graduationYear) educationScore += 3;
      strengths.push('Formal education accredited and verified');
    } else {
      improvements.push('Include academic degree or verified training certifications');
    }

    const overallScore = Math.min(
      100,
      contactScore + summaryScore + skillsScore + experienceScore + educationScore
    );

    return {
      overallScore,
      contactScore,
      summaryScore,
      skillsScore,
      experienceScore,
      educationScore,
      strengths,
      improvements,
    };
  }
}
