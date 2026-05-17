export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
  category: "fullstack" | "mobile" | "frontend" | "backend";
  featured?: boolean;
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "tools" | "language";
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  location: string;
  score: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";