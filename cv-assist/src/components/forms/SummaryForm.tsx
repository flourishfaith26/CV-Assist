import React, { useState } from 'react';
import { FileText, Wand2, Sparkles, Check } from 'lucide-react';
import { AIEngine } from '../../services/aiEngine';

interface SummaryFormProps {
  summary: string;
  targetJobTitle?: string;
  skills?: string[];
  onChange: (value: string) => void;
  maxLength?: number;
}

export const SummaryForm: React.FC<SummaryFormProps> = ({
  summary,
  targetJobTitle = '',
  skills = [],
  onChange,
  maxLength = 500,
}) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [justEnhanced, setJustEnhanced] = useState(false);

  const currentLength = summary.length;
  const isOverLimit = currentLength > maxLength;

  const handleEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      const enhanced = AIEngine.enhanceSummary(summary, targetJobTitle);
      onChange(enhanced);
      setIsEnhancing(false);
      setJustEnhanced(true);
      setTimeout(() => setJustEnhanced(false), 2000);
    }, 300);
  };

  const handleGenerateFresh = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      const generated = AIEngine.generateSummary(targetJobTitle, skills);
      onChange(generated);
      setIsEnhancing(false);
      setJustEnhanced(true);
      setTimeout(() => setJustEnhanced(false), 2000);
    }, 300);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-olive-700 dark:text-olive-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-olive-700 dark:text-olive-600">
            Professional Summary
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`text-xs font-mono px-2 py-0.5 rounded ${
              isOverLimit
                ? 'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 font-bold'
                : currentLength > maxLength * 0.8
                ? 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40'
                : 'text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900'
            }`}
          >
            {currentLength} / {maxLength} chars
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          Write 2–4 concise sentences highlighting your years of experience, core technical strengths, and measurable achievements.
        </p>

        {/* AI Action Buttons */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleEnhance}
            disabled={isEnhancing}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-olive-700 dark:text-olive-400 bg-olive-50 dark:bg-olive-950/50 hover:bg-olive-100 dark:hover:bg-olive-900/50 border border-olive-200 dark:border-olive-800 rounded transition-colors disabled:opacity-50"
            title="Enhance current summary with action verbs and impact metrics"
          >
            {justEnhanced ? (
              <>
                <Check className="w-3.5 h-3.5 text-olive-700 dark:text-olive-400" />
                <span>Enhanced!</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                <span>AI Enhance</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleGenerateFresh}
            disabled={isEnhancing}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded transition-colors disabled:opacity-50"
            title="Generate a brand new executive summary tailored to your role"
          >
            <Sparkles className="w-3.5 h-3.5 text-olive-700 dark:text-olive-400" />
            <span>Generate New</span>
          </button>
        </div>
      </div>

      <textarea
        rows={4}
        value={summary}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Brief summary highlighting your experience, expertise, and career accomplishments..."
        className={`w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border rounded-md focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors ${
          isOverLimit
            ? 'border-red-400 focus:border-red-600 dark:border-red-500'
            : 'border-gray-200 dark:border-gray-700 focus:border-olive-700 dark:focus:border-olive-600'
        }`}
      />
      {isOverLimit && (
        <p className="mt-1 text-xs text-red-600 dark:text-red-400">
          Tip: ATS and recruiters prefer summaries under {maxLength} characters for optimal scanability.
        </p>
      )}
    </div>
  );
};
