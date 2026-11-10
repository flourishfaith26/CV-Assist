import React, { useState } from 'react';
import { Sparkles, ShieldCheck, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Wand2 } from 'lucide-react';
import type { CVData } from '../../types/cv';
import { AIEngine, type ATSScoreBreakdown } from '../../services/aiEngine';

interface AIAssistantPanelProps {
  cvData: CVData;
  onApplySummary: (summary: string) => void;
  onAddSkills: (skills: string[]) => void;
}

export const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({
  cvData,
  onApplySummary,
  onAddSkills,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const audit: ATSScoreBreakdown = AIEngine.auditResume(cvData);
  const recommendedKeywords = AIEngine.recommendKeywords(
    cvData.targetJobTitle || 'Software Engineer',
    cvData.skills
  );

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = AIEngine.generateSummary(cvData.targetJobTitle, cvData.skills);
      onApplySummary(generated);
      setIsGenerating(false);
    }, 350);
  };

  const handleAddKeyword = (keyword: string) => {
    onAddSkills([keyword]);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-olive-700 dark:text-olive-400 bg-olive-50 dark:bg-olive-950/50 border-olive-200 dark:border-olive-800';
    if (score >= 65) return 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';
    return 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800';
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mb-6 shadow-sm overflow-hidden transition-colors">
      {/* Header bar */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-olive-50 dark:bg-olive-950/50 border border-olive-200 dark:border-olive-800 flex items-center justify-center text-olive-700 dark:text-olive-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                AI Resume Optimizer & ATS Audit
              </h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border border-olive-200 dark:border-olive-800 bg-olive-50 dark:bg-olive-950/60 text-olive-800 dark:text-olive-300">
                Live Analysis
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Evaluates keyword density, impact metrics, and parser readability
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Score Badge */}
          <div
            className={`px-3 py-1 rounded-md border text-xs font-bold font-mono flex items-center gap-1.5 ${getScoreColor(
              audit.overallScore
            )}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS Score: {audit.overallScore}/100</span>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Toggle AI Optimizer panel"
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-5 space-y-5 bg-white dark:bg-gray-800">
          {/* Progress Breakdown */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              <span>Overall ATS Parsing Readiness</span>
              <span className="font-mono font-bold text-olive-700 dark:text-olive-400">{audit.overallScore}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-olive-700 dark:bg-olive-500 transition-all duration-500"
                style={{ width: `${audit.overallScore}%` }}
              />
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-md bg-gray-50/50 dark:bg-gray-900/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-olive-700 dark:text-olive-400" />
                <span>Verified Strengths</span>
              </div>
              {audit.strengths.length === 0 ? (
                <p className="text-xs text-gray-400 italic">Complete form sections to unlock strengths.</p>
              ) : (
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {audit.strengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-olive-700 dark:text-olive-400 font-bold">•</span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recommended Improvements */}
            <div className="p-3 border border-gray-100 dark:border-gray-700 rounded-md bg-gray-50/50 dark:bg-gray-900/40">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Recommended Enhancements</span>
              </div>
              {audit.improvements.length === 0 ? (
                <p className="text-xs text-olive-700 dark:text-olive-400 font-medium">
                  Outstanding! Resume meets enterprise ATS criteria.
                </p>
              ) : (
                <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                  {audit.improvements.map((imp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* AI One-Click Generators */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block">
                AI Executive Summary Generator
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Synthesizes a tailored, quantified summary aligned with "{cvData.targetJobTitle || 'your role'}"
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors disabled:opacity-50"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>{isGenerating ? 'Synthesizing...' : 'Generate Power Summary'}</span>
            </button>
          </div>

          {/* Recommended ATS Keywords to 1-Click Add */}
          {recommendedKeywords.length > 0 && (
            <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200 mb-2">
                <Zap className="w-3.5 h-3.5 text-olive-700 dark:text-olive-400" />
                <span>AI Recommended Role Keywords (Click to add to skills):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {recommendedKeywords.slice(0, 8).map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleAddKeyword(kw)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-olive-700 dark:hover:border-olive-500 hover:text-olive-700 dark:hover:text-olive-400 rounded-md transition-colors"
                    title={`Add ${kw} to Core Skills`}
                  >
                    <span>+</span>
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

