"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchProfileReadme,
  fetchRepos,
  fetchRepoReadme,
  type GitHubRepo,
} from "@/lib/github";
import {
  classifyRepo,
  extractSkills,
  groupSkills,
  mergeSkills,
  type CandidateCategory,
} from "@/lib/classify";
import type { Profile, SiteConfig, SkillGroup } from "@/lib/config";

interface Candidate {
  id: number;
  name: string;
  fullName: string;
  description: string;
  language: string;
  topics: string[];
  stars: number;
  githubUrl: string;
  updatedAt: string;
  category: CandidateCategory;
  reason: string;
  selected: boolean;
  isFork: boolean;
  isArchived: boolean;
}

const CAT_LABEL: Record<CandidateCategory, string> = {
  web: "Web Dev",
  data: "Data Science",
  other: "Other",
};

const STEPS = ["GitHub", "Projects", "Profile README", "LinkedIn", "Review"];

export default function SetupClient() {
  // GitHub
  const [username, setUsername] = useState("shrimankar16");
  const [token, setToken] = useState("");
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [excludeForks, setExcludeForks] = useState(true);
  const [excludeArchived, setExcludeArchived] = useState(true);

  // Profile README
  const [readmeText, setReadmeText] = useState("");
  const [readmeSkills, setReadmeSkills] = useState<string[]>([]);
  const [readmeChecked, setReadmeChecked] = useState<string[]>([]);

  // Profile info
  const [profile, setProfile] = useState<Profile>({
    name: "",
    role: "",
    title: "",
    email: "",
    github: "",
    linkedin: "",
    bio: "",
  });

  // LinkedIn
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [linkedinText, setLinkedinText] = useState("");
  const [linkedinSuggestions, setLinkedinSuggestions] = useState<string[]>([]);
  const [linkedinChecked, setLinkedinChecked] = useState<string[]>([]);

  // Wizard
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Load existing config to prefill
  useEffect(() => {
    fetch("/api/config")
      .then((r) => (r.ok ? r.json() : null))
      .then((cfg: SiteConfig | null) => {
        if (!cfg) return;
        setUsername(cfg.meta.githubUsername || username);
        setProfile((p) => ({
          ...p,
          ...cfg.profile,
          github: cfg.profile.github || `https://github.com/${cfg.meta.githubUsername}`,
        }));
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGitHub = useCallback(async () => {
    setFetchError("");
    setLoadingRepos(true);
    try {
      const repos = await fetchRepos(username, token || undefined);
      const mapped = repos.map<Candidate>((r: GitHubRepo) => {
        const cls = classifyRepo({
          name: r.name,
          description: r.description,
          primaryLanguage: r.language,
          topics: r.topics,
        });
        return {
          id: r.id,
          name: r.name,
          fullName: r.full_name,
          description: r.description ?? "",
          language: r.language ?? "",
          topics: r.topics ?? [],
          stars: r.stargazers_count,
          githubUrl: r.html_url,
          updatedAt: r.pushed_at,
          category: cls.category,
          reason: cls.reason,
          selected: false,
          isFork: r.fork,
          isArchived: r.archived,
        };
      });
      setCandidates(mapped);
      // Profile README
      const readme = await fetchProfileReadme(username, token || undefined);
      if (readme) {
        setReadmeText(readme);
        const skills = extractSkills(readme);
        setReadmeSkills(skills);
        setReadmeChecked(skills);
      } else {
        setReadmeText("");
        setReadmeSkills([]);
        setReadmeChecked([]);
      }
    } catch (e) {
      setFetchError((e as Error).message);
    } finally {
      setLoadingRepos(false);
    }
  }, [username, token]);

  const enrichReadmes = useCallback(async () => {
    const selected = candidates.filter((c) => c.selected);
    setSaving(true);
    for (const c of selected) {
      try {
        const r = await fetchRepoReadme(c.fullName, token || undefined);
        if (r) {
          setCandidates((prev) =>
            prev.map((x) => (x.id === c.id ? { ...x, description: x.description || r } : x))
          );
        }
      } catch {
        // skip
      }
    }
    setSaving(false);
  }, [candidates, token]);

  // LinkedIn keyword extraction
  const runLinkedInExtraction = useCallback(() => {
    const sugg = extractSkills(linkedinText);
    setLinkedinSuggestions(sugg);
    setLinkedinChecked(sugg);
  }, [linkedinText]);

  const visibleCandidates = useMemo(() => {
    return candidates.filter(
      (c) =>
        (!excludeForks || !c.isFork) &&
        (!excludeArchived || !c.isArchived) &&
        c.name !== "shrimankar16"
    );
  }, [candidates, excludeForks, excludeArchived]);

  const toggleCandidate = (id: number, field: "selected" | "category", value: unknown) => {
    setCandidates((prev) => prev.map((c) => (c.id === id ? ({ ...c, [field]: value } as Candidate) : c)));
  };

  const repoSkills = useMemo(() => {
    const picked = candidates.filter((c) => c.selected);
    const langs = picked.flatMap((c) => (c.language ? [c.language] : []));
    const topics = picked.flatMap((c) => c.topics);
    return [...new Set([...langs, ...topics])];
  }, [candidates]);

  const save = useCallback(async () => {
    setSaving(true);
    setSaveMsg("");
    try {
      const picked = candidates.filter((c) => c.selected && c.category !== "other");
      const projects = picked.map((c) => ({
        id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || String(c.id),
        name: c.name,
        description: c.description,
        category: c.category as "web" | "data",
        featured: true,
        githubUrl: c.githubUrl,
        homepage: "",
        languages: c.language ? [c.language] : [],
        topics: c.topics,
        stars: c.stars,
        updatedAt: c.updatedAt,
      }));

      const merged = mergeSkills(repoSkills, readmeChecked, linkedinChecked);
      const groups: SkillGroup[] = groupSkills(merged);

      const cfg: SiteConfig = {
        meta: { githubUsername: username },
        profile: {
          ...profile,
          github: profile.github || `https://github.com/${username}`,
        },
        projects,
        skills: groups,
        linkedinPastedText: linkedinText,
      };

      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cfg),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Save failed");
      }
      setSaveMsg("Saved! Reload the home page to see your updated portfolio.");
    } catch (e) {
      setSaveMsg(`Error: ${(e as Error).message}`);
    } finally {
      setSaving(false);
    }
  }, [candidates, username, profile, repoSkills, readmeChecked, linkedinChecked, linkedinText]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-[#05030f] px-5 py-12 text-slate-200">
      <div className="mx-auto max-w-4xl">
        <a href="/" className="text-sm text-cyan-300 hover:underline">
          ← Back to portfolio
        </a>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl" aria-hidden>🛠️</span>
          <div>
            <h1 className="font-display text-3xl font-bold text-white">Portfolio Setup</h1>
            <p className="text-sm text-slate-400">
              One-time onboarding — site visitors never see this page.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button
                onClick={() => setStep(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  i === step
                    ? "bg-cyan-400 text-black"
                    : "border border-white/15 text-slate-300 hover:bg-white/5"
                }`}
              >
                {i + 1}. {s}
              </button>
              {i < STEPS.length - 1 && <span className="text-slate-600">→</span>}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">1. GitHub username</h2>
              <p className="text-sm text-slate-400">
                We'll fetch your public repos via the GitHub API.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm" htmlFor="gh-user">Username</label>
                  <input
                    id="gh-user"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                    placeholder="octocat"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm" htmlFor="gh-token">
                    Personal Access Token (optional, raises rate limit)
                  </label>
                  <input
                    id="gh-token"
                    type="password"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                    placeholder="ghp_..."
                  />
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={excludeForks} onChange={(e) => setExcludeForks(e.target.checked)} />
                  Exclude forks
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={excludeArchived} onChange={(e) => setExcludeArchived(e.target.checked)} />
                  Exclude archived
                </label>
              </div>
              <button
                onClick={fetchGitHub}
                disabled={loadingRepos}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-2.5 font-semibold text-white disabled:opacity-50"
              >
                {loadingRepos ? "Fetching from GitHub…" : "Fetch repos"}
              </button>
              {fetchError && (
                <p className="text-sm text-rose-400">⚠️ {fetchError}</p>
              )}
              {candidates.length > 0 && (
                <p className="text-sm text-emerald-400">
                  ✓ Found {candidates.length} repos. Continue to select which to feature.
                </p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-white">2. Select projects</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCandidates((p) => p.map((c) => ({ ...c, selected: true })))}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs hover:bg-white/5"
                  >
                    Select all
                  </button>
                  <button
                    onClick={enrichReadmes}
                    disabled={saving || !candidates.some((c) => c.selected)}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs hover:bg-white/5 disabled:opacity-50"
                  >
                    {saving ? "Fetching…" : "Fetch READMEs for selected"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-400">
                Check which projects appear on the site and fix any wrong category suggestion.
              </p>
              {visibleCandidates.length === 0 && (
                <p className="text-sm text-slate-400">Fetch your repos in step 1 first.</p>
              )}
              <div className="max-h-[60vh] space-y-3 overflow-y-auto pr-1">
                {visibleCandidates.map((c) => (
                  <div
                    key={c.id}
                    className={`rounded-xl border p-4 ${
                      c.selected ? "border-cyan-400/50 bg-cyan-400/[0.05]" : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <label className="flex flex-1 items-start gap-3">
                        <input
                          type="checkbox"
                          checked={c.selected}
                          onChange={(e) => toggleCandidate(c.id, "selected", e.target.checked)}
                          className="mt-1"
                        />
                        <span>
                          <span className="font-semibold text-white">{c.name}</span>
                          <span className="ml-2 font-mono text-xs text-slate-500">
                            ★{c.stars} · {c.language || "—"}
                          </span>
                          <span className="mt-1 block text-sm text-slate-400">
                            {c.description || "No description"}
                          </span>
                        </span>
                      </label>
                      <div className="flex items-center gap-2">
                        <select
                          value={c.category}
                          onChange={(e) =>
                            toggleCandidate(c.id, "category", e.target.value as CandidateCategory)
                          }
                          className="rounded-md border border-white/15 bg-black/30 px-2 py-1 text-xs text-white outline-none"
                        >
                          {(["web", "data", "other"] as CandidateCategory[]).map((k) => (
                            <option key={k} value={k}>
                              {CAT_LABEL[k]}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Suggested: {c.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">3. Profile README</h2>
              {readmeText ? (
                <>
                  <p className="text-sm text-slate-400">
                    Found your <code className="text-cyan-300">{username}/{username}</code> profile
                    README. Skills extracted — keep the ones you want in your About/Skills:
                  </p>
                  <div className="max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-black/30 p-3 font-mono text-xs text-slate-400">
                    {readmeText.slice(0, 1200)}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {readmeSkills.map((s) => (
                      <label key={s} className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-sm">
                        <input
                          type="checkbox"
                          checked={readmeChecked.includes(s)}
                          onChange={(e) =>
                            setReadmeChecked((prev) =>
                              e.target.checked ? [...prev, s] : prev.filter((x) => x !== s)
                            )
                          }
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-400">
                  No profile README found for <code>{username}</code> (that's fine — we'll rely on
                  repos and your LinkedIn text). Fetch repos in step 1 to check.
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-bold text-white">4. LinkedIn</h2>
              <div>
                <label className="mb-1 block text-sm" htmlFor="li-url">LinkedIn profile URL (link only, never scraped)</label>
                <input
                  id="li-url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                  placeholder="https://www.linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="mb-1 block text-sm" htmlFor="li-text">
                  Paste text from posts you want reflected in Skills
                </label>
                <textarea
                  id="li-text"
                  rows={5}
                  value={linkedinText}
                  onChange={(e) => setLinkedinText(e.target.value)}
                  className="w-full resize-none rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                  placeholder="Paste your LinkedIn post content here…"
                />
                <button
                  onClick={runLinkedInExtraction}
                  className="mt-2 rounded-full border border-cyan-400/40 px-4 py-1.5 text-sm text-cyan-200 hover:bg-cyan-400/10"
                >
                  Extract skills
                </button>
              </div>
              {linkedinSuggestions.length > 0 && (
                <div>
                  <p className="mb-2 text-sm text-slate-400">Suggested skills — confirm or remove:</p>
                  <div className="flex flex-wrap gap-2">
                    {linkedinSuggestions.map((s) => (
                      <label key={s} className="flex items-center gap-1.5 rounded-full border border-fuchsia-400/30 px-3 py-1 text-sm">
                        <input
                          type="checkbox"
                          checked={linkedinChecked.includes(s)}
                          onChange={(e) =>
                            setLinkedinChecked((prev) =>
                              e.target.checked ? [...prev, s] : prev.filter((x) => x !== s)
                            )
                          }
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-bold text-white">5. Review & Save</h2>
              <div>
                <p className="mb-2 text-sm font-semibold text-cyan-200">Profile</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([
                    ["name", "Name"],
                    ["role", "Tagline / Role"],
                    ["email", "Email"],
                    ["github", "GitHub URL"],
                    ["linkedin", "LinkedIn URL"],
                    ["bio", "Bio (2–3 sentences)"],
                  ] as [keyof Profile, string][]).map(([key, label]) => (
                    <div key={key} className={key === "bio" ? "sm:col-span-2" : ""}>
                      <label className="mb-1 block text-sm" htmlFor={`p-${key}`}>{label}</label>
                      {key === "bio" ? (
                        <textarea
                          id={`p-${key}`}
                          rows={3}
                          value={profile[key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                        />
                      ) : (
                        <input
                          id={`p-${key}`}
                          value={profile[key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                          className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:border-cyan-400"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm font-semibold text-cyan-200">
                  Will feature {candidates.filter((c) => c.selected && c.category !== "other").length}{" "}
                  projects
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {groupSkills(mergeSkills(repoSkills, readmeChecked, linkedinChecked)).map((g) => (
                    <span key={g.name} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {g.name}: {g.items.join(", ")}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 px-6 py-2.5 font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save projects.config.json"}
              </button>
              {saveMsg && <p className="text-sm text-cyan-200">{saveMsg}</p>}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 0}
            className="rounded-full border border-white/15 px-5 py-2 text-sm disabled:opacity-40"
          >
            ← Previous
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={next}
              className="rounded-full bg-white/10 px-5 py-2 text-sm hover:bg-white/15"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
