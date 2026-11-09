import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import type { Education } from '../../types/cv';

interface EducationFormProps {
  education: Education[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: <K extends keyof Education>(
    id: string,
    field: K,
    value: Education[K]
  ) => void;
}

export const EducationForm: React.FC<EducationFormProps> = ({
  education,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-olive-700 dark:text-olive-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-olive-700 dark:text-olive-600">
            Education
          </h2>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Degree
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 transition-colors">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">No education entries added yet.</p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-olive-700 dark:text-olive-500 border border-olive-700 dark:border-olive-600 hover:bg-olive-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 relative transition-colors"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Education Entry #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Remove education entry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Degree / Major <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => onUpdate(item.id, 'degree', e.target.value)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Graduation Year
                  </label>
                  <input
                    type="text"
                    value={item.graduationYear}
                    onChange={(e) =>
                      onUpdate(item.id, 'graduationYear', e.target.value)
                    }
                    placeholder="e.g. 2020"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Institution / University <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) =>
                      onUpdate(item.id, 'institution', e.target.value)
                    }
                    placeholder="e.g. University of California, Berkeley"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
