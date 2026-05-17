import { Project, Skill, Experience, Education } from "@/types";

export const projects: Project[] = [
  {
    id: "riceguard",
    title: "RiceGuard",
    description:
      "Real-time rice leaf disease detection and pesticide advisory app using PyTorch CNNs and ML. Features a Django Python backend with a native Android mobile app built in Android Studio for image analysis, disease identification, and crop protection recommendations.",
    features: [
      "On-device leaf image capture & disease classification",
      "PyTorch CNN model trained for high-accuracy detection",
      "Tailored pesticide & crop-protection recommendations",
      "Django REST backend serving the native Android app",
    ],
    tech: ["Python", "Django", "PyTorch", "Android", "Java", "Machine Learning"],
    category: "mobile",
    featured: true,
  },
  {
    id: "school-erp",
    title: "School ERP System",
    description:
      "Comprehensive school administration platform digitizing enrollment, attendance, staff management, timetable scheduling, fee collection, and performance reporting. Features role-based access for admins, teachers, and students with real-time dashboards.",
    features: [
      "Role-based access for admins, teachers & students",
      "Attendance, timetable & staff management modules",
      "Fee collection with automated enrollment workflows",
      "Real-time performance & reporting dashboards",
    ],
    tech: ["Angular", "TypeScript", "Node.js", "SQL", "Tailwind CSS"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "report-builder",
    title: "School Report Builder",
    description:
      "Dynamic report builder for generating customized school reports including student progress cards, exam result sheets, and academic summaries. Teachers can configure templates, apply grading logic, and export printable reports.",
    features: [
      "Drag-and-configure report template builder",
      "Custom grading logic & rule engine",
      "Progress cards, result sheets & academic summaries",
      "One-click export to printable PDF",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "SQL"],
    category: "fullstack",
    featured: true,
  },
  {
    id: "bus-tracking",
    title: "Student Bus Tracking",
    description:
      "Real-time school bus monitoring application tracking pick-up/drop-off operations, assigned routes, student boarding status, and live location updates for parents and administrators.",
    features: [
      "Live GPS bus location for parents & admins",
      "Pick-up / drop-off boarding status tracking",
      "Route assignment & management",
      "Instant arrival & boarding notifications",
    ],
    tech: ["React", "Node.js", "SQL", "TypeScript", "Tailwind CSS"],
    category: "fullstack",
    featured: false,
  },
  {
    id: "finance-system",
    title: "Finance Management System",
    description:
      "Kissflow-inspired school finance platform covering end-to-end workflows — fee collection, invoice generation, expense management, and reporting with configurable multi-step approval chains and role-based access.",
    features: [
      "Configurable multi-step approval chains",
      "Fee collection & automated invoice generation",
      "Expense management with audit reporting",
      "Role-based financial access controls",
    ],
    tech: ["React", "Node.js", "SQL", "TypeScript", "Tailwind CSS"],
    category: "fullstack",
    featured: false,
  },
];

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "SiReact", level: 90, category: "frontend" },
  { name: "Angular", icon: "SiAngular", level: 85, category: "frontend" },
  { name: "TypeScript", icon: "SiTypescript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", icon: "SiTailwindcss", level: 92, category: "frontend" },
  { name: "HTML/CSS", icon: "SiHtml5", level: 95, category: "frontend" },
  // Backend
  { name: "Node.js", icon: "SiNodedotjs", level: 80, category: "backend" },
  { name: "Express.js", icon: "SiExpress", level: 78, category: "backend" },
  { name: "SQL", icon: "SiMysql", level: 80, category: "backend" },
  { name: "Python", icon: "SiPython", level: 72, category: "backend" },
  { name: "Django", icon: "SiDjango", level: 65, category: "backend" },
  // Tools
  { name: "Git", icon: "SiGit", level: 85, category: "tools" },
  { name: "GitHub", icon: "SiGithub", level: 85, category: "tools" },
  { name: "Android Studio", icon: "SiAndroidstudio", level: 60, category: "tools" },
  // Languages
  { name: "JavaScript", icon: "SiJavascript", level: 88, category: "language" },
  { name: "C", icon: "SiC", level: 75, category: "language" },
  { name: "Java", icon: "SiJava", level: 65, category: "language" },
];

export const experience: Experience[] = [
  {
    company: "Mograsys Technology Pvt. Ltd.",
    role: "Full Stack Developer",
    period: "Oct 2025 – May 2026",
    location: "Goa, India",
    description: [
      "Developed and maintained dynamic, responsive web applications using Angular and React, building reusable component libraries and implementing state management for scalable frontend architectures.",
      "Designed Tailwind CSS-based UI components ensuring consistent, mobile-first design across all application modules, improving UX and page load performance.",
      "Built and optimized RESTful APIs using Node.js and Express.js, handling authentication, middleware, and seamless front-to-back communication.",
      "Wrote complex SQL queries for data retrieval and reporting; collaborated with the team to design efficient relational database schemas.",
      "Participated in Agile sprints, code reviews, and daily stand-ups, contributing to on-time feature delivery.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "Canara Engineering College",
    degree: "B.E in Computer Science and Business Systems",
    period: "Dec 2021 – July 2025",
    location: "Bantwal, Mangalore, India",
    score: "CGPA: 9.13 | 9th State Rank (VTU) | Semester Topper (4th, 5th, 6th Sem)",
  },
  {
    institution: "M.E.S Pre-University College",
    degree: "Pre-University (Karnataka Board)",
    period: "Jun 2019 – May 2021",
    location: "Sirsi, India",
    score: "85.33%",
  },
  {
    institution: "Don Bosco High School",
    degree: "Secondary Education (KSEEB)",
    period: "May 2016 – May 2019",
    location: "Sirsi, India",
    score: "92.48%",
  },
];