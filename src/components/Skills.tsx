"use client";

import Reveal from "./Reveal";
import type { SkillGroup } from "@/lib/config";
import { useState } from "react";

const GROUP_ICONS: Record<string, string> = {
  code: "💻",
  layers: "🎨",
  server: "⚙️",
  database: "🗄️",
  brain: "🧠",
  cloud: "☁️",
};

// Tooltip content for specific technologies
const TECH_TOOLTIPS: Record<string, string> = {
  "Next.js": "Used in Shopify Theme Builder and this portfolio",
  "Python": "Used in Fraud Detection pipeline and ML projects",
  "React": "Used in Split & Settle, ERP, and multiple web apps",
  "TypeScript": "Used across all modern web projects",
  "TensorFlow": "Used in Smart Attendance System with facial recognition",
  "scikit-learn": "Used in Fraud Detection with 94% accuracy",
  "Node.js": "Used in Split & Settle backend API",
  "MongoDB": "Used in Split & Settle for expense tracking",
  "PostgreSQL": "Used in Split & Settle and ERP system",
  "pandas": "Used in Banking Analytics and Crypto Price Trends",
  "Express": "Used in Split & Settle REST API backend",
  "Tailwind CSS": "Used in Shopify Theme Builder and portfolio",
  "OpenCV": "Used in Smart Attendance facial recognition system",
  "Docker": "Used for containerizing full-stack applications",
  "AWS": "Used for cloud deployment and hosting",
  "NumPy": "Used in data preprocessing and ML pipelines",
};

interface SkillBadgeProps {
  item: string;
  delay: number;
}

function SkillBadge({ item, delay }: SkillBadgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const hasTooltip = item in TECH_TOOLTIPS;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Reveal delay={delay}>
        <button
          className={`group relative rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
            hasTooltip
              ? "border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10 text-cyan-50 hover:scale-105 hover:border-cyan-400/60 hover:from-cyan-500/20 hover:to-violet-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
              : "border-white/20 bg-black/40 text-slate-100 hover:border-white/30 hover:bg-black/50"
          }`}
          aria-label={hasTooltip ? `${item} - ${TECH_TOOLTIPS[item]}` : item}
        >
          <span className="relative z-10">{item}</span>
          
          {/* Glow effect on hover */}
          {hasTooltip && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/0 to-violet-400/0 opacity-0 transition-opacity duration-300 group-hover:from-cyan-400/10 group-hover:to-violet-400/10 group-hover:opacity-100" />
          )}
        </button>
      </Reveal>

      {/* Custom Tooltip */}
      {hasTooltip && isHovered && (
        <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 animate-fadeIn">
          <div className="relative rounded-lg border border-cyan-400/40 bg-gradient-to-br from-slate-900/95 to-slate-800/95 px-4 py-2.5 shadow-[0_0_30px_rgba(34,211,238,0.4)] backdrop-blur-md">
            <p className="whitespace-nowrap text-xs font-medium text-cyan-50">
              {TECH_TOOLTIPS[item]}
            </p>
            {/* Arrow */}
            <div className="absolute left-1/2 top-full -translate-x-1/2">
              <div className="h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-cyan-400/40" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-200">
            Arsenal
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Skills & Technologies
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-100">
            Hover over technologies to see where they're used
          </p>
        </div>
      </Reveal>

      <div className="mt-12 space-y-12">
        {groups.map((g, groupIndex) => (
          <Reveal key={g.name} delay={groupIndex * 0.1}>
            <div className="rounded-3xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl" aria-hidden>
                  {GROUP_ICONS[g.icon ?? ""] ?? "✦"}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">{g.name}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {g.items.map((item, itemIndex) => (
                  <SkillBadge
                    key={item}
                    item={item}
                    delay={groupIndex * 0.1 + itemIndex * 0.03}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Legend */}
      <Reveal delay={0.3}>
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 to-violet-500/10" />
            <span>Hover for project examples</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

