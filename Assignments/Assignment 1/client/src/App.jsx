import { useState, useEffect } from 'react';

function App() {
    const [overviewData, setOverviewData] = useState(null);
    const [educationData, setEducationData] = useState([]);
    const [experienceData, setExperienceData] = useState([]);
    const [skillsData, setSkillsData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/getOverview').then(res => res.json()).then(data => setOverviewData(data)).catch(() => {});
        fetch('http://localhost:8000/getEdu').then(res => res.json()).then(data => setEducationData(data)).catch(() => {});
        fetch('http://localhost:8000/getExp').then(res => res.json()).then(data => setExperienceData(data)).catch(() => {});
        fetch('http://localhost:8000/getSkills').then(res => res.json()).then(data => setSkillsData(data)).catch(() => {});
        fetch('http://localhost:8000/getProjects').then(res => res.json()).then(data => setProjectsData(data)).catch(() => {});
    }, []);

    if (!overviewData) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Ashok Ananth</h1>
                <p>437-778-1539 | ashokgr88@gmail.com</p>
            </div>
            <div className="content">
                <div className="overview">
                    <h2>Overview</h2>
                    <p>{overviewData.summary}</p>
                    <p><strong>Key Strengths:</strong> {overviewData.strengths}</p>
                    <p><strong>Career Goals:</strong> {overviewData.goals}</p>
                </div>
                <div className="experience">
                    <h2>Experience</h2>
                    {experienceData.map((exp, index) => (
                        <div key={index}>
                            <h3>{exp.role}</h3>
                            <p>{exp.company}, {exp.year}</p>
                            <p><strong>Responsibilities:</strong> {exp.responsibilities}</p>
                        </div>
                    ))}
                </div>
                <div className="projects">
                    <h2>Projects</h2>
                    {projectsData.map((project, index) => (
                        <div key={index}>
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <p><strong>Technologies Used:</strong> {project.technologies}</p>
                            <p><strong>Key Contributions:</strong> {project.contributions}</p>
                        </div>
                    ))}
                </div>
                <div className="skills">
                    <h2>Skills</h2>
                    <ul>
                        {skillsData.map((skill, index) => (
                            <li key={index}>
                                <strong>{skill.name}:</strong> {skill.proficiency}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="education">
                    <h2>Education</h2>
                    {educationData.map((edu, index) => (
                        <div key={index}>
                            <h3>{edu.degree}</h3>
                            <p>{edu.institution}, {edu.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;