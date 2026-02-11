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
  summary: [
    "Specializing in .NET development, AI, and industrial connectivity, I act as the technical bridge between management software (ERP) and smart production equipment.",
    "I design, develop (from scratch), and maintain complex communication drivers to automate and optimize production lines.",
    { type: 'bold', content: "🔹 .NET & AI Development:" },
    "I master the .NET ecosystem (ASP.NET, Blazor, WPF) to create REST APIs and real-time services (SignalR). I actively integrate AI services (Azure AI, ML.NET, OpenAI models) to develop solutions for predictive maintenance, workflow optimization, and computer vision.",
    { type: 'bold', content: "🔹 Industrial Connectivity:" },
    "My core expertise is interfacing with industrial equipment via specific protocols (Modbus, ZPL, proprietary protocols from Bizerba, Precia).",
    { type: 'bold', content: "🔹 Full Stack & DevOps:" },
    "I work across the entire technical scope: from database design (SQL) to solution integration, deployment, and program maintenance."
  ],
  skills: [
    "C#",
    ".NET (Core, Framework)",
    "ASP.NET (REST API, MVC)",
    "Blazor",
    "WPF",
    "SQL (Oracle, MySQL, MariaDB)",
    "Docker",
    "Artificial Intelligence (AI)",
    "Industrial Protocols (Modbus, ZPL)",
    "Git",
    "Agile Methods",
    "JavaScript",
    "React.js",
  ],
  experience: [
    {
      role: "Industrial Pilot Developer & Support",
      company: "Adour Gestion Informatique",
      period: "2023 - Present",
      details: [
        "Development and support for drivers for agro-industrial machines (scales, printers, robots).",
        "Designing tools and conducting R&D in AI using Docker, Oracle, ASP.NET, and Blazor.",
        "Technological watch and prototyping on the integration of AI services (.NET) for predictive maintenance of industrial equipment.",
      ],
    },
    {
      role: "Software Developer",
      company: "Adour Gestion Informatique",
      period: "Mar 2023 - Aug 2023",
      details: [
        "Rapidly upskilled in the .NET ecosystem within an industrial context.",
        "Participated in the development of software applications in C# and VB.NET.",
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
      description: "A web-based 'interactive terminal' to showcase my CV (this very project!).",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://theoutzider.github.io/CV-Portfolio/",
    },
    {
      name: "SuperDemoReact",
      description: "A JavaScript application for a 'technical demo', this is my first project.",
      tech: ["React.js"],
      link: "https://theoutzider.github.io/SuperDemoReact",
    },
    {
      name: "SRD Chroniques Oubliées Fantasy 2",
      description: "A .NET MAUI application for managing RPG campaigns and teams based on the COF2 ruleset.",
      tech: [".Net", "C#", "MAUI", "BLAZOR", "SQLite"],
      link: "https://github.com/TheOutzider/SRDCOF2MAUI",
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
