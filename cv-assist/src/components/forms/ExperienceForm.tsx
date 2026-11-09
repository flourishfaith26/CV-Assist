import React from 'react';
import { Briefcase, Plus, Trash2, GripVertical } from 'lucide-react';
import type { WorkExperience } from '../../types/cv';

interface ExperienceFormProps {
  experience: WorkExperience[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: <K extends keyof WorkExperience>(
    id: string,
    field: K,
    value: WorkExperience[K]
  ) => void;
  onAddBullet: (id: string) => void;
  onUpdateBullet: (id: string, bulletIndex: number, value: string) => void;
  onRemoveBullet: (id: string, bulletIndex: number) => void;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experience,
  onAdd,
  onRemove,
  onUpdate,
  onAddBullet,
  onUpdateBullet,
  onRemoveBullet,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-6 transition-colors">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-olive-700 dark:text-olive-600" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-olive-700 dark:text-olive-600">
            Work Experience
          </h2>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Job
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-6 border border-dashed border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 transition-colors">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">No work experience added yet.</p>
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-olive-700 dark:text-olive-500 border border-olive-700 dark:border-olive-600 hover:bg-olive-50 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((job, jobIndex) => (
            <div
              key={job.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 relative transition-colors"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Job Position #{jobIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(job.id)}
                  className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30"
                  title="Remove this job"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={job.jobTitle}
                    onChange={(e) => onUpdate(job.id, 'jobTitle', e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={job.company}
                    onChange={(e) => onUpdate(job.id, 'company', e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={job.startDate}
                    onChange={(e) => onUpdate(job.id, 'startDate', e.target.value)}
                    placeholder="e.g. 2021 or Jan 2021"
                    className="w-full px-3 py-2 text-sm text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      End Date
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={job.isCurrent}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          onUpdate(job.id, 'isCurrent', checked);
                          if (checked) {
                            onUpdate(job.id, 'endDate', 'Present');
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600 text-olive-700 focus:ring-olive-700 w-3.5 h-3.5"
                      />
                      <span>Current Position</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={job.isCurrent ? 'Present' : job.endDate}
                    disabled={job.isCurrent}
                    onChange={(e) => onUpdate(job.id, 'endDate', e.target.value)}
                    placeholder="e.g. 2024 or Present"
                    className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 transition-colors ${
                      job.isCurrent
                        ? 'bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 focus:border-olive-700 dark:focus:border-olive-600'
                    }`}
                  />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Bullet Points (Action verbs & quantified achievements)
                  </span>
                  <button
                    type="button"
                    onClick={() => onAddBullet(job.id)}
                    className="inline-flex items-center gap-1 text-xs text-olive-700 dark:text-olive-500 hover:text-olive-800 dark:hover:text-olive-400 font-medium"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {job.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-2">
                      <div className="pt-2 text-gray-400 dark:text-gray-500">
                        <GripVertical className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
                      </div>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) =>
                          onUpdateBullet(job.id, bulletIdx, e.target.value)
                        }
                        placeholder="Action verb + context + measurable result (e.g. Improved site performance by 30% through code splitting)"
                        className="flex-1 px-3 py-1.5 text-xs text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-md focus:outline-none focus:border-olive-700 dark:focus:border-olive-600 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-900 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => onRemoveBullet(job.id, bulletIdx)}
                        disabled={job.bullets.length <= 1}
                        className={`p-1.5 rounded text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 mt-1 ${
                          job.bullets.length <= 1
                            ? 'opacity-30 cursor-not-allowed hover:text-gray-400'
                            : ''
                        }`}
                        title="Remove bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
