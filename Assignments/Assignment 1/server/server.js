const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 8000;

const overview = { 
    summary: "Passionate software developer with expertise in React and Node.js.",
    strengths: "Problem-solving, teamwork, and continuous learning.",
    goals: "To contribute to innovative projects and grow as a full-stack developer."
};
const education = [
    { degree: "B.Sc. Computer Science", institution: "University of Guelph", year: "2022" },
    { degree: "M.Sc. Software Engineering", institution: "University of Guelph", year: "2025" }
];
const experience = [
    { role: "Frontend Developer", company: "Tech Corp", year: "2023-Present", responsibilities: "Developed user interfaces, optimized performance, and collaborated with designers." },
    { role: "Intern", company: "Startup Ltd", year: "2022-2023", responsibilities: "Assisted in debugging, implemented new features, and participated in code reviews." }
];
const skills = [
    { name: "JavaScript", proficiency: "Advanced" },
    { name: "React", proficiency: "Advanced" },
    { name: "Node.js", proficiency: "Intermediate" },
    { name: "HTML", proficiency: "Advanced" },
    { name: "CSS", proficiency: "Advanced" },
    { name: "Git", proficiency: "Intermediate" }
];
const projects = [
    { name: "E-commerce Platform", description: "An online store with payment integration.", technologies: "React, Node.js, Stripe API", contributions: "Implemented product pages and payment gateway." },
    { name: "Personal Finance Tracker", description: "A finance tracking app using JavaScript.", technologies: "JavaScript, HTML, CSS", contributions: "Developed core logic and user interface." }
];

app.get('/getOverview', (req, res) => res.json(overview));
app.get('/getEdu', (req, res) => res.json(education));
app.get('/getExp', (req, res) => res.json(experience));
app.get('/getSkills', (req, res) => res.json(skills));
app.get('/getProjects', (req, res) => res.json(projects));

app.listen(PORT, () => {});