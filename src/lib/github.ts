export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  default_branch: string;
}

interface RawRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  default_branch: string;
}

function headers(token?: string): Record<string, string> {
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

/** Fetch the public repos for a GitHub username (optionally authed). */
export async function fetchRepos(
  username: string,
  token?: string
): Promise<GitHubRepo[]> {
  const url = `https://api.github.com/users/${encodeURIComponent(
    username
  )}/repos?sort=updated&per_page=100&type=owner`;
  const res = await fetch(url, { headers: headers(token) });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub API ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = (await res.json()) as RawRepo[];
  return data.map((r) => ({
    id: r.id,
    name: r.name,
    full_name: r.full_name,
    description: r.description,
    html_url: r.html_url,
    homepage: r.homepage,
    language: r.language,
    topics: r.topics ?? [],
    stargazers_count: r.stargazers_count,
    pushed_at: r.pushed_at,
    updated_at: r.updated_at,
    fork: r.fork,
    archived: r.archived,
    default_branch: r.default_branch,
  }));
}

/** Fetch the profile README for {username}/{username} if it exists. */
export async function fetchProfileReadme(
  username: string,
  token?: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    username
  )}/${encodeURIComponent(username)}/readme`;
  const res = await fetch(url, {
    headers: { ...headers(token), Accept: "application/vnd.github.raw+json" },
  });
  if (!res.ok) return null;
  return await res.text();
}

/** Fetch the first paragraph of a repo's README (returns raw markdown). */
export async function fetchRepoReadme(
  fullName: string,
  token?: string
): Promise<string | null> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    fullName
  )}/readme`;
  const res = await fetch(url, {
    headers: { ...headers(token), Accept: "application/vnd.github.raw+json" },
  });
  if (!res.ok) return null;
  const text = await res.text();
  return firstParagraph(text);
}

/** Fetch the per-repo language byte breakdown. */
export async function fetchRepoLanguages(
  fullName: string,
  token?: string
): Promise<Record<string, number>> {
  const url = `https://api.github.com/repos/${encodeURIComponent(
    fullName
  )}/languages`;
  const res = await fetch(url, { headers: headers(token) });
  if (!res.ok) return {};
  return (await res.json()) as Record<string, number>;
}

/** Strip markdown and return the first meaningful paragraph. */
export function firstParagraph(markdown: string): string {
  const cleaned = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 2).join(" ").slice(0, 320);
}
