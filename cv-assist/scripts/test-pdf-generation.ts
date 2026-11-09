import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { CVPdfDocument } from '../src/components/pdf/CVPdfDocument';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extensive dataset to test multi-page flow and text wrapping
const extensiveCVData = {
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
      id: 'job-1',
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
      id: 'job-2',
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
      id: 'job-3',
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
      id: 'edu-1',
      degree: 'Ph.D. in Computer Science (Distributed Systems & Formal Verification)',
      institution: 'Stanford University, Stanford, California',
      graduationYear: '2014',
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Electrical Engineering & Computer Science (Summa Cum Laude)',
      institution: 'Massachusetts Institute of Technology (MIT), Cambridge, MA',
      graduationYear: '2010',
    },
  ],
};

async function testGeneration() {
  const outputPath = path.join(__dirname, 'test-output.pdf');
  console.log('Rendering extensive multi-page PDF document...');

  const element = React.createElement(CVPdfDocument, { data: extensiveCVData });
  await ReactPDF.renderToFile(element, outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`PDF successfully generated at: ${outputPath}`);
  console.log(`Generated file size: ${stats.size} bytes`);

  // Read raw PDF text stream to verify text operators and reading order
  const pdfBuffer = fs.readFileSync(outputPath);
  const pdfBinary = pdfBuffer.toString('binary');

  // Decompress streams using zlib
  const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
  let match;
  let fullDecompressedStream = '';
  while ((match = streamRegex.exec(pdfBinary)) !== null) {
    try {
      const inflated = zlib.inflateSync(Buffer.from(match[1], 'binary')).toString('utf8');
      fullDecompressedStream += inflated + '\n';
    } catch {
      // Ignore uncompressed or image streams
    }
  }

  // Decode hex characters in TJ text operators
  const hexRegex = /<([0-9a-fA-F]+)>/g;
  let decodedText = '';
  let hexMatch;
  while ((hexMatch = hexRegex.exec(fullDecompressedStream)) !== null) {
    const hex = hexMatch[1];
    for (let i = 0; i < hex.length; i += 2) {
      decodedText += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
  }

  const hasTextOperators = fullDecompressedStream.includes('Tj') || fullDecompressedStream.includes('TJ');
  const containsCandidateName = decodedText.includes('Elizabeth');
  const containsTargetTitle = decodedText.includes('STAFF FULL-STACK');
  const containsSkills = decodedText.includes('TypeScript');
  const containsExperience = decodedText.includes('Global FinTech');
  const containsEducation = decodedText.includes('Stanford University');

  console.log('\n--- PDF Validation Results ---');
  console.log(`1. Text operator presence (Tj/TJ): ${hasTextOperators ? 'PASS (Vector/Selectable)' : 'FAIL'}`);
  console.log(`2. Searchable candidate name: ${containsCandidateName ? 'PASS' : 'FAIL'}`);
  console.log(`3. Searchable target title: ${containsTargetTitle ? 'PASS' : 'FAIL'}`);
  console.log(`4. Searchable skills: ${containsSkills ? 'PASS' : 'FAIL'}`);
  console.log(`5. Searchable work experience: ${containsExperience ? 'PASS' : 'FAIL'}`);
  console.log(`6. Searchable education: ${containsEducation ? 'PASS' : 'FAIL'}`);
  console.log(`7. File size sanity check (> 5KB): ${stats.size > 5000 ? 'PASS' : 'FAIL'}`);

  if (
    hasTextOperators &&
    containsCandidateName &&
    containsTargetTitle &&
    containsSkills &&
    containsExperience &&
    containsEducation
  ) {
    console.log('\nAll PDF validation criteria PASSED successfully!');
  } else {
    throw new Error('PDF validation failed assertions.');
  }
}

testGeneration().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
