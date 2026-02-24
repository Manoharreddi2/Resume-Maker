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
                    style={{
                        fontSize: `${fontSize}pt`,
                        padding: "40px 45px",
                        color: "#000000",
                        fontFamily: "'Times New Roman', Times, serif",
                        lineHeight: 1.3
                    }}
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
                            {/* Header - Centered Name & Contact */}
                            {personalInfo.fullName && (
                                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                                    <h1 style={{ fontSize: "24pt", fontWeight: 700, color: "#003366", textTransform: "uppercase", margin: "0 0 5px 0" }}>
                                        {personalInfo.fullName}
                                    </h1>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 8px", fontSize: "10pt", color: "#000000" }}>
                                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                                        {(personalInfo.phone && personalInfo.email) && <span style={{ color: "#000000" }}>◊</span>}
                                        {personalInfo.email && (
                                            <a href={`mailto:${personalInfo.email}`} style={{ color: "#0000ee", textDecoration: "none" }}>{personalInfo.email}</a>
                                        )}
                                        {personalInfo.linkedin && (
                                            <>
                                                <span style={{ color: "#000000" }}>◊</span>
                                                <a href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} style={{ color: "#0000ee", textDecoration: "none" }}>linkedin.com/in/{personalInfo.fullName.toLowerCase().split(' ').join('')}</a>
                                            </>
                                        )}
                                        {personalInfo.github && (
                                            <>
                                                <span style={{ color: "#000000" }}>◊</span>
                                                <a href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`} style={{ color: "#0000ee", textDecoration: "none" }}>github.com/{personalInfo.fullName.toLowerCase().split(' ').join('')}</a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Objective / Summary */}
                            {professionalSummary && (
                                <div style={{ marginBottom: "12px" }}>
                                    <h2 style={sectionTitleStyle}>Objective</h2>
                                    <p style={{ margin: "2px 0 0 0", textAlign: "justify", lineHeight: 1.4 }}>{professionalSummary}</p>
                                </div>
                            )}

                            {/* Education */}
                            {education.some((e) => e.degree || e.institution) && (
                                <div style={{ marginBottom: "12px" }}>
                                    <h2 style={sectionTitleStyle}>Education</h2>
                                    {education
                                        .filter((e) => e.degree || e.institution)
                                        .map((edu, i) => (
                                            <div key={i} style={{ marginBottom: "4px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                    <span style={{ fontWeight: 700 }}>{edu.degree}{edu.institution ? `, ${edu.institution}` : ""}</span>
                                                    <span style={{ fontWeight: 400 }}>{edu.fromYear && edu.toYear ? `${edu.fromYear} – ${edu.toYear}` : edu.fromYear || edu.toYear || ""}</span>
                                                </div>
                                                {edu.cgpa && <div style={{ fontStyle: "italic" }}>Cumulative GPA: {edu.cgpa}</div>}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Skills */}
                            {(skills.programmingLanguages || skills.frontendBackend || skills.tools) && (
                                <div style={{ marginBottom: "12px" }}>
                                    <h2 style={sectionTitleStyle}>Skills</h2>
                                    <div style={{ fontSize: "10pt" }}>
                                        {skills.programmingLanguages && (
                                            <div style={{ marginBottom: "2px" }}>
                                                <span style={{ fontWeight: 700 }}>Technical Skills: </span> {skills.programmingLanguages}
                                            </div>
                                        )}
                                        {skills.frontendBackend && (
                                            <div style={{ marginBottom: "2px" }}>
                                                <span style={{ fontWeight: 700 }}>Frontend & Backend: </span> {skills.frontendBackend}
                                            </div>
                                        )}
                                        {skills.tools && (
                                            <div>
                                                <span style={{ fontWeight: 700 }}>Build and Tools: </span> {skills.tools}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {projects.some((p) => p.title) && (
                                <div style={{ marginBottom: "12px" }}>
                                    <h2 style={sectionTitleStyle}>Projects</h2>
                                    {projects
                                        .filter((p) => p.title)
                                        .map((proj, i) => (
                                            <div key={i} style={{ marginBottom: "8px" }}>
                                                <div style={{ fontWeight: 700, marginBottom: "2px" }}>{proj.title}</div>
                                                {(proj.description || proj.technologies) && (
                                                    <ul style={{ paddingLeft: "20px", margin: "0", listStyleType: "disc" }}>
                                                        {proj.description && proj.description.split(/[.\n]/).filter(line => line.trim()).slice(0, 8).map((line, j) => (
                                                            <li key={j} style={{ marginBottom: "2px" }}>{line.trim()}.</li>
                                                        ))}
                                                        {proj.technologies && (
                                                            <li style={{ fontStyle: "italic" }}>Tech Stack: {proj.technologies}</li>
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                </div>
                            )}

                            {/* Achievements */}
                            {achievements.some((a) => a.trim()) && (
                                <div style={{ marginBottom: "12px" }}>
                                    <h2 style={sectionTitleStyle}>Achievements / Certifications</h2>
                                    <ul style={{ paddingLeft: "20px", margin: 0 }}>
                                        {achievements
                                            .filter((a) => a.trim())
                                            .map((ach, i) => (
                                                <li key={i} style={{ marginBottom: "2px" }}>{ach}</li>
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
    color: "#000000",
    textTransform: "uppercase",
    borderBottom: "1px solid #000000",
    paddingBottom: "1px",
    marginBottom: "5px",
    marginTop: "10px",
};
