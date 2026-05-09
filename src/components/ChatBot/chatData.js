// 1. MAIN MENU ACTIONS
export const INITIAL_ACTIONS = [
    "Who is Abdul Basit Nawaz?",
    "Expertise & Tech Stack",
    "Showcase Projects",
    "Recruitment & Hiring",
    "Contact & Socials"
];

// 2. KEYWORD ROUTING MAP (Intent Recognition)
export const KEYWORD_INTENTS = [
    {
        keywords: ["hire", "hiring", "recruitment", "job", "role", "position", "work", "availability", "freelance", "full time", "salary", "rate"],
        responseKey: "Recruitment & Hiring"
    },
    {
        keywords: ["resume", "cv", "profile", "summary", "experience", "history"],
        responseKey: "Resume & Background"
    },
    {
        keywords: ["tech", "stack", "skills", "coding", "languages", "frameworks", "tools", "programming", "python", "react", "node", "javascript", "backend", "frontend", "devops", "ai", "ml"],
        responseKey: "Expertise & Tech Stack"
    },
    {
        keywords: ["projects", "work", "portfolio", "showcase", "apps", "websites", "builds", "reqo", "assistant"],
        responseKey: "Showcase Projects"
    },
    {
        keywords: ["contact", "connect", "message", "talk", "email", "linkedin", "github", "whatsapp", "phone", "social"],
        responseKey: "Contact & Socials"
    }
];

// 3. DEEP-DIVE SUB-KEYWORD MAP (Level 2 Intelligence)
export const SUB_KEYWORD_INTENTS = [
    // Tech Stack Deep Dives
    { keywords: ["frontend", "ui", "ux", "interface"], responseKey: "Frontend Expertise" },
    { keywords: ["backend", "server", "api", "rest", "flask", "django"], responseKey: "Backend Expertise" },
    { keywords: ["database", "db", "sql", "nosql", "mongodb", "mysql", "redis"], responseKey: "Database Expertise" },
    { keywords: ["devops", "cloud", "docker", "aws", "cicd"], responseKey: "DevOps & Cloud" },
    { keywords: ["ai", "ml", "chatbot", "nlp", "gemini", "gpt"], responseKey: "AI & Machine Learning" },
    
    // Contact Deep Dives
    { keywords: ["github", "gh", "repo", "code"], responseKey: "GitHub Link" },
    { keywords: ["linkedin", "li"], responseKey: "LinkedIn Profile" },
    { keywords: ["whatsapp", "wa", "phone"], responseKey: "WhatsApp Contact" },
    { keywords: ["email", "mail"], responseKey: "Email Address" },

    // Recruitment Deep Dives
    { keywords: ["why hire", "value", "strengths"], responseKey: "Why Hire Abdul?" },
    { keywords: ["available", "timezone"], responseKey: "Availability Status" },
    { keywords: ["rate", "cost", "price"], responseKey: "Pricing & Rates" }
];

// 4. THE KNOWLEDGE BASE (Rich Answers)
export const KNOWLEDGE_BASE = {
    "Who is Abdul Basit Nawaz?": "Abdul Basit Nawaz is a high-performance Software Engineer specializing in building scalable systems and AI-driven tools. He focuses on architecting clean, maintainable solutions for complex technical challenges.",
    
    "Resume & Background": "Abdul Basit has a robust background in Full-Stack Engineering, with years of experience building both consumer-facing apps and internal dev tools. You can view his full CV in the Resume section of this portfolio.",
    
    "Expertise & Tech Stack": "He is a multi-disciplinary engineer. Which area are you interested in? (Frontend, Backend, DevOps, or AI?)",
    "Frontend Expertise": "Expert in React, JavaScript (ES6+), GSAP for animations, and modern CSS. He builds smooth, interactive, and responsive user interfaces.",
    "Backend Expertise": "Proficient in Node.js, Python (FastAPI/Django), and architecting RESTful microservices with secure authentication (JWT).",
    "Database Expertise": "Experienced in both SQL (MySQL/PostgreSQL) and NoSQL (MongoDB/Redis) for high-availability data storage.",
    "DevOps & Cloud": "Skilled in Docker, AWS infrastructure, and setting up automated CI/CD pipelines for seamless deployment.",
    "AI & Machine Learning": "Abdul Basit excels at integrating LLMs (Gemini, GPT) into production apps, working with Vector DBs, and building custom NLP assistants.",

    "Showcase Projects": "He has delivered high-impact projects like the Reqo Assistant (AI requirement analyzer) and Terminal-based CI tools. Which project should I detail for you?",
    "Reqo Assistant": "Reqo Assistant is an AI project management tool using NLP to transform raw requirements into actionable tasks. Tech: Python, OpenAI, React.",
    "Portfolio Assistant": "This very chatbot! Built with a deterministic decision-tree logic and GSAP for a premium, zero-latency experience.",

    "Recruitment & Hiring": "Abdul Basit is open to high-impact roles. What details do you need regarding his professional profile?",
    "Why Hire Abdul?": "He brings a 'Scale-First' mindset, deep AI integration expertise, and a track record of building open-source tools with thousands of users.",
    "Availability Status": "Currently open to Full-Time opportunities and high-impact Freelance contracts. Timezone: Flexible for Global teams.",
    "Pricing & Rates": "Rates are discussion-based depending on project scope and impact. Reach out via contact to discuss a custom quote.",

    "Contact & Socials": "How would you like to connect? He is available across all major platforms.",
    "GitHub Link": "You can explore his open-source work at github.com/your-username (replace with actual link).",
    "LinkedIn Profile": "Connect professionally at linkedin.com/in/your-profile (replace with actual link).",
    "Email Address": "Send a direct inquiry to: your-email@example.com",
    "WhatsApp Contact": "Chat directly via WhatsApp: +1234567890"
};

// 5. FOLLOW-UP BRANCHING (The Recursive Tree)
export const FOLLOW_UP_MAP = {
    "Who is Abdul Basit Nawaz?": ["Resume & Background", "Expertise & Tech Stack", "Contact & Socials"],
    "Expertise & Tech Stack": ["Frontend Expertise", "Backend Expertise", "DevOps & Cloud", "AI & Machine Learning"],
    "Showcase Projects": ["Reqo Assistant", "Portfolio Assistant", "GitHub Link"],
    "Recruitment & Hiring": ["Why Hire Abdul?", "Availability Status", "Pricing & Rates"],
    "Contact & Socials": ["LinkedIn Profile", "GitHub Link", "WhatsApp Contact", "Email Address"]
};
