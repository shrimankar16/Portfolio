"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useState } from "react";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string[];
  technologies?: string[];
  certificateUrl?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: "AI and Machine Learning Intern",
    company: "EduSkill",
    duration: "10 weeks",
    description: [
      "Developed and deployed machine learning models to improve educational outcomes, resulting in measurable performance gains",
      "Collaborated with cross-functional teams to integrate AI solutions into existing educational platforms",
      "Implemented data preprocessing pipelines and model evaluation frameworks using industry-standard tools",
    ],
    technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas", "NumPy"],
    certificateUrl: "/certificates/AI-ML Virtual Internship Certificate Eduskill.pdf",
  },
  {
    role: "Java Full Stack Development Intern",
    company: "EduSkills",
    duration: "8 weeks",
    description: [
      "Developed full-stack web applications using Java with a focus on scalable backend development.",
      "Designed responsive user interfaces and integrated them with RESTful APIs and database systems.",
      "Implemented CRUD operations, authentication workflows, and database connectivity following industry best practices.",
    ],
    technologies: [
      "Java",
      "Spring Boot",
      "HTML",
      "CSS",
      "JavaScript",
      "MySQL",
      "Git",
    ],
    certificateUrl: "/certificates/Java Full Stack Developer Virtual Internship Eduskill.pdf",
  },
  {
    role: "Artificial Intelligence & Machine Learning Intern",
    company: "Kodacy × SPACE",
    duration: "30 days",
    description: [
      "Built and experimented with machine learning models to solve real-world classification and prediction problems.",
      "Performed data preprocessing, feature engineering, and model evaluation using standard AI/ML workflows.",
      "Explored supervised learning algorithms, model optimization techniques, and practical AI applications.",
    ],
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Jupyter Notebook",
    ],
    certificateUrl: "/certificates/AI ML Virtual Internship Kondency.pdf",
  },
];

export default function Experience() {
  const [showCertificate, setShowCertificate] = useState<number | null>(null);

  return (
    <section id="experience" className="relative px-5 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h2 className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Experience
          </h2>
          <p className="mx-auto mb-16 max-w-2xl text-center text-slate-300/80">
            My professional journey in AI and software development
          </p>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-500/50 via-violet-500/50 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <Reveal key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex flex-col md:flex-row md:items-center"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-cyan-400 bg-[#05030f] shadow-[0_0_15px_rgba(34,211,238,0.6)] md:left-1/2" />

                  {/* Content card */}
                  <div
                    className={`ml-16 w-full md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-8" : "md:ml-auto md:pl-8"}`}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Duration badge */}
                      <div className="mb-3 inline-flex items-center rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-cyan-500/20">
                        <svg
                          className="mr-1.5 h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {exp.duration}
                      </div>

                      {/* Role and Company */}
                      <h3 className="mb-1 font-display text-xl font-bold text-white sm:text-2xl">
                        {exp.role}
                      </h3>
                      <p className="mb-4 flex items-center text-lg font-semibold text-cyan-300">
                        <svg
                          className="mr-2 h-5 w-5"
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
                        {exp.company}
                      </p>

                      {/* Description bullets */}
                      <ul className="mb-4 space-y-2 text-sm text-slate-300">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      {exp.technologies && (
                        <div className="mb-4 flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="rounded-md bg-violet-500/10 px-2.5 py-1 text-xs font-medium text-violet-300 ring-1 ring-violet-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Show Certificate Button */}
                      {exp.certificateUrl && (
                        <button
                          onClick={() => setShowCertificate(showCertificate === index ? null : index)}
                          className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition-all hover:border-cyan-400/50 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {showCertificate === index ? "Hide Certificate" : "Show Certificate"}
                        </button>
                      )}

                      {/* Certificate Expanded View */}
                      {showCertificate === index && exp.certificateUrl && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden rounded-lg border border-cyan-400/20 bg-black/40 p-4 backdrop-blur-sm"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="mb-2 font-semibold text-cyan-300">Internship Certificate</h4>
                              <p className="mb-3 text-xs text-slate-400">
                                {exp.company} • {exp.duration}
                              </p>
                              <a
                                href={exp.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan-500 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-transform hover:scale-105"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Certificate
                              </a>
                            </div>
                            <button
                              onClick={() => setShowCertificate(null)}
                              className="text-slate-400 transition-colors hover:text-white"
                              aria-label="Close certificate view"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
