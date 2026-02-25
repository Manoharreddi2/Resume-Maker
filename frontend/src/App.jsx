import { useState, useEffect, useRef } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import {
  Download,
  Moon,
  Sun,
  Menu,
  X,
  FileText,
  RotateCcw,
} from "lucide-react";

const initialResumeData = {
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  },
  professionalSummary: "",
  education: [{ degree: "", fieldOfStudy: "", institution: "", location: "", fromYear: "", toYear: "", cgpa: "" }],
  projects: [{ title: "", description: "", technologies: "", githubLink: "", liveLink: "" }],
  skills: {
    programmingLanguages: "",
    frontendBackend: "",
    tools: "",
  },
  achievements: [""],
};

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem("resumeData");
      return saved ? JSON.parse(saved) : initialResumeData;
    } catch {
      return initialResumeData;
    }
  });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("darkMode") === "true";
    } catch {
      return false;
    }
  });
  const [mobilePreview, setMobilePreview] = useState(false);
  const previewRef = useRef(null);

  // Save resume data to localStorage
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Dark mode toggle + persist
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const html2pdf = (await import("html2pdf.js")).default;

    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName || "resume"}_resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().set(opt).from(previewRef.current).save();
  };

  // Main App
  return (
    <div className={`min-h-screen bg-white dark:bg-[var(--color-bg-dark)] transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-40 bg-[var(--color-surface-light)]/80 dark:bg-[var(--color-surface-dark)]/80 backdrop-blur-xl border-b border-[var(--color-border-light)] dark:border-[var(--color-border-dark)]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] shadow-lg">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] leading-tight">
                Resume Builder
              </h1>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Reset */}
            <button
              onClick={() => { if (window.confirm('Reset all fields? This cannot be undone.')) { setResumeData(initialResumeData); localStorage.removeItem('resumeData'); } }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] text-sm font-medium hover:shadow-md transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-success)] text-white text-sm font-medium hover:bg-green-600 transition-all cursor-pointer shadow-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobilePreview(!mobilePreview)}
              className="lg:hidden p-2 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] cursor-pointer"
            >
              {mobilePreview ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Dark mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] hover:shadow-md transition-all cursor-pointer"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row">
        {/* Left Panel - Form (always light theme) */}
        <div className={`w-full lg:w-1/2 overflow-y-auto overflow-x-hidden ${mobilePreview ? "hidden lg:block" : ""}`}
          style={{ maxHeight: "calc(100vh - 64px)", background: "#ffffff", scrollbarGutter: "stable" }}
        >
          <div className="p-6 sm:p-8 pr-8 sm:pr-10 light-panel">
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className={`w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto bg-[var(--color-bg-light)]/50 dark:bg-[var(--color-bg-dark)]/50 border-l border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] ${!mobilePreview ? "hidden lg:block" : ""}`}
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          <div style={{ transform: "scale(0.75)", transformOrigin: "top center" }}>
            <ResumePreview resumeData={resumeData} previewRef={previewRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
