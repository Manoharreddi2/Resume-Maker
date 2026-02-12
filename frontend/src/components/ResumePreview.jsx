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
        skills.some((s) => s.trim()) ||
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
                                <div style={{ textAlign: "center", marginBottom: "12px", borderBottom: "2px solid #4f46e5", paddingBottom: "12px" }}>
                                    <h1 style={{ fontSize: "20pt", fontWeight: 700, color: "#1e293b", letterSpacing: "-0.5px", margin: 0 }}>
                                        {personalInfo.fullName}
                                    </h1>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginTop: "6px", fontSize: "8.5pt", color: "#475569" }}>
                                        {personalInfo.email && <span>{personalInfo.email}</span>}
                                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                        {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                                        {personalInfo.github && <span>{personalInfo.github}</span>}
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
                                                    <span style={{ fontWeight: 600, color: "#1e293b" }}>{proj.title}</span>
                                                    <span style={{ display: "flex", gap: "10px", fontSize: "8pt" }}>
                                                        {proj.githubLink && (
                                                            <a href={proj.githubLink.startsWith("http") ? proj.githubLink : `https://${proj.githubLink}`} style={{ color: "#6366f1", textDecoration: "none" }}>GitHub</a>
                                                        )}
                                                        {proj.liveLink && (
                                                            <a href={proj.liveLink.startsWith("http") ? proj.liveLink : `https://${proj.liveLink}`} style={{ color: "#6366f1", textDecoration: "none" }}>Live ↗</a>
                                                        )}
                                                    </span>
                                                </div>
                                                {proj.description && (
                                                    <p style={{ color: "#475569", lineHeight: 1.4, margin: "2px 0" }}>{proj.description}</p>
                                                )}
                                                {proj.technologies && (
                                                    <p style={{ fontSize: "8.5pt", color: "#6366f1", fontWeight: 500, margin: 0 }}>
                                                        Tech: {proj.technologies}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Skills */}
                            {skills.some((s) => s.trim()) && (
                                <div style={{ marginBottom: "10px" }}>
                                    <h2 style={sectionTitleStyle}>Skills</h2>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                                        {skills
                                            .filter((s) => s.trim())
                                            .map((skill, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        padding: "2px 10px",
                                                        borderRadius: "12px",
                                                        fontSize: "8.5pt",
                                                        background: "#eef2ff",
                                                        color: "#4338ca",
                                                        border: "1px solid #c7d2fe",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {skill.trim()}
                                                </span>
                                            ))}
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
