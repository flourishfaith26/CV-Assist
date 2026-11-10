import { useState, useRef } from 'react';
import {
  Trash2,
  Eye,
  Edit3,
  ArrowLeft,
  ArrowRight,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  FileDown,
  FileUp,
} from 'lucide-react';
import { useCVState } from './hooks/useCVState';
import { useTheme } from './hooks/useTheme';
import { LandingPage } from './components/home/LandingPage';
import { JobTargetInput } from './components/forms/JobTargetInput';
import { AIAssistantPanel } from './components/ai/AIAssistantPanel';
import { ContactForm } from './components/forms/ContactForm';
import { SummaryForm } from './components/forms/SummaryForm';
import { ExperienceForm } from './components/forms/ExperienceForm';
import { EducationForm } from './components/forms/EducationForm';
import { SkillsForm } from './components/forms/SkillsForm';
import { CVPreview } from './components/preview/CVPreview';
import { DownloadButton } from './components/preview/DownloadButton';

export function App() {
  const {
    cvData,
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
    clearCVData,
    setCvData,
  } = useCVState();

  const { theme, toggleTheme } = useTheme();

  // Page view routing: 'home' for front page, 'builder' for the CV creator
  const [currentView, setCurrentView] = useState<'home' | 'builder'>('home');

  // Mobile view toggle inside builder ('form' | 'preview')
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');

  // Preview zoom scale state
  const [zoomScale, setZoomScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(1.2, Number((prev + 0.1).toFixed(1))));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(0.7, Number((prev - 0.1).toFixed(1))));
  const handleResetZoom = () => setZoomScale(1);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    const safeName = cvData.contact.fullName.trim().replace(/\s+/g, '_') || 'Resume';
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${safeName}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === 'object' && parsed.contact) {
            setCvData(parsed);
          }
        } catch {
          alert('Invalid resume JSON file format.');
        }
      };
    }
  };

  const handleStartBlank = () => {
    setCurrentView('builder');
  };

  const handleLoadSample = () => {
    resetCVData();
    setCurrentView('builder');
  };

  const handleAddSkills = (newSkills: string[]) => {
    const existing = new Set(cvData.skills.map((s) => s.toLowerCase()));
    const toAdd = newSkills.filter((s) => !existing.has(s.toLowerCase()));
    if (toAdd.length > 0) {
      updateSkills([...cvData.skills, ...toAdd]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col transition-colors">
      {/* Header: full width, clean background, olive green logo/title */}
      <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {currentView === 'builder' && (
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors mr-1"
                title="Return to home page"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <img
                src="/favicon.png"
                alt="CV Assist Logo"
                className="w-9 h-9 rounded-md object-contain"
              />
              <div>
                <span className="text-xl font-bold tracking-tight text-olive-700 dark:text-olive-400 block leading-tight">
                  CV Assist
                </span>
                <span className="hidden sm:inline-block text-xs text-gray-600 dark:text-gray-400">
                  ATS-Compliant Resume Builder & Live Preview
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              aria-label="Toggle light or dark theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-gray-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {currentView === 'home' ? (
              <button
                type="button"
                onClick={handleStartBlank}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-olive-700 hover:bg-olive-800 rounded-md transition-colors"
              >
                <span>Make Your CV</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clearCVData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                  title="Clear all fields"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {currentView === 'home' ? (
        <main className="flex-1 w-full">
          <LandingPage
            onStartBlank={handleStartBlank}
            onLoadSample={handleLoadSample}
          />
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Tab Switcher (< lg screens) */}
          <div className="lg:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-1.5 mb-6 flex items-center justify-center gap-2 transition-colors">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md border ${
                mobileTab === 'form'
                  ? 'bg-olive-700 text-white border-olive-700'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit CV Form
            </button>
            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md border ${
                mobileTab === 'preview'
                  ? 'bg-olive-700 text-white border-olive-700'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Live Preview & Download
            </button>
          </div>

          {/* Target Job Input Banner */}
          <JobTargetInput
            targetJobTitle={cvData.targetJobTitle}
            onChange={updateTargetJobTitle}
          />

          {/* Two-column layout on desktop (grid-cols-12), stacked on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Form Panel (col-span-6, overflow-y-auto) */}
            <div
              className={`lg:col-span-6 space-y-2 ${
                mobileTab === 'preview' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* AI Resume Assistant & Live ATS Audit */}
              <AIAssistantPanel
                cvData={cvData}
                onApplySummary={updateSummary}
                onAddSkills={handleAddSkills}
              />

              <ContactForm contact={cvData.contact} onChange={updateContact} />

              <SummaryForm
                summary={cvData.summary}
                targetJobTitle={cvData.targetJobTitle}
                skills={cvData.skills}
                onChange={updateSummary}
              />

              <SkillsForm skills={cvData.skills} onChange={updateSkills} />

              <ExperienceForm
                experience={cvData.experience}
                onAdd={addExperience}
                onRemove={removeExperience}
                onUpdate={updateExperience}
                onAddBullet={addExperienceBullet}
                onUpdateBullet={updateExperienceBullet}
                onRemoveBullet={removeExperienceBullet}
              />

              <EducationForm
                education={cvData.education}
                onAdd={addEducation}
                onRemove={removeEducation}
                onUpdate={updateEducation}
              />
            </div>

            {/* Right Preview Panel (col-span-6, sticky top-24) */}
            <div
              className={`lg:col-span-6 lg:sticky lg:top-24 space-y-4 ${
                mobileTab === 'form' ? 'hidden lg:block' : 'block'
              }`}
            >
              {/* Action Toolbar */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-4 space-y-3 shadow-sm transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Live A4 Document Preview
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Single-column ATS standard layout (Helvetica, 36pt margins)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                      title="Print directly or save via browser print"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Print</span>
                    </button>
                    <DownloadButton data={cvData} />
                  </div>
                </div>

                {/* Sub-toolbar: Zoom controls & Data Backup */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-2 text-xs">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <span className="font-medium mr-1 hidden sm:inline">Zoom:</span>
                    <button
                      type="button"
                      onClick={handleZoomOut}
                      disabled={zoomScale <= 0.7}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 disabled:opacity-40"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs w-10 text-center text-gray-800 dark:text-gray-200">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={handleZoomIn}
                      disabled={zoomScale >= 1.2}
                      className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 disabled:opacity-40"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    {zoomScale !== 1 && (
                      <button
                        type="button"
                        onClick={handleResetZoom}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 ml-1 text-[10px]"
                        title="Reset Zoom to 100%"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Backup JSON tools */}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImportJSON}
                      accept=".json"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      title="Import previously saved JSON resume file"
                    >
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Import JSON</span>
                    </button>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <button
                      type="button"
                      onClick={handleExportJSON}
                      className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                      title="Export current resume data as JSON backup"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Backup JSON</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Preview Canvas */}
              <div className="max-h-[calc(100vh-14rem)] overflow-y-auto rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-2 transition-colors">
                <CVPreview data={cvData} zoomScale={zoomScale} />
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">CV Assist</span> — Single-column ATS resume builder powered by React, TypeScript & @react-pdf/renderer.
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="hover:text-olive-700 dark:hover:text-olive-400 transition-colors"
            >
              Home
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={handleStartBlank}
              className="hover:text-olive-700 dark:hover:text-olive-400 transition-colors"
            >
              CV Builder
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
