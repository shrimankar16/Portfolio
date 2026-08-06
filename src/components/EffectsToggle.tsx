"use client";

import { motion } from "framer-motion";
import { useSettings } from "./SettingsProvider";

export default function EffectsToggle() {
  const { effects3D, setEffects3D } = useSettings();
  return (
    <motion.button
      type="button"
      onClick={() => setEffects3D(!effects3D)}
      aria-pressed={effects3D}
      aria-label={
        effects3D ? "Turn off 3D space effects" : "Turn on 3D space effects"
      }
      title="Toggle 3D space effects"
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg shadow-[0_0_20px_rgba(139,92,246,0.35)] backdrop-blur transition-colors hover:bg-white/10"
    >
      <span role="img" aria-hidden>
        {effects3D ? "🪐" : "🪐"}
      </span>
      <span className="sr-only">3D effects {effects3D ? "on" : "off"}</span>
      <span
        className={`absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full ${
          effects3D ? "bg-emerald-400" : "bg-rose-400"
        }`}
      />
    </motion.button>
  );
}
