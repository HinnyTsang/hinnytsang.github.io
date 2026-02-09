"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ─── Galaxy parameters ──────────────────────────────────────────────────────

const NUM_ARMS = 4;
const ARM_STARS = 100;
const BULGE_STARS = 60;
const BG_STARS = 40;
const TOTAL = NUM_ARMS * ARM_STARS + BULGE_STARS + BG_STARS;
const ARM_SPREAD = 0.35;
const ARM_WINDS = 2.5;

// ─── Shaders ────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform float uTime;
  attribute float aRadius;
  attribute float aAngle;
  attribute float aSize;
  attribute float aBrightness;

  varying float vBrightness;

  void main() {
    // Differential rotation: angular velocity ~ 1 / sqrt(r)
    float effectiveR = max(aRadius, 0.03);
    float currentAngle = aAngle + uTime / sqrt(effectiveR);

    // Compute position in galaxy plane (face-on, CSS handles tilt)
    vec3 pos = vec3(
      cos(currentAngle) * aRadius,
      sin(currentAngle) * aRadius,
      0.0
    );

    // Twinkle
    vBrightness = aBrightness * (0.7 + 0.3 * sin(uTime * 4.0 + aAngle * 10.0));

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (80.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying float vBrightness;

  void main() {
    // Soft circular point sprite
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.3, dist) * vBrightness * 0.4;
    gl_FragColor = vec4(0.7, 0.78, 1.0, alpha);
  }
`;

// ─── Galaxy geometry builder ────────────────────────────────────────────────

function useGalaxyGeometry() {
  return useMemo(() => {
    const radii = new Float32Array(TOTAL);
    const angles = new Float32Array(TOTAL);
    const sizes = new Float32Array(TOTAL);
    const brightnesses = new Float32Array(TOTAL);
    // Positions are set to origin — vertex shader computes actual position
    const positions = new Float32Array(TOTAL * 3);

    let idx = 0;

    // Spiral arm stars
    for (let arm = 0; arm < NUM_ARMS; arm++) {
      const armOffset = (arm / NUM_ARMS) * Math.PI * 2;
      for (let i = 0; i < ARM_STARS; i++) {
        const r = 0.1 + Math.random() * 1.5;
        const spiralAngle = armOffset - ARM_WINDS * Math.log(r + 0.1);
        const scatter = (Math.random() - 0.5) * ARM_SPREAD * (1 - r * 0.3) * 2;

        radii[idx] = Math.max(0.05, r + scatter * 0.2);
        angles[idx] = spiralAngle + scatter;
        sizes[idx] = Math.random() * 1.2 + 0.4;
        brightnesses[idx] = (Math.random() * 0.5 + 0.3) * 0.1;
        idx++;
      }
    }

    // Central bulge
    for (let i = 0; i < BULGE_STARS; i++) {
      radii[idx] = Math.random() * 0.5;
      angles[idx] = Math.random() * Math.PI * 2;
      sizes[idx] = Math.random() * 1.4 + 0.6;
      brightnesses[idx] = Math.random() * 0.4 + 0.5;
      idx++;
    }

    // Background field stars
    for (let i = 0; i < BG_STARS; i++) {
      radii[idx] = 0.3 + Math.random() * 1;
      angles[idx] = Math.random() * Math.PI * 2;
      sizes[idx] = Math.random() * 0.6 + 0.2;
      brightnesses[idx] = Math.random() * 0.2 + 0.1;
      idx++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(angles, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aBrightness", new THREE.BufferAttribute(brightnesses, 1));

    return geometry;
  }, []);
}

// ─── Galaxy scene component (runs inside R3F Canvas) ────────────────────────

function Galaxy() {
  const geometry = useGalaxyGeometry();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.3;
    }
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={1}
      />
    </points>
  );
}

// ─── Exported wrapper ───────────────────────────────────────────────────────

export function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only render when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-64 w-full rounded-xl md:h-100"
      style={{ transform: "perspective(800px) rotateX(35deg)" }}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 2], fov: 50 }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
        >
          <Galaxy />
        </Canvas>
      )}
    </div>
  );
}
