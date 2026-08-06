"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useState } from "react";

interface EducationItem {
  type: "education" | "certification";
  title: string;
  institution: string;
  degree?: string;
  status?: string;
  icon: "academic" | "certificate";
  bullets?: string[];
  certificateUrl?: string;
}

const educationData: EducationItem[] = [
  {
    type: "education",
    title: "Computer Science Engineering",
    institution: "NMIET Pune",
    degree: "Bachelor of Engineering",
    status: "Undergraduate",
    icon: "academic",
  },
  {
    type: "certification",
    title: "Specialized Machine Learning",
    institution: "L&T EduTech & LearnKonnect",
    status: "Course Pathway Completed",
    icon: "certificate",
    bullets: [
      "Advanced ML algorithms and model optimization techniques",
      "Deep Learning fundamentals with neural networks",
      "Real-world project implementation and deployment",
    ],
    certificateUrl: "/certificates/Specialized Machine Learning.pdf",
  },
  {
    type: "certification",
    title: "Machine Learning Fundamentals",
    institution: "Industry Certification",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Supervised and unsupervised learning algorithms",
      "Feature engineering and model evaluation",
      "Python libraries: scikit-learn, pandas, NumPy",
    ],
    certificateUrl: "/certificates/Machine Learning.pdf",
  },
  {
    type: "certification",
    title: "AWS Cloud Practitioner",
    institution: "Amazon Web Services",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Cloud computing fundamentals and AWS services",
      "Cloud architecture and deployment strategies",
      "Security, compliance, and cost optimization",
    ],
    certificateUrl: "/certificates/AWS Certificate.pdf",
  },
  {
    type: "certification",
    title: "Data Analytics Professional",
    institution: "Industry Certification",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Data visualization and business intelligence",
      "Statistical analysis and predictive modeling",
      "SQL, Excel, and analytics tools mastery",
    ],
    certificateUrl: "/certificates/Data Analytics Certificate.pdf",
  },
  {
    type: "certification",
    title: "Advanced SQL",
    institution: "Database Certification",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Complex queries, joins, and subqueries",
      "Database optimization and indexing",
      "Stored procedures and advanced SQL functions",
    ],
    certificateUrl: "/certificates/SQL Advamce certificate.jpg",
  },
  {
    type: "certification",
    title: "Frontend Development",
    institution: "Web Development Certification",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Modern JavaScript, React, and responsive design",
      "UI/UX principles and best practices",
      "CSS frameworks and component architecture",
    ],
    certificateUrl: "/certificates/Frontend Certificate.pdf",
  },
  {
    type: "certification",
    title: "Generative AI",
    institution: "Kodacy",
    status: "Completed",
    icon: "certificate",
    bullets: [
      "Large Language Models and prompt engineering",
      "AI-powered application development",
      "Ethical AI and responsible deployment",
    ],
    certificateUrl: "/certificates/Gen AI (kongncy).pdf",
  },
];

export default function Education() {
  const [expandedCert, setExpandedCert] = useState<number | null>(null);

  return (
    <section
      id="education"
      className="relative px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Education & Certifications
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-slate-100">
            Academic background and professional certifications
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {educationData.map((item, index) => (
            <Reveal key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-full"
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)]">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-white/10">
                    {item.icon === "academic" ? (
                      <svg
                        className="h-7 w-7 text-cyan-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-7 w-7 text-violet-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Type badge */}
                  <div className="mb-3 inline-flex w-fit items-center rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300 ring-1 ring-cyan-500/20">
                    {item.type === "education" ? "Education" : "Certification"}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 font-display text-lg font-bold text-white leading-tight">
                    {item.title}
                  </h3>

                  {/* Degree (if applicable) */}
                  {item.degree && (
                    <p className="mb-2 text-sm font-medium text-slate-300">
                      {item.degree}
                    </p>
                  )}

                  {/* Institution */}
                  <div className="mb-3 flex items-start text-slate-400">
                    <svg
                      className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="text-sm">{item.institution}</span>
                  </div>

                  {/* Bullets (if certification) */}
                  {item.bullets && expandedCert === index && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-3 space-y-1.5 text-xs text-slate-300"
                    >
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2 mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {/* Actions */}
                  <div className="mt-auto flex flex-col gap-2 pt-4">
                    {/* Status */}
                    {item.status && (
                      <div className="inline-flex w-fit items-center rounded-lg bg-green-500/10 px-3 py-1.5 text-xs font-medium text-green-300 ring-1 ring-green-500/20">
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                        {item.status}
                      </div>
                    )}

                    {/* Show Details Button (for certifications) */}
                    {item.bullets && (
                      <button
                        onClick={() => setExpandedCert(expandedCert === index ? null : index)}
                        className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {expandedCert === index ? "Hide Details" : "Show Details"}
                      </button>
                    )}

                    {/* View Certificate Button */}
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-cyan-400/30 transition-all hover:from-cyan-500/30 hover:to-violet-500/30 hover:ring-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Certificate
                      </a>
                    )}
                  </div>

                  {/* Decorative corner accent */}
                  <div className="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br from-cyan-500/10 to-violet-500/10 blur-2xl transition-opacity duration-300 group-hover:opacity-70" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Bottom decorative element */}
        <Reveal>
          <div className="mx-auto mt-12 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </Reveal>
      </div>
    </section>
  );
}
