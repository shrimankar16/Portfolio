export type CandidateCategory = "web" | "data" | "other";

export type Classification = {
  category: CandidateCategory;
  reason: string;
};

// Data-science keywords that (combined with a Python/Jupyter primary language)
// push a repo into the Data Science bucket.
const DATA_KEYWORDS = [
  "machine learning",
  "ml",
  "data",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "scikit",
  "analysis",
  "model",
  "dataset",
  "nlp",
  "computer vision",
  "recommender",
  "forecast",
  "prediction",
  "dashboard",
  "analytics",
  "fraud",
];

const DATA_LANGUAGES = new Set(["python", "jupyter notebook", "r"]);

const WEB_LANGUAGES = new Set([
  "javascript",
  "typescript",
  "html",
  "css",
  "php",
  "vue",
]);

const WEB_TOPICS = [
  "react",
  "nextjs",
  "frontend",
  "backend",
  "api",
  "website",
  "webapp",
  "front-end",
  "back-end",
  "fullstack",
];

const DATASCI_LANGUAGES = new Set([
  "python",
  "jupyter notebook",
  "r",
  "pandas",
]);

function normalize(s: string | undefined | null): string {
  return (s ?? "").toLowerCase().trim();
}

/**
 * Classify a repo into Web / Data Science / Other using the rules in the spec.
 * `primaryLanguage` is the repo's dominant language (from the API).
 * `languages` is the full per-repo language byte breakdown (optional).
 */
export function classifyRepo(input: {
  name: string;
  description?: string | null;
  primaryLanguage?: string | null;
  topics?: string[];
  readme?: string | null;
  languageBytes?: Record<string, number> | null;
}): Classification {
  const { primaryLanguage } = input;
  const lang = normalize(primaryLanguage);
  const text = normalize(
    [input.name, input.description, (input.topics ?? []).join(" "), input.readme].join(" ")
  );
  const topics = (input.topics ?? []).map(normalize);

  const hasDataKeyword = DATA_KEYWORDS.some((k) => text.includes(k));
  const hasWebTopic = WEB_TOPICS.some((t) => topics.includes(t));

  const isDataLang = DATA_LANGUAGES.has(lang);
  const isWebLang = WEB_LANGUAGES.has(lang);

  // Rule 1: Data Science if Python/R/Jupyter AND data keywords present.
  if (isDataLang && hasDataKeyword) {
    return { category: "data", reason: "Python/Jupyter repo with data/ML keywords" };
  }

  // Rule 2: Web Development if JS/TS/HTML/CSS/PHP/Vue or web topics.
  if (isWebLang || hasWebTopic) {
    return { category: "web", reason: "Web language or frontend/backend topic present" };
  }

  // Rule 3: repo matches both -> decide by language byte majority.
  const bytes = input.languageBytes;
  if (bytes && Object.keys(bytes).length > 0) {
    let dataBytes = 0;
    let webBytes = 0;
    for (const [l, b] of Object.entries(bytes)) {
      const ln = normalize(l);
      if (DATASCI_LANGUAGES.has(ln)) dataBytes += b;
      else if (WEB_LANGUAGES.has(ln)) webBytes += b;
    }
    if (dataBytes > 0 && dataBytes >= webBytes && hasDataKeyword) {
      return { category: "data", reason: "Language byte majority favours data/ML stack" };
    }
    if (webBytes > dataBytes && (isWebLang || hasWebTopic)) {
      return { category: "web", reason: "Language byte majority favours web stack" };
    }
  }

  // Fallback: data language with any data-ish repo name, else Other.
  if (isDataLang) {
    return { category: "data", reason: "Primary language is a data/ML language" };
  }

  return { category: "other", reason: "No clear match" };
}

// ----- Skills / keyword extraction -----

const SKILL_LEXICON = [
  "python", "javascript", "typescript", "html", "css", "java", "php", "c#", "c++", "go", "rust",
  "react", "react native", "next.js", "nextjs", "vue", "angular", "svelte", "tailwind css",
  "tailwind", "redux", "node.js", "nodejs", "express", "django", "flask", "fastapi",
  "postgresql", "postgres", "mysql", "mongodb", "sqlite", "sql",
  "tensorflow", "pytorch", "scikit-learn", "scikit", "keras", "pandas", "numpy", "matplotlib",
  "seaborn", "machine learning", "deep learning", "data science", "data analysis", "nlp",
  "computer vision", "opencv", "llm", "langchain", "agent", "chatbot", "recommender",
  "aws", "docker", "kubernetes", "git", "github actions", "graphql", "rest api", "rest",
  "redis", "kafka", "airflow", "power bi", "tableau", "excel",
];

/**
 * Extract known skill terms from free text (repo READMEs or pasted LinkedIn text).
 * Returns a deduplicated list, case-preserving the canonical form.
 */
export function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const term of SKILL_LEXICON) {
    if (lower.includes(term)) {
      found.push(canonicalSkill(term));
    }
  }
  return dedupe(found);
}

export function canonicalSkill(term: string): string {
  const map: Record<string, string> = {
    nextjs: "Next.js",
    "next.js": "Next.js",
    react: "React",
    "tailwind css": "Tailwind CSS",
    tailwind: "Tailwind CSS",
    "node.js": "Node.js",
    nodejs: "Node.js",
    express: "Express",
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    "machine learning": "Machine Learning",
    "deep learning": "Deep Learning",
    "data science": "Data Science",
    "data analysis": "Data Analysis",
    "computer vision": "Computer Vision",
    tensorflow: "TensorFlow",
    pytorch: "PyTorch",
    "scikit-learn": "scikit-learn",
    scikit: "scikit-learn",
    postgresql: "PostgreSQL",
    postgres: "PostgreSQL",
    mongodb: "MongoDB",
    redis: "Redis",
    docker: "Docker",
    kubernetes: "Kubernetes",
  };
  return map[term] ?? map[term.toLowerCase()] ?? term;
}

export function dedupe<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/**
 * Merge skills from multiple sources and de-duplicate while preserving order.
 */
export function mergeSkills(...sources: string[][]): string[] {
  return dedupe(sources.flat().filter(Boolean));
}

/** Group a flat skill list into the canonical groups used on the site. */
export function groupSkills(skills: string[]): { name: string; items: string[] }[] {
  const groups = [
    { name: "Languages", match: ["Python", "JavaScript", "TypeScript", "HTML", "CSS", "Java", "PHP", "C#", "C++", "Go", "Rust", "SQL"] },
    { name: "Frontend", match: ["React", "React Native", "Next.js", "Vue", "Angular", "Svelte", "Tailwind CSS", "Redux"] },
    { name: "Backend", match: ["Node.js", "Express", "Django", "Flask", "FastAPI", "REST API", "GraphQL"] },
    { name: "Databases", match: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"] },
    { name: "AI / ML", match: ["TensorFlow", "PyTorch", "scikit-learn", "Keras", "pandas", "NumPy", "Matplotlib", "Seaborn", "Machine Learning", "Deep Learning", "Data Science", "Data Analysis", "NLP", "Computer Vision", "OpenCV", "LLM", "LangChain", "Recommender"] },
    { name: "Cloud & DevOps", match: ["AWS", "Docker", "Kubernetes", "Git", "GitHub Actions", "Airflow"] },
  ];
  const grouped: { name: string; items: string[] }[] = [];
  for (const g of groups) {
    const items = skills.filter((s) => g.match.some((m) => s.toLowerCase() === m.toLowerCase()));
    if (items.length) grouped.push({ name: g.name, items });
  }
  const covered = new Set(grouped.flatMap((g) => g.items));
  const rest = skills.filter((s) => !covered.has(s));
  if (rest.length) grouped.push({ name: "Other", items: rest });
  return grouped;
}
