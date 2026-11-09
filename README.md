# CV Assist — ATS-Compliant Resume Builder & Live Preview

A modern, single-page web application designed to help job seekers build, preview, and download Applicant Tracking System (ATS) compliant resumes with a live, pixel-accurate A4 document canvas and instantaneous PDF compilation.

![CV Assist Banner](cv-assist/public/favicon.png)

---

## Key Features

- **Strict Single-Column ATS Layout**: Linear top-to-bottom reading hierarchy that prevents enterprise parsers (Workday, Taleo, Greenhouse) from scrambling multi-column data.
- **100% Selectable Vector PDF**: Compiles via `@react-pdf/renderer` with standard Helvetica typography and 36pt margins — no rasterized text or canvas captures.
- **Live A4 Preview Canvas**: Updates in real-time on every keystroke, mirroring the exact downloaded PDF document.
- **Light & Dark Mode**: Beautiful user interface with default light mode and persistent dark mode toggle.
- **Preview Scaling**: Zoom in/out (`70%` to `120%`) on the document canvas to fit any screen size.
- **Direct Browser Print**: Native print shortcut (`Ctrl + P`) with `@media print` styling that hides UI controls and prints only the clean document.
- **JSON Data Backup & Restore**: Full portability — export your resume data to a `.json` file and restore it anytime.
- **Local Auto-Save**: Automatically persists all resume changes in `localStorage`.

---

## Tech Stack

- **Framework**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS (custom olive palette `#4A5D23`)
- **PDF Engine**: `@react-pdf/renderer`
- **Icons**: `lucide-react`
- **Typography**: Inter (UI) & Helvetica (ATS Resume PDF)

---

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm (v9 or newer)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/<your-username>/cv-assist.git
cd cv-assist
npm install
cd cv-assist && npm install
```

### Running Locally

To launch the local development server:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Running Tests

To run the automated PDF validation test (verifies vector text operators, non-rasterization, font embedding, and reading order):

```bash
npm test
```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

---

## Project Structure

```
cv-assist/
├── cv-assist/
│   ├── public/
│   │   ├── favicon.png        # Olive document checkmark favicon
│   │   └── favicon.svg        # Scalable vector icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── forms/         # JobTarget, Contact, Summary, Experience, Education, Skills
│   │   │   ├── home/          # Landing page & hero walkthrough
│   │   │   ├── preview/       # A4 live preview canvas & download button
│   │   │   └── pdf/           # @react-pdf/renderer ATS document
│   │   ├── hooks/
│   │   │   ├── useCVState.ts  # Immutable state management & persistence
│   │   │   └── useTheme.ts    # Light/Dark mode state
│   │   ├── types/
│   │   │   └── cv.ts          # Single source of truth data schema
│   │   └── App.tsx            # Main layout & routing
│   └── scripts/
│       └── test-pdf-generation.ts # Automated PDF validation suite
├── package.json               # Root workspace scripts
└── README.md
```

---

## License

MIT License. Free for personal and commercial use.

