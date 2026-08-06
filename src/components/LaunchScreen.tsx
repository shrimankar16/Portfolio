"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LaunchScreen() {
  const [phase, setPhase] = useState<"count" | "go" | "done">("count");
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < 3; i++) {
      timers.push(setTimeout(() => setCount(2 - i), i * 650));
    }
    timers.push(setTimeout(() => setPhase("go"), 2000));
    timers.push(setTimeout(() => setPhase("done"), 2900));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="launch"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05030f] text-white"
          exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-label="Loading: launch sequence in progress"
        >
          <motion.div
            animate={phase === "go" ? { y: [0, -260], opacity: [1, 0] } : { y: 0 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
            className="text-6xl"
          >
            🚀
          </motion.div>

          <h2 className="mt-6 font-mono text-xs uppercase tracking-[0.5em] text-cyan-300/80">
            Launch Sequence
          </h2>

          <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: phase === "go" ? "100%" : "78%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={count}
              className="mt-4 font-mono text-4xl font-bold tabular-nums text-cyan-200"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {phase === "go" ? "IGNITION" : count}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
