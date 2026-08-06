import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/config";

function ProjectGroup({
  id,
  eyebrow,
  title,
  description,
  projects,
  glow,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  projects: Project[];
  glow: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        <div className="mb-8 text-center">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-300">
            {eyebrow}
          </p>
          <h2 className={`mt-3 font-display text-3xl font-bold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r ${glow}`}>
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300/80">{description}</p>
        </div>
      </Reveal>

      {projects.length === 0 ? (
        <Reveal>
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
            <div className="text-4xl" aria-hidden>
              🌌
            </div>
            <p className="mt-4 text-slate-300">
              No projects featured here yet. Run the{" "}
              <a href="/setup" className="text-cyan-300 underline">
                setup flow
              </a>{" "}
              to pull repos from GitHub.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const web = projects.filter((p) => p.category === "web" && p.featured);
  const data = projects.filter((p) => p.category === "data" && p.featured);

  return (
    <div className="mx-auto max-w-6xl space-y-24 px-5 py-24">
      <ProjectGroup
        id="web"
        eyebrow="Mission Control"
        title="Web Development"
        description="Full-stack applications I've built across the front-end and back-end — React, Next.js, Node and more."
        projects={web}
        glow="from-cyan-300 to-blue-400"
      />
      <ProjectGroup
        id="data"
        eyebrow="Deep Space"
        title="Data Science"
        description="Analyses, models and dashboards I've built with Python, machine-learning and data-visualization tools."
        projects={data}
        glow="from-fuchsia-300 to-violet-400"
      />
    </div>
  );
}
