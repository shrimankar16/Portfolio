"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import type { Profile } from "@/lib/config";

export default function Contact({ profile }: { profile: Profile }) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const message = fd.get("message") as string;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Hi ${profile.name.split(" ")[0]},\n\n${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const links = [
    { href: profile.github, label: "GitHub", icon: "🐙", handle: "shrimankar16" },
    { href: profile.linkedin, label: "LinkedIn", icon: "💼", handle: "Shrijay Mankar" },
    { href: `mailto:${profile.email}`, label: "Email", icon: "✉️", handle: profile.email },
  ];

  return (
    <section id="contact" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24">
      <Reveal>
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-200">
              Contact
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
              Let's build something among the stars
            </h2>
            <p className="mt-4 text-slate-100">
              Open to full-time roles, internships, and collaborations. Send a
              transmission — I'll be in orbit.
            </p>
            <div className="mt-8 space-y-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-4 transition-colors hover:border-cyan-300/40 hover:bg-black/70"
                >
                  <span className="text-2xl" aria-hidden>
                    {l.icon}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-300">
                      {l.label}
                    </p>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-200">
                      {l.handle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm text-slate-200">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="Ada Lovelace"
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 backdrop-blur-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm text-slate-200">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ada@example.com"
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 backdrop-blur-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm text-slate-200">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Your message..."
                className="w-full resize-none rounded-lg border border-white/20 bg-black/50 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-400 focus:border-cyan-400 backdrop-blur-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 py-3 font-semibold text-white shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-transform hover:scale-[1.02]"
            >
              {sent ? "Opening mail client… ✓" : "Send transmission"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
