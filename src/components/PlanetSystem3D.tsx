"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Procedurally paint a gas-giant style surface onto a canvas texture.
function makePlanetTexture(): THREE.CanvasTexture {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#2b1055");
  grad.addColorStop(0.3, "#5b2a86");
  grad.addColorStop(0.55, "#a44bbf");
  grad.addColorStop(0.8, "#3f2a6b");
  grad.addColorStop(1, "#1a1145");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // horizontal swirl bands
  const bands = 26;
  for (let i = 0; i < bands; i++) {
    const y = (i / bands) * h;
    const hue = 250 + Math.random() * 90;
    ctx.fillStyle = `hsla(${hue}, ${50 + Math.random() * 40}%, ${30 + Math.random() * 35}%, ${0.5 + Math.random() * 0.3})`;
    ctx.beginPath();
    ctx.ellipse(
      w / 2,
      y + Math.random() * 30,
      w,
      (h / bands) * 0.9 + Math.random() * 12,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // great red storm-ish spot
  ctx.fillStyle = "rgba(255,120,120,0.5)";
  ctx.beginPath();
  ctx.ellipse(w * 0.72, h * 0.58, w * 0.07, h * 0.045, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,200,150,0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.72, h * 0.58, w * 0.035, h * 0.02, -0.2, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Planet() {
  const tex = useMemo(makePlanetTexture, []);
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.05;
  });
  return (
    <mesh ref={mesh} rotation={[0.35, 0, 0]}>
      <sphereGeometry args={[1.55, 64, 64]} />
      <meshStandardMaterial
        map={tex}
        roughness={0.85}
        metalness={0.05}
        emissive="#3b1f6e"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function Rings() {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.001;
  });
  return (
    <group ref={ref} rotation={[Math.PI / 2.4, 0.2, 0]}>
      <mesh>
        <ringGeometry args={[2.05, 2.75, 96]} />
        <meshBasicMaterial
          color="#cdb8ff"
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[0.2, 0, 0]}>
        <ringGeometry args={[2.2, 2.5, 96]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Moon({ radius, speed, size, color }: { radius: number; speed: number; size: number; color: string }) {
  const group = useRef<THREE.Group>(null);
  const moon = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * speed;
    if (moon.current) {
      moon.current.rotation.y += delta * 0.8;
      moon.current.rotation.x += delta * 0.5;
    }
  });
  return (
    <group ref={group} rotation={[0.4, 0, 0.1]}>
      <mesh ref={moon} position={[radius, 0, 0]}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

export default function PlanetSystem3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.4, 5.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 6, 8]} intensity={1.1} color="#ffe9c4" />
      <pointLight position={[-6, -4, 2]} intensity={0.5} color="#8b5cf6" />
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.6}>
        <Planet />
        <Rings />
        <Moon radius={2.9} speed={0.25} size={0.28} color="#93c5fd" />
        <Moon radius={3.6} speed={-0.18} size={0.18} color="#f0abfc" />
        <Moon radius={2.4} speed={0.45} size={0.12} color="#fbbf24" />
      </Float>
    </Canvas>
  );
}
