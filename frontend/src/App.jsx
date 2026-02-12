import { useState, useEffect, useRef } from "react";
import { auth, signOut, onAuthStateChanged } from "./firebase";
import { saveResume, getResume, updateResume } from "./api";
import Auth from "./components/Auth";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import {
  Download,
  Save,
  LogOut,
  Moon,
  Sun,
  Loader2,
  CheckCircle,
  Menu,
  X,
  FileText,
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
  education: [{ degree: "", institution: "", fromYear: "", toYear: "", cgpa: "" }],
  projects: [{ title: "", description: "", technologies: "", githubLink: "", liveLink: "" }],
  skills: [],
  achievements: [""],
};

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const previewRef = useRef(null);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Load resume data when user logs in
  useEffect(() => {
    if (user && !dataLoaded) {
      loadResumeData();
    }
  }, [user]);

  const loadResumeData = async () => {
    try {
      const data = await getResume(user.uid);
      if (data) {
        setResumeData({
          ...initialResumeData,
          ...data,
          personalInfo: { ...initialResumeData.personalInfo, ...data.personalInfo },
        });
      }
      setDataLoaded(true);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error("Failed to load resume:", err);
      }
      setDataLoaded(true);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("");
    try {
      if (dataLoaded) {
        await updateResume(resumeData);
      } else {
        await saveResume(resumeData);
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (err) {
      // If update fails because doc doesn't exist, try save
      try {
        await saveResume(resumeData);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 3000);
      } catch (saveErr) {
        setSaveStatus("error");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    } finally {
      setSaving(false);
    }
  };

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setResumeData(initialResumeData);
      setDataLoaded(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)]">
        <div className="text-center animate-fade-in">
          <Loader2 size={40} className="animate-spin text-[var(--color-primary)] mx-auto mb-4" />
          <p className="text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">Loading...</p>
        </div>
      </div>
    );
  }

  // Auth screen
  if (!user) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <Auth />
      </div>
    );
  }

  // Main App
  return (
    <div className={`min-h-screen bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] transition-colors duration-300 ${darkMode ? "dark" : ""}`}>
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
                Resume Maker
              </h1>
              <p className="text-[10px] text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] leading-tight hidden sm:block">
                {user.email}
              </p>
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex items-center gap-2">
            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : saveStatus === "saved" ? (
                <CheckCircle size={16} />
              ) : (
                <Save size={16} />
              )}
              <span className="hidden sm:inline">
                {saving ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save"}
              </span>
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-success)] text-white text-sm font-medium hover:bg-green-600 transition-all cursor-pointer shadow-sm"
            >
              <Download size={16} />
              <span className="hidden sm:inline">PDF</span>
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

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-danger)] hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row">
        {/* Left Panel - Form */}
        <div className={`w-full lg:w-1/2 p-4 sm:p-6 overflow-y-auto ${mobilePreview ? "hidden lg:block" : ""}`}
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
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
