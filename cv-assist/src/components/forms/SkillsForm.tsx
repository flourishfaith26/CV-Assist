import React, { useState } from 'react';
import { Wrench, X, Plus } from 'lucide-react';

interface SkillsFormProps {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const addSkillsFromString = (text: string) => {
    const rawTokens = text.split(/[,;\n]/);
    const newItems = rawTokens
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && !skills.includes(item));

    if (newItems.length > 0) {
      onChange([...skills, ...newItems]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addSkillsFromString(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && skills.length > 0) {
      onChange(skills.slice(0, -1));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('text');
    if (pasteData.includes(',') || pasteData.includes(';') || pasteData.includes('\n')) {
      e.preventDefault();
      addSkillsFromString(pasteData);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addSkillsFromString(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-olive-700 dark:text-olive-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-olive-700 dark:text-olive-600">
            Core Skills & Competencies
          </h2>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
          {skills.length} {skills.length === 1 ? 'skill' : 'skills'} added
        </span>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
        Type keywords and press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 font-mono">Enter</kbd> or comma <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 font-mono">,</kbd> to create tags. You can also paste comma-separated lists directly.
      </p>

      {/* Input row */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder="e.g. React, TypeScript, GraphQL..."
          className="flex-1 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
        />
        <button
          type="button"
          onClick={handleAddClick}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      {/* Chips container */}
      <div className="min-h-16 p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 transition-colors">
        {skills.length === 0 ? (
          <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center py-2">
            No skills added yet. Add relevant technical and core competencies for ATS matching.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 focus:outline-none"
                  title={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
