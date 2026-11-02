export const profile = {
  name: "Deepak Prasad S",
  brand: "Deepak Prasad S",
  tagline: "AI Engineer — NLP, GenAI & backend systems",
  role: "AI Engineer",
  location: "Bengaluru, India",
  email: "deepakprasads2005@gmail.com",
  phone: "+91 84316 55703",
  phoneHref: "tel:+918431655703",
  linkedin: "https://www.linkedin.com/in/deepak-prasad-s-678a85270/",
  github: "https://github.com/deepspsd",
  x: "https://x.com/DeepakAppuSV",
  resume: "/Deepak_Prasad_S_Resume.pdf",
  languages: ["English", "Hindi", "Kannada"],
};

export const preloader = {
  kicker: "Welcome to",
  lines: ["Deepak Prasad's", "Portfolio."],
};

export const hero = {
  kicker: "Welcome to my portfolio",
  lines: ["Hi, I'm", "Deepak", "Prasad."],
  intro: [
    "AI engineering undergraduate in Bengaluru building RAG pipelines, real-time speech systems and LLM backends, now an ",
    "Associate AI Developer Intern",
    " at Expora.",
  ],
};

export const about = {
  statement:
    "I design and ship production-grade AI systems: retrieval pipelines over client data, real-time transcription with speaker diarization, and multi-agent LLM backends on FastAPI.",
  detail:
    "Computer Science (AI) undergraduate at Sri Venkateshwara College of Engineering, currently an Associate AI Developer Intern at Expora Database Consultancy Services. Every project is public, documented and reproducible on GitHub.",
  facts: [
    { k: "Based in", v: "Bengaluru, India" },
    { k: "Currently", v: "AI Developer Intern, Expora" },
    { k: "Graduating", v: "B.E. CS (AI), 2027" },
    { k: "Languages", v: "English, Hindi, Kannada" },
  ],
  stats: [
    { n: "Top 50", l: "of 625+ teams, national AI/ML hackathon" },
    { n: "<1 s", l: "first-transcript latency, 99 languages" },
    { n: "~60%", l: "fewer LLM API calls via response caching" },
  ],
};

export type Experience = {
  when: string;
  role: string;
  org: string;
  where: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    when: "Aug 2026 — Present",
    role: "Associate AI Developer Intern",
    org: "Expora Database Consultancy Services",
    where: "Bengaluru, India · On-site",
    current: true,
    bullets: [
      "Designed and built OpenCV-based computer vision systems tailored to client requirements.",
      "Developed RAG-based applications with LLMs and vector search for context-aware answers over client data.",
      "Worked directly with clients to gather requirements and deliver completed, end-to-end applications.",
    ],
    tags: ["OpenCV", "RAG", "LLMs", "Vector search", "Client delivery"],
  },
  {
    when: "2024 — 2026",
    role: "Independent AI Engineer",
    org: "Open-source projects",
    where: "GitHub · github.com/deepspsd",
    bullets: [
      "Shipped three production-grade systems: a real-time voice intelligence platform, a document-intelligence RAG pipeline and Nexora, a multi-agent startup platform.",
      "Engineered speech pipelines with faster-whisper, WhisperX forced alignment, Pyannote 3.1 diarization and a custom Wav2Vec2 overlap classifier.",
      "Published every project with documented READMEs and reproducible pipelines.",
    ],
    tags: ["Python", "FastAPI", "PyTorch", "ChromaDB", "Groq", "React"],
  },
  {
    when: "2024",
    role: "National Hackathon, AI/ML track",
    org: "VoisForTech",
    where: "Pune, India",
    bullets: ["Ranked in the top 50 of 625+ teams nationwide in the AI/ML track."],
    tags: ["Machine learning", "Team build", "Pitch"],
  },
];

export type Project = {
  id: string;
  /** Folder under src/assets/projects/ that holds this project's screenshots. */
  slug: string;
  /** Generated artwork preset for the folder card. */
  art: "aurora" | "ember" | "dusk" | "glacier" | "verdant";
  /** Short name printed on the folder tab. */
  short: string;
  title: string;
  sub: string;
  bullets: string[];
  tags: string[];
  metrics?: { v: string; l: string }[];
  github: string;
  feature?: boolean;
};

export const projects: Project[] = [
  {
    id: "01",
    slug: "voice",
    art: "aurora",
    short: "Voice Platform",
    title: "Real-Time Voice Intelligence Platform",
    sub: "Streaming transcription, speaker diarization and LLM meeting insights.",
    bullets: [
      "Architected real-time transcription over FastAPI WebSockets using faster-whisper with WhisperX forced alignment across 99 languages.",
      "Engineered a multi-speaker diarization pipeline with Pyannote.audio 3.1, Resemblyzer embeddings and a custom Wav2Vec2 overlap classifier.",
      "Integrated Groq LLaMA 3.3-70B for summaries, action items and Q&A, with a React + TypeScript frontend and async model loading for zero cold-start latency.",
    ],
    metrics: [
      { v: "<1 s", l: "first transcript" },
      { v: "95%+", l: "word accuracy" },
      { v: "2×", l: "real-time on CPU" },
    ],
    tags: ["Python", "FastAPI", "React", "WhisperX", "PyTorch", "Groq"],
    github: "https://github.com/deepspsd/Trasncriber-Websocket-Version",
    feature: true,
  },
  {
    id: "02",
    slug: "rag",
    art: "ember",
    short: "RAG Pipeline",
    title: "Production-Grade RAG Pipeline",
    sub: "Document intelligence and PDF Q&A with metadata-filtered retrieval.",
    bullets: [
      "End-to-end RAG system on FastAPI with ChromaDB vector storage, sentence embeddings and metadata-filtered retrieval.",
      "Chunking + overlap strategy with normalized embeddings, improving retrieval precision and reducing context noise for long documents.",
    ],
    tags: ["Python", "FastAPI", "ChromaDB", "Sentence-Transformers", "Vector search"],
    github: "https://github.com/deepspsd/Rag-chatbot",
  },
  {
    id: "03",
    slug: "nexora",
    art: "dusk",
    short: "Nexora",
    title: "Nexora — AI Startup Platform",
    sub: "Five specialised LLM agents that take an idea to a plan in minutes.",
    bullets: [
      "Multi-agent orchestration for ideation, feasibility, competitor analysis, MVP scoping and pitch deck, cutting idea-to-plan from hours to under 2 minutes.",
      "Modular FastAPI microservice backend with prompt pipelines and response caching, reducing redundant LLM calls by ~60%.",
    ],
    tags: ["Python", "FastAPI", "Groq API", "Multi-agent LLM", "Prompt engineering"],
    github: "https://github.com/deepspsd/Nexora",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "C", "SQL", "HTML", "CSS", "JavaScript"] },
  { group: "Machine Learning / AI", items: ["Scikit-learn", "Pandas", "NumPy", "Sentence-Transformers", "NLP", "Prompt Engineering"] },
  { group: "LLM & Generative AI", items: ["HuggingFace Transformers", "RAG Architecture", "Vector Databases", "Groq API"] },
  { group: "Backend & Databases", items: ["FastAPI", "Flask", "MySQL", "MongoDB", "ChromaDB"] },
  { group: "Cloud & DevOps", items: ["Git", "GitHub", "Vercel", "Aiven", "Docker", "CI/CD"] },
  { group: "Speech & Vision", items: ["WhisperX", "faster-whisper", "Pyannote", "Wav2Vec2", "OpenCV"] },
];

export const education = [
  {
    school: "Sri Venkateshwara College of Engineering",
    degree: "B.E. in Computer Science — Artificial Intelligence",
    where: "Bengaluru, India",
    when: "Jul 2023 — Aug 2027",
    score: "7.9",
    scoreLabel: "CGPA",
  },
  {
    school: "Sheshadripuram PU College",
    degree: "Class XII — Science (PCMC)",
    where: "Bengaluru, India",
    when: "May 2021 — Mar 2023",
    score: "82.5%",
    scoreLabel: "Percentage",
  },
];

export const certifications = [
  {
    title: "National Hackathon — VoisForTech, Pune",
    sub: "Top 50 of 625+ teams, AI/ML track (2024)",
    href: "https://drive.google.com/file/d/1iupB7K6IEENWSebXUd4jjV9WUeqO7em1/view?usp=drivesdk",
  },
  {
    title: "Frontend Web Developer",
    sub: "Infosys Springboard certification",
    href: "https://drive.google.com/file/d/1veqehBXxnGRFcK_X5MWOl0xhSP5JKn5g/view?usp=drivesdk",
  },
  {
    title: "Machine Learning Foundations",
    sub: "Infosys Springboard certification",
    href: "https://drive.google.com/file/d/1HYlxSRIDAwwOC1AxkvlHFMHZI3WzTktY/view?usp=drivesdk",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
