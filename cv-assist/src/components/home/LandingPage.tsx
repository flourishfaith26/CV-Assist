import React from 'react';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Sliders,
  Download,
  Layers,
  Cpu,
} from 'lucide-react';

interface LandingPageProps {
  onStartBlank: () => void;
  onLoadSample: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBlank,
  onLoadSample,
}) => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-16 sm:py-24 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-olive-200 dark:border-olive-800 bg-olive-50 dark:bg-olive-950/40 text-olive-800 dark:text-olive-300 text-xs font-medium mb-6">
            <ShieldCheck className="w-4 h-4 text-olive-700 dark:text-olive-400" />
            <span>100% Applicant Tracking System (ATS) Compliant Architecture</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight leading-tight mb-6">
            Build an ATS-Friendly Resume That Actually Gets You Interviewed
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            Applicant Tracking Systems discard over 75% of resumes due to complex tables, graphics, and multi-column templates. CV Assist formats your resume into a clean, single-column A4 document engineered specifically for parser readability.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              type="button"
              onClick={onStartBlank}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
            >
              <span>Build Your Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onLoadSample}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-olive-700 dark:text-olive-400" />
              <span>Explore With Sample Profile</span>
            </button>
          </div>

          {/* Highlight metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-gray-200 dark:border-gray-800 text-left">
            <div className="flex items-start gap-3 p-3">
              <CheckCircle2 className="w-5 h-5 text-olive-700 dark:text-olive-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Single-Column Layout
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Top-to-bottom document stream readable by Taleo, Workday, and Greenhouse.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3">
              <CheckCircle2 className="w-5 h-5 text-olive-700 dark:text-olive-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Selectable Vector PDF
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  100% native text characters — never rasterized into images or canvas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3">
              <CheckCircle2 className="w-5 h-5 text-olive-700 dark:text-olive-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
                  Real-Time Keystroke Sync
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  Live on-screen A4 canvas displays exactly what compiles into your download.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-olive-700 dark:text-olive-400 uppercase tracking-widest mb-2">
              Simple 3-Step Process
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              How to Create Your Resume With CV Assist
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-2">
              No registration required. Fill in your career milestones, view the live preview, and download your standard ATS document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-6 bg-white dark:bg-gray-800 flex flex-col justify-between transition-colors">
              <div>
                <div className="w-9 h-9 rounded-md bg-olive-50 dark:bg-olive-950/40 border border-olive-200 dark:border-olive-800 flex items-center justify-center text-olive-800 dark:text-olive-300 font-bold text-sm mb-4">
                  01
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Define Your Target Job Title
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Start by specifying the target role (e.g. <em>Senior Frontend Engineer</em>). ATS algorithms compare this directly against the employer's job requisition to calculate match scores.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-xs text-olive-700 dark:text-olive-400 font-medium">
                <Sliders className="w-4 h-4" />
                <span>Aligns job keywords</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-6 bg-white dark:bg-gray-800 flex flex-col justify-between transition-colors">
              <div>
                <div className="w-9 h-9 rounded-md bg-olive-50 dark:bg-olive-950/40 border border-olive-200 dark:border-olive-800 flex items-center justify-center text-olive-800 dark:text-olive-300 font-bold text-sm mb-4">
                  02
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Fill Experience & Skills Tags
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Input your contact details, concise professional summary (with character counters), repeatable work history with bullet achievements, education, and tag-based skills.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-xs text-olive-700 dark:text-olive-400 font-medium">
                <FileText className="w-4 h-4" />
                <span>Repeatable entries & tags</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-6 bg-white dark:bg-gray-800 flex flex-col justify-between transition-colors">
              <div>
                <div className="w-9 h-9 rounded-md bg-olive-50 dark:bg-olive-950/40 border border-olive-200 dark:border-olive-800 flex items-center justify-center text-olive-800 dark:text-olive-300 font-bold text-sm mb-4">
                  03
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Preview Live & Download PDF
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Review the sticky A4 live preview canvas as you type. Once satisfied, click "Download PDF" to generate a pixel-perfect, single-column PDF via our vector rendering engine.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2 text-xs text-olive-700 dark:text-olive-400 font-medium">
                <Download className="w-4 h-4" />
                <span>Instant vector compilation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why ATS Compliance Matters */}
      <section className="py-16 sm:py-20 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-olive-700 dark:text-olive-400 uppercase tracking-widest mb-2">
              Engineered For Parsers
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              Why Single-Column Beats Fancy Templates
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto mt-2">
              Most graphic-heavy templates confuse automated resume parsers. CV Assist follows strict algorithmic standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-6 bg-white dark:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded bg-olive-50 dark:bg-olive-950/40 text-olive-700 dark:text-olive-400">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Strict Single-Column Top-to-Bottom Flow
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Multi-column resumes often cause parsers to read across columns horizontally, scrambling your work experience dates and descriptions into unreadable text chunks. CV Assist guarantees linear top-to-bottom reading order.
              </p>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md p-6 bg-white dark:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded bg-olive-50 dark:bg-olive-950/40 text-olive-700 dark:text-olive-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  Standard Fonts & Clean Margins
                </h4>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Uses standard Helvetica typography with standardized 36pt margins, uppercase section headers, and round bullet point markers that every enterprise ATS parser understands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="border border-gray-200 dark:border-gray-700 rounded-md p-8 sm:p-12 bg-white dark:bg-gray-800 transition-colors">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Ready to create your job-ready resume?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-8">
              Start with a blank canvas or explore with our prefilled sample profile to see how easy it is to customize.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onStartBlank}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
              >
                <span>Start Blank Resume</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onLoadSample}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <Sparkles className="w-4 h-4 text-olive-700 dark:text-olive-400" />
                <span>Load Sample Profile</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
