"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSettings } from "./SettingsProvider";
import type { Profile } from "@/lib/config";

const PlanetSystem3D = dynamic(() => import("./PlanetSystem3D"), {
  ssr: false,
  loading: () => null,
});

const RotatingEarth = dynamic(() => import("./RotatingEarth"), {
  ssr: false,
  loading: () => null,
});

export default function Hero({ profile }: { profile: Profile }) {
  const { effects3D, reducedMotion } = useSettings();
  const use3D = effects3D && !reducedMotion;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 md:right-[-6rem]">
          {use3D ? (
            <PlanetSystem3D />
          ) : (
            <div className="relative mx-auto flex h-full w-full max-w-[34rem] items-center justify-center" aria-hidden>
              <RotatingEarth />
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 w-full max-w-3xl text-center md:text-left md:ml-[-8rem]"
      >
        <div className="rounded-3xl bg-black/30 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
          <p className="font-mono text-sm uppercase tracking-[0.4em] text-cyan-200">
            Welcome to my galaxy
          </p>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl font-semibold sm:text-2xl bg-gradient-to-r from-cyan-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {profile.role}
          </p>
          <p className="mt-5 max-w-xl text-base text-slate-100">
            I orbit between clean code and curious data — building full-stack web
            applications and machine-learning models that ship.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#web"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-transform hover:scale-105"
            >
              Explore projects
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/50 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:border-cyan-300/60 hover:bg-black/70 hover:text-cyan-200"
            >
              Contact me
            </a>
          </div>
        </div>
      </motion.div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-2xl text-cyan-300/80 hover:text-cyan-200"
        aria-label="Scroll to About section"
      >
        ▾
      </a>
    </section>
  );
}
