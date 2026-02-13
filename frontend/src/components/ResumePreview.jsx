import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

const A4_HEIGHT_PX = 1122; // ~297mm at 96dpi
const A4_WIDTH_PX = 794; // ~210mm at 96dpi

export default function ResumePreview({ resumeData, previewRef }) {
    const contentRef = useRef(null);
    const [fontSize, setFontSize] = useState(10);
    const [overflow, setOverflow] = useState(false);

    // Auto-adjust font size to fit A4
    useEffect(() => {
        const checkOverflow = () => {
            if (!contentRef.current) return;

            let currentSize = 10;
            contentRef.current.style.fontSize = `${currentSize}pt`;

            // Check if content overflows
            if (contentRef.current.scrollHeight > A4_HEIGHT_PX - 60) {
                // Try reducing font size
                while (currentSize > 7 && contentRef.current.scrollHeight > A4_HEIGHT_PX - 60) {
                    currentSize -= 0.5;
                    contentRef.current.style.fontSize = `${currentSize}pt`;
                }
            }

            setFontSize(currentSize);
            setOverflow(contentRef.current.scrollHeight > A4_HEIGHT_PX - 60);
        };

        const timeout = setTimeout(checkOverflow, 100);
        return () => clearTimeout(timeout);
    }, [resumeData]);

    const { personalInfo, professionalSummary, education, projects, skills, achievements } = resumeData;

    const hasContent =
        personalInfo.fullName ||
        professionalSummary ||
        education.some((e) => e.degree) ||
        projects.some((p) => p.title) ||
        skills.programmingLanguages || skills.frontendBackend || skills.tools ||
        achievements.some((a) => a.trim());

    return (
        <div className="relative">
            {/* Overflow Warning */}
            {overflow && (
                <div className="flex items-center gap-2 mb-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 text-sm animate-fade-in">
                    <AlertTriangle size={16} />
                    <span>Content exceeds one A4 page. Consider shortening some sections.</span>
                </div>
            )}

            {/* A4 Page */}
            <div
                ref={previewRef}
                className="bg-white mx-auto shadow-2xl"
                style={{
                    width: `${A4_WIDTH_PX}px`,
                    minHeight: `${A4_HEIGHT_PX}px`,
                    maxHeight: `${A4_HEIGHT_PX}px`,
                    overflow: "hidden",
                    transformOrigin: "top center",
                }}
            >
                <div
                    ref={contentRef}
                    style={{ fontSize: `${fontSize}pt`, padding: "30px 35px", color: "#1a1a1a", fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif" }}
                >
                    {!hasContent ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px", color: "#94a3b8" }}>
                            <div style={{ textAlign: "center" }}>
                                <p style={{ fontSize: "14pt", fontWeight: 500 }}>Start filling in the form</p>
                                <p style={{ fontSize: "10pt", marginTop: "8px" }}>Your resume preview will appear here</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header - Name & Contact */}
                            {personalInfo.fullName && (
                                <div style={{ textAlign: "center", marginBottom: "12px", borderBottom: "2px solid #1a1a1a", paddingBottom: "12px" }}>
                                    <h1 style={{ fontSize: "20pt", fontWeight: 700, color: "#1e293b", letterSpacing: "-0.5px", margin: 0 }}>
                                        {personalInfo.fullName}
                                    </h1>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginTop: "6px", fontSize: "8.5pt", color: "#475569" }}>
                                        {personalInfo.email && (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                                {personalInfo.email}
                                            </span>
                                        )}
                                        {personalInfo.phone && (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                                {personalInfo.phone}
                                            </span>
                                        )}
                                        {personalInfo.linkedin && (
                                            <a href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#475569", textDecoration: "none" }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                                LinkedIn
                                            </a>
                                        )}
                                        {personalInfo.github && (
                                            <a href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "#475569", textDecoration: "none" }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Professional Summary */}
                            {professionalSummary && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h2 style={sectionTitleStyle}>Professional Summary</h2>
                                    <p style={{ lineHeight: 1.5, color: "#334155", margin: 0 }}>{professionalSummary}</p>
                                </div>
                            )}

                            {/* Education */}
                            {education.some((e) => e.degree || e.institution) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h2 style={sectionTitleStyle}>Education</h2>
                                    {education
                                        .filter((e) => e.degree || e.institution)
                                        .map((edu, i) => (
                                            <div key={i} style={{ marginBottom: "6px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <span style={{ fontWeight: 600, color: "#1e293b" }}>{edu.degree}</span>
                                                    <span style={{ fontSize: "8.5pt", color: "#64748b" }}>
                                                        {edu.fromYear && edu.toYear ? `${edu.fromYear} - ${edu.toYear}` : edu.fromYear || edu.toYear || ""}
                                                    </span>
                                                </div>
                                                <div style={{ display: "flex", justifyContent: "space-between", color: "#475569" }}>
                                                    <span>{edu.institution}</span>
                                                    {edu.cgpa && <span style={{ fontSize: "8.5pt" }}>CGPA: {edu.cgpa}</span>}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Projects */}
                            {projects.some((p) => p.title) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h2 style={sectionTitleStyle}>Projects</h2>
                                    {projects
                                        .filter((p) => p.title)
                                        .map((proj, i) => (
                                            <div key={i} style={{ marginBottom: "8px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <span style={{ fontWeight: 700, color: "#1e293b", fontSize: "11pt" }}>• {proj.title}</span>
                                                    <span style={{ display: "flex", gap: "10px", fontSize: "8pt" }}>
                                                        {proj.githubLink && (
                                                            <a href={proj.githubLink.startsWith("http") ? proj.githubLink : `https://${proj.githubLink}`} style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: 600 }}>GitHub</a>
                                                        )}
                                                        {proj.liveLink && (
                                                            <a href={proj.liveLink.startsWith("http") ? proj.liveLink : `https://${proj.liveLink}`} style={{ color: "#1a1a1a", textDecoration: "none", fontWeight: 600 }}>Live ↗</a>
                                                        )}
                                                    </span>
                                                </div>
                                                {proj.description && (
                                                    <ul style={{ paddingLeft: "18px", margin: "2px 0", color: "#475569", lineHeight: 1.5 }}>
                                                        {proj.description.split(/[.\n]/).filter(line => line.trim()).map((line, j) => (
                                                            <li key={j} style={{ marginBottom: "1px" }}>{line.trim()}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {proj.technologies && (
                                                    <p style={{ fontSize: "9pt", color: "#1a1a1a", fontWeight: 600, margin: "3px 0 0 0", paddingLeft: "18px" }}>
                                                        Tech stack: {proj.technologies}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Skills */}
                            {(skills.programmingLanguages || skills.frontendBackend || skills.tools) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h2 style={sectionTitleStyle}>Skills</h2>
                                    <div style={{ lineHeight: 1.8, color: "#334155", fontSize: "9pt" }}>
                                        {skills.programmingLanguages && (
                                            <p style={{ margin: "0 0 2px 0" }}>
                                                <span style={{ fontWeight: 600, color: "#1a1a1a" }}>Programming Languages: </span>
                                                {skills.programmingLanguages}
                                            </p>
                                        )}
                                        {skills.frontendBackend && (
                                            <p style={{ margin: "0 0 2px 0" }}>
                                                <span style={{ fontWeight: 600, color: "#1a1a1a" }}>Frontend & Backend: </span>
                                                {skills.frontendBackend}
                                            </p>
                                        )}
                                        {skills.tools && (
                                            <p style={{ margin: 0 }}>
                                                <span style={{ fontWeight: 600, color: "#1a1a1a" }}>Tools: </span>
                                                {skills.tools}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {achievements.some((a) => a.trim()) && (
                                <div>
                                    <h2 style={sectionTitleStyle}>Achievements / Certifications</h2>
                                    <ul style={{ paddingLeft: "18px", margin: 0, color: "#334155" }}>
                                        {achievements
                                            .filter((a) => a.trim())
                                            .map((ach, i) => (
                                                <li key={i} style={{ marginBottom: "3px", lineHeight: 1.4 }}>
                                                    {ach}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Page info */}
            <div className="text-center mt-3 text-xs text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)]">
                A4 (210 × 297 mm) • Font size: {fontSize}pt
            </div>
        </div>
    );
}

const sectionTitleStyle = {
    fontSize: "11pt",
    fontWeight: 700,
    color: "#1e293b",
    textTransform: "uppercase",
    letterSpacing: "1px",
    borderBottom: "1px solid #cbd5e1",
    paddingBottom: "3px",
    marginBottom: "6px",
    marginTop: 0,
};
