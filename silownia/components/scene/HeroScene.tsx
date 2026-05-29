"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "@/components/ScrollStory";

const N = 2000;
const { smoothstep } = THREE.MathUtils;

export default function HeroScene() {
  const groupRef     = useRef<THREE.Group>(null);
  const mainRingRef  = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  const colorOrange = useMemo(() => new THREE.Color("#ff6b00"), []);
  const colorRed    = useMemo(() => new THREE.Color("#ff1200"), []);
  const tempColor   = useMemo(() => new THREE.Color(), []);

  const { source, scatter, sphere, live } = useMemo(() => {
    const src = new Float32Array(N * 3);
    const sct = new Float32Array(N * 3);
    const sph = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.random() * Math.PI * 2;
      const tubeR  = 0.06 + Math.random() * 0.28;
      const R      = 1.72 + tubeR * Math.cos(phi);
      src[i * 3]     = R * Math.cos(theta);
      src[i * 3 + 1] = R * Math.sin(theta);
      src[i * 3 + 2] = tubeR * Math.sin(phi);

      const sr     = 3.5 + Math.random() * 9;
      const sTheta = Math.random() * Math.PI * 2;
      const sPhi   = Math.acos(2 * Math.random() - 1);
      sct[i * 3]     = sr * Math.sin(sPhi) * Math.cos(sTheta);
      sct[i * 3 + 1] = sr * Math.sin(sPhi) * Math.sin(sTheta);
      sct[i * 3 + 2] = sr * Math.cos(sPhi);

      const spR     = 1.75 + Math.random() * 0.12;
      const spTheta = Math.random() * Math.PI * 2;
      const spPhi   = Math.acos(2 * Math.random() - 1);
      sph[i * 3]     = spR * Math.sin(spPhi) * Math.cos(spTheta);
      sph[i * 3 + 1] = spR * Math.sin(spPhi) * Math.sin(spTheta);
      sph[i * 3 + 2] = spR * Math.cos(spPhi);
    }

    return { source: src, scatter: sct, sphere: sph, live: new Float32Array(src) };
  }, []);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    const p = scrollState.tl?.progress() ?? 0;

    if (
      !groupRef.current     ||
      !mainRingRef.current  ||
      !outerRingRef.current ||
      !innerRingRef.current
    ) return;

    mainRingRef.current.rotation.z  += delta * 0.38;
    outerRingRef.current.rotation.z -= delta * 0.19;
    innerRingRef.current.rotation.x += delta * 0.56;

    const arc = Math.sin(p * Math.PI);
    groupRef.current.rotation.y = p * Math.PI * 2.5;
    groupRef.current.rotation.x = arc * 0.65;
    groupRef.current.position.x = arc * 2.4;
    groupRef.current.position.z = Math.sin(p * Math.PI * 2) * 0.45;

    const pulse = 1 + Math.sin(t * 1.85) * 0.032;
    groupRef.current.scale.setScalar(pulse);

    tempColor.copy(colorOrange).lerp(colorRed, arc * 0.9);

    const ringFade = 1 - smoothstep(p, 0.20, 0.30);
    const applyRing = (m: THREE.Mesh) => {
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.color.copy(tempColor);
      mat.transparent = true;
      mat.opacity = ringFade;
    };
    applyRing(mainRingRef.current);
    applyRing(outerRingRef.current);
    applyRing(innerRingRef.current);

    if (particlesRef.current) {
      const explode = smoothstep(p, 0.20, 0.56);
      const reform  = smoothstep(p, 0.56, 0.88);

      const geo = particlesRef.current.geometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;

      for (let i = 0; i < N * 3; i++) {
        const mid = source[i] + (scatter[i] - source[i]) * explode;
        arr[i] = mid + (sphere[i] - mid) * reform;
      }
      pos.needsUpdate = true;

      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.copy(tempColor);
      mat.opacity = Math.min(1, smoothstep(p, 0.14, 0.28) * 1.8);
      mat.size = 0.018 + reform * 0.014;
    }
  });

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[live, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ff6b00"
          size={0.018}
          transparent
          opacity={0}
          sizeAttenuation
        />
      </points>

      <group ref={groupRef}>
        <mesh ref={outerRingRef} rotation={[Math.PI / 7, 0, 0]}>
          <torusGeometry args={[2.55, 0.020, 16, 130]} />
          <meshBasicMaterial color="#ff6b00" />
        </mesh>

        <mesh ref={mainRingRef}>
          <torusGeometry args={[1.72, 0.058, 32, 200]} />
          <meshBasicMaterial color="#ff6b00" />
        </mesh>

        <mesh ref={innerRingRef} rotation={[0, Math.PI / 5, 0]}>
          <torusGeometry args={[1.02, 0.038, 16, 90]} />
          <meshBasicMaterial color="#ff6b00" />
        </mesh>

        <mesh>
          <torusGeometry args={[1.72, 0.32, 6, 80]} />
          <meshBasicMaterial color="#ff4400" transparent opacity={0.045} />
        </mesh>
      </group>
    </>
  );
}
