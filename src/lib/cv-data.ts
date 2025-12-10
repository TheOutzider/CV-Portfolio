import { cvDataFR } from './cv-data-fr';

export type Experience = {
  role: string;
  company: string;
  period: string;
  details: string[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  link: string;
};

type SummaryItem = string | { type: 'bold'; content: string };

export type CVData = {
  name: string;
  summary: SummaryItem[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
};

const cvDataEN: CVData = {
  name: "Romain Tastet",
  summary: ["A passionate full-stack developer with a knack for creating elegant solutions in the least amount of time. Experienced in TypeScript, React, Next.js, and Node.js."],
  skills: ["C#", ".NET (Core, Framework)", "ASP.NET (REST API, MVC)", "Blazor", "WPF", "SQL (Oracle, MySQL, MariaDB)", "Docker", "Artificial Intelligence (AI)", "Industrial Protocols (Modbus, ZPL)", "Git", "Agile Methods", "JavaScript", "React.js"],
  experience: [
    {
      role: "Industrial Pilot Developer & Support",
      company: "Adour Gestion Informatique",
      period: "2023 - Present",
      details: [
        "Development and support of drivers for agro-industrial machines (scales, printers, robots).",
        "Design of tools and R&D in AI with Docker, Oracle, ASP.NET, and Blazor.",
        "Technological watch and prototyping on the integration of AI services (.NET) for predictive maintenance.",
      ],
    },
    {
      role: "Software Developer",
      company: "Adour Gestion Informatique",
      period: "Mar 2023 - Aug 2023",
      details: [
        "Rapid skill acquisition in the .NET ecosystem within an industrial context.",
        "Participation in the development of software applications in C# and VB.NET.",
      ],
    },
    {
        role: "IT Technician",
        company: "DoctorIT",
        period: "2018 - 2019",
        details: [
            "Hardware and software maintenance, smartphone repair.",
            "Inventory management and customer support.",
        ],
      },
      {
        role: "IT Technician",
        company: "Groupe LDLC",
        period: "2016 - 2017",
        details: [
            "Technical support, software installation, and computer hardware maintenance.",
            "Customer assistance and advice.",
        ],
      },
  ],
  projects: [
    {
      name: "Portfolio Terminal",
      description: "An interactive web-based terminal to showcase my CV (this project!).",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/user/portfolio",
    },
    {
      name: "E-commerce Platform",
      description: "A full-featured e-commerce platform with a custom CMS.",
      tech: ["Next.js", "GraphQL", "PostgreSQL", "Stripe"],
      link: "https://github.com/user/ecommerce",
    },
  ],
  contact: {
    email: "romain.tastet@gmail.com",
    linkedin: "https://www.linkedin.com/in/romain-tastet-383710244/",
    github: "https://github.com/TheOutzider",
  },
};

export const cvData = {
  en: cvDataEN,
  fr: cvDataFR,
};
