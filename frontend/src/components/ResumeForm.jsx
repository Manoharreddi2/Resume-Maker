import { Plus, Trash2, GraduationCap, Briefcase, Award, Wrench, User, FileText, Github, ExternalLink } from "lucide-react";

const sectionClass =
    "bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)] rounded-2xl border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] p-5 shadow-sm";

const inputClass =
    "w-full px-3 py-2.5 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] text-[var(--color-text-light)] dark:text-[var(--color-text-dark)] placeholder:text-[var(--color-muted-light)] dark:placeholder:text-[var(--color-muted-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-sm";

const labelClass =
    "block text-xs font-semibold text-[var(--color-muted-light)] dark:text-[var(--color-muted-dark)] uppercase tracking-wider mb-1.5";

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-[var(--color-primary)]/10">
            <Icon size={16} className="text-[var(--color-primary)]" />
        </div>
        <h3 className="font-semibold text-[var(--color-text-light)] dark:text-[var(--color-text-dark)]">
            {title}
        </h3>
    </div>
);

const AddButton = ({ onClick, label }) => (
    <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-1.5 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] font-medium transition-colors mt-3 cursor-pointer"
    >
        <Plus size={16} />
        {label}
    </button>
);

const RemoveButton = ({ onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="p-1.5 rounded-lg text-[var(--color-muted-light)] hover:text-[var(--color-danger)] hover:bg-red-50 dark:hover:bg-red-900/20 transition-all cursor-pointer"
    >
        <Trash2 size={14} />
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
            { degree: "", institution: "", fromYear: "", toYear: "", cgpa: "" },
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
        <div className="space-y-5 animate-fade-in">
            {/* Personal Information */}
            <div className={sectionClass}>
                <SectionHeader icon={User} title="Personal Information" />
                <div className="space-y-3">
                    <div>
                        <label className={labelClass}>Full Name</label>
                        <input
                            className={inputClass}
                            placeholder="John Doe"
                            value={resumeData.personalInfo.fullName}
                            onChange={(e) => updatePersonal("fullName", e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
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
                    <div className="grid grid-cols-2 gap-3">
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
                        className="relative p-4 mb-3 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] animate-slide-in"
                    >
                        <div className="absolute top-3 right-3">
                            <RemoveButton onClick={() => removeEducation(index)} />
                        </div>
                        <div className="space-y-3 pr-8">
                            <div>
                                <label className={labelClass}>Degree</label>
                                <input
                                    className={inputClass}
                                    placeholder="B.Tech in Computer Science"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Institution</label>
                                <input
                                    className={inputClass}
                                    placeholder="University Name"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className={labelClass}>From</label>
                                    <input
                                        className={inputClass}
                                        placeholder="2021"
                                        value={edu.fromYear}
                                        onChange={(e) => updateEducation(index, "fromYear", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>To</label>
                                    <input
                                        className={inputClass}
                                        placeholder="2025"
                                        value={edu.toYear}
                                        onChange={(e) => updateEducation(index, "toYear", e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>CGPA</label>
                                    <input
                                        className={inputClass}
                                        placeholder="8.5"
                                        value={edu.cgpa}
                                        onChange={(e) => updateEducation(index, "cgpa", e.target.value)}
                                    />
                                </div>
                            </div>
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
                        className="relative p-4 mb-3 rounded-xl bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-dark)] border border-[var(--color-border-light)] dark:border-[var(--color-border-dark)] animate-slide-in"
                    >
                        <div className="absolute top-3 right-3">
                            <RemoveButton onClick={() => removeProject(index)} />
                        </div>
                        <div className="space-y-3 pr-8">
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
                                    placeholder="Brief description of the project..."
                                    value={project.description}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    rows={2}
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
                            <div className="grid grid-cols-2 gap-3">
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
                        </div>
                    </div>
                ))}
                <AddButton onClick={addProject} label="Add Project" />
            </div>

            {/* Skills */}
            <div className={sectionClass}>
                <SectionHeader icon={Wrench} title="Skills" />
                <input
                    className={inputClass}
                    placeholder="React, JavaScript, Python, Docker (comma separated)"
                    value={resumeData.skills.join(", ")}
                    onChange={(e) =>
                        update(
                            "skills",
                            e.target.value.split(",").map((s) => s.trimStart())
                        )
                    }
                />
                {resumeData.skills.filter((s) => s.trim()).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {resumeData.skills
                            .filter((s) => s.trim())
                            .map((skill, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20"
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                    </div>
                )}
            </div>

            {/* Achievements */}
            <div className={sectionClass}>
                <SectionHeader icon={Award} title="Achievements / Certifications" />
                {resumeData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2 animate-slide-in">
                        <input
                            className={`${inputClass} flex-1`}
                            placeholder="Achievement or Certification"
                            value={achievement}
                            onChange={(e) => updateAchievement(index, e.target.value)}
                        />
                        <RemoveButton onClick={() => removeAchievement(index)} />
                    </div>
                ))}
                <AddButton onClick={addAchievement} label="Add Achievement" />
            </div>
        </div>
    );
}
