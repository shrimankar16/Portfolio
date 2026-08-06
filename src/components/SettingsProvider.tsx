"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Settings = {
  effects3D: boolean;
  setEffects3D: (v: boolean) => void;
  reducedMotion: boolean;
};

const SettingsContext = createContext<Settings>({
  effects3D: true,
  setEffects3D: () => {},
  reducedMotion: false,
});

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [effects3D, setEffects3D] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);

    // Default 3D off on small / low-power devices, on elsewhere.
    const coarse =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    setEffects3D(!coarse);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <SettingsContext.Provider value={{ effects3D, setEffects3D, reducedMotion }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
