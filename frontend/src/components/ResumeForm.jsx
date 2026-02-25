import { Plus, Trash2, GraduationCap, Briefcase, Award, Wrench, User, FileText, Github, ExternalLink } from "lucide-react";

const sectionClass =
    "bg-[#fafafa] rounded-lg border-l-4 border-l-[var(--color-primary)] border border-[var(--color-border-light)] p-6 shadow-sm";

const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-white border border-[var(--color-border-light)] text-[var(--color-text-light)] placeholder:text-[var(--color-muted-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-sm";

const labelClass =
    "block text-sm font-bold text-[var(--color-text-light)] mb-1.5";

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
            <Icon size={16} className="text-[var(--color-primary)]" />
        </div>
        <h3 className="font-bold text-lg text-[var(--color-text-light)]">
            {title}
        </h3>
    </div>
);

const AddButton = ({ onClick, label }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 text-sm text-[var(--color-primary)] font-semibold hover:opacity-70 transition-all mt-4 cursor-pointer"
    >
        <Plus size={16} />
        {label}
    </button>
);

const RemoveButton = ({ onClick, label }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 text-sm text-[var(--color-danger)] font-medium hover:opacity-70 transition-all mt-3 cursor-pointer px-3 py-1.5 rounded-full border border-[var(--color-danger)]/30 hover:bg-red-50"
    >
        <Trash2 size={14} />
        {label}
    </button>
);

export default function ResumeForm({ resumeData, setResumeData }) {
    const update = (field, value) => {
        setResumeData((prev) => ({ ...prev, [field]: value }));
    };

    const updatePersonal = (field, value) => {
        setResumeData((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value },
        }));
    };

    // Education
    const addEducation = () => {
        update("education", [
            ...resumeData.education,
            { degree: "", fieldOfStudy: "", institution: "", location: "", fromYear: "", toYear: "", cgpa: "" },
        ]);
    };
    const removeEducation = (index) => {
        update(
            "education",
            resumeData.education.filter((_, i) => i !== index)
        );
    };
    const updateEducation = (index, field, value) => {
        const updated = [...resumeData.education];
        updated[index] = { ...updated[index], [field]: value };
        update("education", updated);
    };

    // Projects
    const addProject = () => {
        update("projects", [
            ...resumeData.projects,
            { title: "", description: "", technologies: "", githubLink: "", liveLink: "" },
        ]);
    };
    const removeProject = (index) => {
        update(
            "projects",
            resumeData.projects.filter((_, i) => i !== index)
        );
    };
    const updateProject = (index, field, value) => {
        const updated = [...resumeData.projects];
        updated[index] = { ...updated[index], [field]: value };
        update("projects", updated);
    };

    // Achievements
    const addAchievement = () => {
        update("achievements", [...resumeData.achievements, ""]);
    };
    const removeAchievement = (index) => {
        update(
            "achievements",
            resumeData.achievements.filter((_, i) => i !== index)
        );
    };
    const updateAchievement = (index, value) => {
        const updated = [...resumeData.achievements];
        updated[index] = value;
        update("achievements", updated);
    };

    return (
        <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Personal Information */}
            <div className={sectionClass}>
                <SectionHeader icon={User} title="Personal Information" />
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                            className={inputClass}
                            placeholder="John Doe"
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => updatePersonal("fullName", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Email</label>
                            <input
                                className={inputClass}
                                type="email"
                                placeholder="john@example.com"
                                value={resumeData.personalInfo.email}
                                onChange={(e) => updatePersonal("email", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Phone</label>
                            <input
                                className={inputClass}
                                placeholder="+1 234 567 8900"
                                value={resumeData.personalInfo.phone}
                                onChange={(e) => updatePersonal("phone", e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>LinkedIn</label>
                            <input
                                className={inputClass}
                                placeholder="linkedin.com/in/johndoe"
                                value={resumeData.personalInfo.linkedin}
                                onChange={(e) => updatePersonal("linkedin", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>GitHub</label>
                            <input
                                className={inputClass}
                                placeholder="github.com/johndoe"
                                value={resumeData.personalInfo.github}
                                onChange={(e) => updatePersonal("github", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Summary */}
            <div className={sectionClass}>
                <SectionHeader icon={FileText} title="Professional Summary" />
                <textarea
                    className={`${inputClass} min-h-[80px] resize-none`}
                    placeholder="A brief professional summary highlighting your key skills and experience..."
                    value={resumeData.professionalSummary}
                    onChange={(e) => update("professionalSummary", e.target.value)}
                    rows={3}
                />
            </div>

            {/* Education */}
            <div className={sectionClass}>
                <SectionHeader icon={GraduationCap} title="Education" />
                {resumeData.education.map((edu, index) => (
                    <div
                        key={index}
                        className="relative p-5 mb-4 rounded-lg bg-white border border-[var(--color-border-light)] animate-slide-in"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>School/University</label>
                                <input
                                    className={inputClass}
                                    placeholder="Stanford University"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Degree</label>
                                    <input
                                        className={inputClass}
                                        placeholder="Master of Business"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Field of Study</label>
                                    <input
                                        className={inputClass}
                                        placeholder="Technology Management"
                                        value={edu.fieldOfStudy || ""}
                                        onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>Location</label>
                                    <input
                                        className={inputClass}
                                        placeholder="Stanford, CA"
                                        value={edu.location || ""}
                                        onChange={(e) => updateEducation(index, "location", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Start Date</label>
                                    <input
                                        className={inputClass}
                                        placeholder="2014"
                                        value={edu.fromYear}
                                        onChange={(e) => updateEducation(index, "fromYear", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>End Date (or leave blank if current)</label>
                                    <input
                                        className={inputClass}
                                        placeholder="2016"
                                        value={edu.toYear}
                                        onChange={(e) => updateEducation(index, "toYear", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>GPA (Optional)</label>
                                    <input
                                        className={inputClass}
                                        placeholder="3.8"
                                        value={edu.cgpa}
                                        onChange={(e) => updateEducation(index, "cgpa", e.target.value)}
                                    />
                                </div>
                            </div>
                            <RemoveButton onClick={() => removeEducation(index)} label="Remove Education" />
                        </div>
                    </div>
                ))}
                <AddButton onClick={addEducation} label="Add Education" />
            </div>

            {/* Projects */}
            <div className={sectionClass}>
                <SectionHeader icon={Briefcase} title="Projects" />
                {resumeData.projects.map((project, index) => (
                    <div
                        key={index}
                        className="relative p-5 mb-4 rounded-lg bg-white border border-[var(--color-border-light)] animate-slide-in"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className={labelClass}>Title</label>
                                <input
                                    className={inputClass}
                                    placeholder="Project Title"
                                    value={project.title}
                                    onChange={(e) => updateProject(index, "title", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Description</label>
                                <textarea
                                    className={`${inputClass} resize-none`}
                                    placeholder={"Enter each point on a new line\nBuilt a full-stack app using React and Node.js\nImplemented authentication with JWT"}
                                    value={project.description}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Technologies Used</label>
                                <input
                                    className={inputClass}
                                    placeholder="React, Node.js, MongoDB"
                                    value={project.technologies}
                                    onChange={(e) => updateProject(index, "technologies", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        <span className="flex items-center gap-1"><Github size={12} /> GitHub Link</span>
                                    </label>
                                    <input
                                        className={inputClass}
                                        placeholder="github.com/user/project"
                                        value={project.githubLink}
                                        onChange={(e) => updateProject(index, "githubLink", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        <span className="flex items-center gap-1"><ExternalLink size={12} /> Live Link</span>
                                    </label>
                                    <input
                                        className={inputClass}
                                        placeholder="myproject.vercel.app"
                                        value={project.liveLink}
                                        onChange={(e) => updateProject(index, "liveLink", e.target.value)}
                                    />
                                </div>
                            </div>
                            <RemoveButton onClick={() => removeProject(index)} label="Remove Project" />
                        </div>
                    </div>
                ))}
                <AddButton onClick={addProject} label="Add Project" />
            </div>

            {/* Skills */}
            <div className={sectionClass}>
                <SectionHeader icon={Wrench} title="Skills" />
                <div className="space-y-4">
                    <div>
                        <label className={labelClass}>Programming Languages</label>
                        <input
                            className={inputClass}
                            placeholder="Java, Python, C++, JavaScript"
                            value={resumeData.skills.programmingLanguages}
                            onChange={(e) =>
                                update("skills", { ...resumeData.skills, programmingLanguages: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Frontend & Backend Technologies</label>
                        <input
                            className={inputClass}
                            placeholder="React, Node.js, Express, MongoDB, HTML, CSS"
                            value={resumeData.skills.frontendBackend}
                            onChange={(e) =>
                                update("skills", { ...resumeData.skills, frontendBackend: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <label className={labelClass}>Tools</label>
                        <input
                            className={inputClass}
                            placeholder="Git, Docker, VS Code, Postman"
                            value={resumeData.skills.tools}
                            onChange={(e) =>
                                update("skills", { ...resumeData.skills, tools: e.target.value })
                            }
                        />
                    </div>
                </div>
            </div>

            {/* Achievements */}
            <div className={sectionClass}>
                <SectionHeader icon={Award} title="Achievements / Certifications" />
                {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 mb-3 animate-slide-in">
                        <input
                            className={`${inputClass} flex-1`}
                            placeholder="Achievement or Certification"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => removeAchievement(index)}
                            className="p-2 rounded-lg text-[var(--color-muted-light)] hover:text-[var(--color-danger)] hover:bg-red-50 transition-all cursor-pointer"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
                <AddButton onClick={addAchievement} label="Add Achievement" />
            </div>
        </div>
    );
}
