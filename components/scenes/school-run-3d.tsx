"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import { lerp } from "@/lib/motion";
import { PIGGY_CYAN, timeline } from "./school-run";

/* ------------------------------------------------------------------ */
/*  The only WebGL scene on the site. Loaded with next/dynamic         */
/*  (ssr: false), desktop only, when the chapter is near the viewport. */
/*  Everything is built from primitives: a few KB, no model licences.  */
/* ------------------------------------------------------------------ */

const HOME = new THREE.Vector3(-3.4, 0, 3.6);
const SCHOOL = new THREE.Vector3(3.2, 0, -3.6);

const curve = new THREE.CatmullRomCurve3([
  HOME,
  new THREE.Vector3(-3.2, 0, 1.2),
  new THREE.Vector3(-0.6, 0, 0.9),
  new THREE.Vector3(0.2, 0, -1.2),
  new THREE.Vector3(2.6, 0, -1.6),
  SCHOOL,
]);

const BLOCKS: [number, number, number, number][] = [
  // x, z, width/depth, height
  [-1.6, 3.1, 1.2, 0.6],
  [1.4, 2.6, 1.6, 1.1],
  [3.4, 1.4, 1.1, 0.7],
  [-1.8, -1.2, 1.3, 1.3],
  [-3.6, -2.8, 1.2, 0.8],
  [0.8, -3.6, 1.4, 0.9],
  [1.6, 0.6, 1.0, 0.5],
];

export default function SchoolRun3D({ progress }: { progress: MotionValue<number> }) {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 14, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <Scene progress={progress} />
    </Canvas>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const sun = React.useRef<THREE.DirectionalLight>(null);
  const ambient = React.useRef<THREE.AmbientLight>(null);

  useFrame(() => {
    const m = timeline.morning(progress.get());
    if (sun.current) {
      sun.current.intensity = lerp(0.4, 2.2, m);
      sun.current.position.set(lerp(-8, 4, m), lerp(1.5, 9, m), 4);
    }
    if (ambient.current) ambient.current.intensity = lerp(0.35, 0.9, m);
  });

  return (
    <>
      <ambientLight ref={ambient} />
      <directionalLight ref={sun} color="#ffd9b0" />
      <mesh rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#2a2733" />
      </mesh>
      {BLOCKS.map(([x, z, s, h], i) => (
        <mesh key={i} position={[x, h / 2, z]}>
          <boxGeometry args={[s, h, s * 0.8]} />
          <meshStandardMaterial color="#3a3644" />
        </mesh>
      ))}
      <Road />
      <Route progress={progress} />
      <House />
      <School progress={progress} />
      <Cab progress={progress} />
    </>
  );
}

function Road() {
  const geometry = React.useMemo(() => new THREE.TubeGeometry(curve, 160, 0.32, 8, false), []);
  return (
    <mesh geometry={geometry} scale={[1, 0.05, 1]}>
      <meshStandardMaterial color="#1b1a20" />
    </mesh>
  );
}

/** The accent route draws itself with a drawRange on the tube's index. */
function Route({ progress }: { progress: MotionValue<number> }) {
  const geometry = React.useMemo(() => new THREE.TubeGeometry(curve, 200, 0.07, 6, false), []);
  const accent = React.useMemo(
    () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#c6f432",
    []
  );
  const total = geometry.index ? geometry.index.count : 0;
  const perSegment = 6 * 6; // radialSegments * 6 indices per segment

  useFrame(() => {
    const t = timeline.route(progress.get());
    const count = Math.floor((t * total) / perSegment) * perSegment;
    geometry.setDrawRange(0, count);
  });

  return (
    <mesh geometry={geometry} position-y={0.04}>
      <meshBasicMaterial color={accent} />
    </mesh>
  );
}

function House() {
  return (
    <group position={[HOME.x - 0.7, 0, HOME.z + 0.2]}>
      <mesh position-y={0.3}>
        <boxGeometry args={[0.7, 0.6, 0.7]} />
        <meshStandardMaterial color="#e9e2d4" />
      </mesh>
      <mesh position-y={0.82} rotation-y={Math.PI / 4}>
        <coneGeometry args={[0.6, 0.45, 4]} />
        <meshStandardMaterial color="#b4553a" />
      </mesh>
    </group>
  );
}

function School({ progress }: { progress: MotionValue<number> }) {
  const flag = React.useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!flag.current) return;
    const arrived = timeline.car(progress.get()) >= 1;
    flag.current.scale.y = arrived ? 1 + Math.sin(clock.elapsedTime * 4) * 0.08 : 1;
    (flag.current.material as THREE.MeshStandardMaterial).color.set(arrived ? PIGGY_CYAN : "#e9e2d4");
  });
  return (
    <group position={[SCHOOL.x + 0.9, 0, SCHOOL.z - 0.3]}>
      <mesh position-y={0.45}>
        <boxGeometry args={[1.6, 0.9, 0.9]} />
        <meshStandardMaterial color="#e9e2d4" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.7]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh ref={flag} position={[0.17, 1.42, 0]}>
        <boxGeometry args={[0.32, 0.2, 0.02]} />
        <meshStandardMaterial color="#e9e2d4" />
      </mesh>
    </group>
  );
}

/** A small, rounded, toy-like cab — kids ride in it. */
function Cab({ progress }: { progress: MotionValue<number> }) {
  const group = React.useRef<THREE.Group>(null);
  const body = React.useRef<THREE.Group>(null);
  const wheels = React.useRef<THREE.Group>(null);
  const last = React.useRef(0);

  useFrame(() => {
    const p = progress.get();
    const t = timeline.car(p);
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(Math.min(t, 0.999));
    const tanAhead = curve.getTangentAt(Math.min(t + 0.03, 0.999));
    if (group.current) {
      group.current.position.set(pos.x, 0, pos.z);
      group.current.rotation.y = Math.atan2(tan.x, tan.z);
      group.current.visible = p > 0.12;
    }
    if (body.current) {
      // Lean into the curve: sign of the turn × how sharp it is.
      const turn = tan.x * tanAhead.z - tan.z * tanAhead.x;
      body.current.rotation.z = THREE.MathUtils.clamp(-turn * 4, -0.12, 0.12);
    }
    if (wheels.current) {
      const delta = (t - last.current) * curve.getLength();
      wheels.current.children.forEach((w) => (w.rotation.x += delta / 0.14));
    }
    last.current = t;
  });

  return (
    <group ref={group} scale={0.75}>
      <group ref={body} position-y={0.32}>
        <RoundedBox args={[0.78, 0.36, 1.25]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color="#f2eee6" />
        </RoundedBox>
        <RoundedBox args={[0.66, 0.3, 0.66]} radius={0.12} smoothness={4} position={[0, 0.28, -0.08]}>
          <meshStandardMaterial color="#1c1b22" />
        </RoundedBox>
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.8, 0.08, 1.2]} />
          <meshStandardMaterial color={PIGGY_CYAN} />
        </mesh>
      </group>
      <group ref={wheels}>
        {[
          [-0.38, 0.14, 0.38],
          [0.38, 0.14, 0.38],
          [-0.38, 0.14, -0.38],
          [0.38, 0.14, -0.38],
        ].map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.14, 0.14, 0.1, 16]} />
            <meshStandardMaterial color="#111" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
