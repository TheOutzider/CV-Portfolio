import type { CVData } from './cv-data';

export const cvDataFR: CVData = {
  name: "Romain Tastet",
  summary: [
    "Spécialisé dans le développement .NET, l'IA et la connectivité industrielle, je suis le pont technique entre les logiciels de gestion (ERP) et les équipements de production intelligents.",
    "Je conçois, développe (from scratch) et maintiens des pilotes de communication complexes pour automatiser et optimiser les chaînes de production.",
    { type: 'bold', content: "🔹 Développement .NET & IA :" },
    "Je maîtrise l'écosystème .NET (ASP.NET, Blazor, WPF) pour créer des API-Rest et des services temps-réel (SignalR). J'intègre activement des services d'IA (Azure AI, ML.NET, modèles OpenAI) pour développer des solutions de maintenance prédictive, d'optimisation de flux ou de vision par ordinateur.",
    { type: 'bold', content: "🔹 Connectivité Industrielle :" },
    "Mon cœur de métier est l'interfaçage avec des équipements industriels via des protocoles spécifiques (Modbus, ZPL, protocoles propriétaires Bizerba, Precia).",
    { type: 'bold', content: "🔹 Full Stack & DevOps :" },
    "J'interviens sur l'ensemble du périmètre technique : de la conception de la base de données (SQL) à l'intégration et au déploiement de solutions, et maintenance du programme."
  ],
  skills: [
    "C#",
    ".NET (Core, Framework)",
    "ASP.NET (API REST, MVC)",
    "Blazor",
    "WPF",
    "SQL (Oracle, MySQL, MariaDB)",
    "Docker",
    "Intelligence Artificielle (IA)",
    "Protocoles Industriels (Modbus, ZPL)",
    "Git",
    "Méthodes Agiles",
    "JavaScript",
    "React.js",
  ],
  experience: [
    {
      role: "Développeur Pilote Industriel & Support",
      company: "Adour Gestion Informatique",
      period: "2023 - Aujourd'hui",
      details: [
        "Développement et support de pilotes pour machines agro-industrielles (balances, imprimantes, robots).",
        "Conception d'outils et R&D en IA avec Docker, Oracle, ASP.NET et Blazor.",
        "Veille technologique et prototypage sur l'intégration de services d'IA (.NET) pour la maintenance prédictive.",
      ],
    },
    {
      role: "Développeur Logiciels",
      company: "Adour Gestion Informatique",
      period: "mars 2023 - août 2023",
      details: [
        "Montée en compétences rapide sur l'écosystème .NET dans un contexte industriel.",
        "Participation au développement d'applications logicielles en C# et VB.NET.",
      ],
    },
    {
        role: "Technicien Informatique",
        company: "DoctorIT",
        period: "2018 - 2019",
        details: [
            "Maintenance matérielle et logicielle, réparation de smartphones.",
            "Gestion des stocks et support client.",
        ],
      },
      {
        role: "Technicien Informatique",
        company: "Groupe LDLC",
        period: "2016 - 2017",
        details: [
            "Support technique, installation de logiciels et maintenance de matériel informatique.",
            "Assistance et conseil à la clientèle.",
        ],
      },
  ],
  projects: [
    {
      name: "Terminal de Portfolio",
      description: "Un 'terminal interactif' basé sur le web pour présenter mon CV (ce projet !).",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      link: "https://theoutzider.github.io/CV-Portfolio/",
    },
    {
      name: "SuperDemoReact",
      description: "Une application Javascript type 'demo technique', c'est mon premier projet.",
      tech: ["React.js"],
      link: "https://theoutzider.github.io/SuperDemoReact",
    },
    {
      name: "SRD Chroniques Oubliées Fantasy 2",
      description: "Une application MAUI .Net de gestion de campagne et d'équipe de JDR sur la base des règles de COF2.",
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
