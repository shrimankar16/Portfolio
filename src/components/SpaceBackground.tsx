"use client";

import dynamic from "next/dynamic";
import { useSettings } from "./SettingsProvider";
import CssStarfield from "./CssStarfield";
import { useState, useEffect } from "react";

// Lazy-load the WebGL starfield with proper loading delay
const Starfield3D = dynamic(() => import("./Starfield3D"), {
  ssr: false,
  loading: () => null,
});

export default function SpaceBackground() {
  const { effects3D, reducedMotion } = useSettings();
  const [shouldLoad3D, setShouldLoad3D] = useState(false);
  const useWebGL = effects3D && !reducedMotion;

  useEffect(() => {
    if (!useWebGL) return;

    // Delay 3D canvas loading to prioritize main content
    const timer = setTimeout(() => {
      // Check if device has sufficient performance
      const isLowEnd = 
        navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (!isLowEnd) {
        setShouldLoad3D(true);
      }
    }, 500); // Wait 500ms for main content to render

    return () => clearTimeout(timer);
  }, [useWebGL]);

  return (
    <div 
      className="fixed inset-0 -z-10 bg-[#05030f]" 
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(circle at 30% 20%, rgba(22, 14, 51, 0.8) 0%, transparent 60%),
          radial-gradient(circle at 70% 60%, rgba(5, 3, 15, 0.9) 0%, transparent 50%),
          url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80&auto=format&fit=crop')
        `,
        backgroundSize: 'cover, cover, cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'normal, normal, luminosity',
      }}
    >
      {/* Static gradient overlay for consistent dark theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#160e33_0%,#05030f_60%,#02010a_100%)] opacity-90" />
      
      {/* Dynamic starfield - lazy loaded */}
      {useWebGL && shouldLoad3D ? <Starfield3D /> : <CssStarfield />}
    </div>
  );
}
