import React from 'react';
import { Target } from 'lucide-react';

interface JobTargetInputProps {
  targetJobTitle: string;
  onChange: (value: string) => void;
}

export const JobTargetInput: React.FC<JobTargetInputProps> = ({
  targetJobTitle,
  onChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 mb-6 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <Target className="w-5 h-5 text-olive-700 dark:text-olive-600" />
        <label
          htmlFor="targetJobTitle"
          className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide"
        >
          Target Job Title
        </label>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Tailor your CV to match the role you are applying for. ATS algorithms match this directly against job descriptions.
      </p>
      <input
        id="targetJobTitle"
        type="text"
        value={targetJobTitle}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Senior Frontend Engineer"
        className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
      />
    </div>
  );
};
