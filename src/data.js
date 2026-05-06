// ─── Kumar Milind – Portfolio Data (sourced from CV: 12219782_KumarMilind.pdf) ───

export const personal = {
  name: "Kumar Milind",
  role: "Full Stack Developer",
  tagline: "Building scalable, production-ready systems with clean architecture and modern tech.",
  email: "kumarmilind071@gmail.com",
  phone: "+91-6203467908",
  location: "Lohardaga, Jharkhand 835302",
  linkedin: "https://www.linkedin.com/in/kumar-milind",
  github: "https://github.com/kmilind27",
};

export const about = `I'm a Full Stack Developer with hands-on experience building microservice-based systems, responsive SPAs, and AI-integrated web applications. I work across the entire stack — from Spring Boot microservices and RabbitMQ event-driven pipelines to React frontends and Firebase backends. Currently pursuing my B.Tech in Computer Science at Lovely Professional University (CGPA: 8.27), I combine strong fundamentals with real-world project experience to ship production-ready software.`;

export const education = [
  {
    degree: "B.Tech – Computer Science & Engineering",
    school: "Lovely Professional University, Punjab, India",
    year: "2022 – 2026",
    grade: "CGPA: 8.27",
  },
  {
    degree: "Intermediate",
    school: "DAV Public School Hehal, Ranchi, Jharkhand",
    year: "2019 – 2021",
    grade: "Percentage: 89.8%",
  },
];

export const skills = [
  { name: "Java",        icon: "☕", level: 88 },
  { name: "JavaScript", icon: "⚡", level: 85 },
  { name: "Python",     icon: "🐍", level: 78 },
  { name: "C++",        icon: "⚙️", level: 72 },
  { name: "SQL",        icon: "🗄️", level: 80 },
  { name: "Spring Boot",icon: "🍃", level: 85 },
  { name: "React",      icon: "⚛️", level: 82 },
  { name: "REST APIs",  icon: "🔗", level: 87 },
  { name: "Docker",     icon: "🐳", level: 75 },
  { name: "RabbitMQ",   icon: "🐇", level: 70 },
  { name: "MySQL",      icon: "💾", level: 80 },
  { name: "Git",        icon: "🔀", level: 85 },
];

export const projects = [
  {
    title: "TimeFlow – Timesheet & Leave Management",
    emoji: "⏱️",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    description:
      "Full-stack workforce management system with 7 Spring Boot microservices, JWT auth with RBAC, OTP-based password recovery, manager approval workflows, event-driven email notifications via 10 RabbitMQ queues, and full Docker Compose containerisation with Zipkin distributed tracing.",
    tags: ["React", "Spring Boot", "MySQL", "RabbitMQ", "Docker", "JWT", "OpenFeign"],
    demo: "#",
    github: "https://github.com/kmilind27/TimeFlow",
    date: "Mar 2026 – Apr 2026",
  },
  {
    title: "BiteWise – Smart Food Tracker",
    emoji: "🥗",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    description:
      "Smart food tracking web app with meal logging, ingredient inventory management, and AI-powered nutritional analysis using Google's Gemini API for automated macro estimation. Real-time data persistence with Firebase Firestore and anonymous auth.",
    tags: ["HTML", "CSS", "JavaScript", "Firebase", "Node.js", "Express.js", "Gemini AI"],
    demo: "https://kmilind27.github.io/BiteWise/",
    github: "https://github.com/kmilind27/BiteWise",
    date: "Jul 2025",
  },
  {
    title: "Restaurant Website",
    emoji: "🍽️",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    description:
      "Responsive restaurant website with dedicated menu, reservation, about, and contact sections. Features an online reservation system with real-time validation, a backend REST API for data handling, and clear user feedback for booking outcomes.",
    tags: ["React.js", "Node.js", "REST API"],
    demo: "#",
    github: "https://github.com/kmilind27/RestaurantWebApp",
    date: "Jul 2024",
  },
];

export const experience = [
  {
    icon: "💻",
    title: "Full Stack Web Development Training",
    org: "Techvanto Academy",
    date: "Jun 2024 – Jul 2024",
    desc: "Gained hands-on experience building dynamic web applications using HTML, CSS, JavaScript, and back-end technologies. Learned to design, implement, and manage relational databases for efficient data storage, retrieval, and optimisation.",
  },
  {
    icon: "☁️",
    title: "Cloud Computing Certification",
    org: "IIT Kharagpur – NPTEL",
    date: "Jul 2024 – Nov 2024",
    desc: "Completed the NPTEL Cloud Computing course by IIT Kharagpur, covering cloud architecture, virtualisation, distributed systems, and deployment strategies on major cloud platforms.",
  },
  {
    icon: "🤖",
    title: "Salesforce Agentic AI Workshop",
    org: "Salesforce × Lovely Professional University",
    date: "Aug 2025",
    desc: "Gained hands-on exposure to building AI-powered autonomous agents within Salesforce to automate tasks, improve customer interactions, and optimise workflows using Einstein AI capabilities.",
  },
  {
    icon: "🌱",
    title: "Community Development Project",
    org: "The Vegetable Growers Cooperative Society",
    date: "Jun 2023",
    desc: "Collaborated with an NGO on a 2-week community project, gaining hands-on experience in sustainable orchard management and cross-functional teamwork.",
  },
];
