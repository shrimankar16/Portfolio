import Reveal from "./Reveal";
import type { Profile } from "@/lib/config";

export default function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <div className="grid items-center gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="relative mx-auto h-56 w-56">
              <div className="absolute inset-0 rotate-6 rounded-3xl border border-fuchsia-400/30" />
              <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500/20 via-violet-600/20 to-fuchsia-600/20 text-7xl backdrop-blur">
                <span aria-hidden>🧑‍🚀</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-200">
              About me
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              A curious mind in a vast universe
            </h2>
            <p className="mt-5 leading-relaxed text-slate-100">{profile.bio}</p>
            <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                { label: "Status", value: "Final Year CS" },
                { label: "Focus", value: "Full-Stack + AI/ML" },
                { label: "Open to", value: "Roles & Collabs" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-3"
                >
                  <p className="text-xs uppercase tracking-wider text-slate-300">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
