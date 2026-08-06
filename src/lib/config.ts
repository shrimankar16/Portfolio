import fs from "node:fs";
import path from "node:path";

export type ProjectCategory = "web" | "data";

export interface Project {
  id: string;
  name: string;
  description: string;
  category: ProjectCategory;
  featured: boolean;
  githubUrl: string;
  homepage?: string;
  languages: string[];
  topics: string[];
  stars: number;
  updatedAt?: string;
  readme?: string;
}

export interface SkillGroup {
  name: string;
  icon?: string;
  items: string[];
}

export interface Profile {
  name: string;
  role: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
}

export interface SiteConfig {
  meta: {
    githubUsername: string;
    generatedAt?: string;
    lastSetupRun?: string | null;
  };
  profile: Profile;
  projects: Project[];
  skills: SkillGroup[];
  linkedinPastedText?: string;
}

const CONFIG_PATH =
  process.env.PROJECTS_CONFIG_PATH ??
  path.join(process.cwd(), "projects.config.json");

export function loadConfig(): SiteConfig {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw) as SiteConfig;
  } catch {
    // Fall back to an empty-but-valid config so the site never hard-crashes.
    return {
      meta: { githubUsername: "" },
      profile: {
        name: "Your Name",
        role: "Developer",
        title: "Developer",
        email: "",
        github: "",
        linkedin: "",
        bio: "Add a bio via the Setup flow.",
      },
      projects: [],
      skills: [],
    };
  }
}

export function saveConfig(config: SiteConfig): void {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}
