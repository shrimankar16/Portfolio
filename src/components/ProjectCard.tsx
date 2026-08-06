"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/config";

const ACCENTS: Record<string, string> = {
  web: "from-cyan-500/30 to-blue-600/20 border-cyan-400/30",
  data: "from-fuchsia-500/30 to-violet-600/20 border-fuchsia-400/30",
};

const ICONS: Record<string, string> = {
  web: "🛰️",
  data: "🧬",
};

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const accent = ACCENTS[project.category] ?? ACCENTS.web;
  const icon = ICONS[project.category] ?? "★";
  const tags = [...(project.languages ?? []), ...(project.topics ?? [])].slice(0, 6);

  return (
    <motion.a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — view on GitHub`}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.12, ease: "easeOut" }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
      className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm transition-shadow hover:shadow-[0_0_40px_rgba(139,92,246,0.35)] ${accent}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl" aria-hidden>
          {icon}
        </span>
        <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300">
          ★ {project.stars}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-white group-hover:text-cyan-200">
        {project.name.replace(/-/g, " ")}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300/90">
        {project.description || "No description available yet."}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-slate-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-xs text-cyan-300">View on GitHub →</span>
        <span className="text-lg opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
          🚀
        </span>
      </div>
    </motion.a>
  );
}
