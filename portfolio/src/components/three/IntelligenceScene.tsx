"use client";

/**
 * React Compiler's immutability rule flags the R3F animation model, which
 * mutates Three.js objects (uniform values, camera transforms) inside the frame
 * loop. Those objects are owned by the renderer, not by React — they are not
 * render state, and no re-render is intended or needed when they change.
 *
 * Everything below therefore mutates refs and Three.js instances only inside
 * `useFrame`, never during render, and never calls a React setter per frame.
 */
/* eslint-disable react-hooks/immutability */

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The intelligence core.
 *
 * A nested icosahedron with a shader that pulses from within, surrounded by a
 * sparse node field and the signal paths between them. Motion is deliberately
 * slow â€” this should read as a held breath, not a screensaver.
 *
 * Everything is allocated once in useMemo. The frame loop mutates uniforms and
 * transforms only; it never allocates and never triggers a React render.
 */

const CORE_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vFresnel;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mvPosition.xyz);

    // Fresnel rim: brightens where the surface turns away from the eye.
    vFresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.5);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const CORE_FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3  uColor;
  uniform vec3  uDeep;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vFresnel;

  void main() {
    // Slow signal travelling up the core.
    float wave = sin((vNormal.y * 6.0) - uTime * 0.55) * 0.5 + 0.5;

    // Base is near-black so the core reads as an object, not a lamp.
    vec3 base = mix(uDeep, uColor, wave * 0.35);

    gl_FragColor = vec4(base + uColor * vFresnel * 0.9, 1.0);
  }
`;

interface CoreProps {
  color: string;
  reducedMotion: boolean;
}

function Core({ color, reducedMotion }: CoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Stable for the lifetime of the component. The frame loop mutates
  // `uTime.value` every tick — this object is owned by the renderer, not by
  // React, so no re-render is needed when it changes.
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uDeep: { value: new THREE.Color("#0a0a0b") },
    }),
    [color],
  );

  useFrame((state, delta) => {
    if (reducedMotion) return;

    uniforms.uTime.value = state.clock.elapsedTime;

    const mesh = meshRef.current;
    if (mesh) {
      mesh.rotation.y += delta * 0.045;
      mesh.rotation.x = Math.sin(state.clock.elapsedTime * 0.14) * 0.08;
    }
    // Counter-rotating shell reads as internal structure.
    const inner = innerRef.current;
    if (inner) {
      inner.rotation.y -= delta * 0.075;
      inner.rotation.z += delta * 0.03;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <shaderMaterial
          vertexShader={CORE_VERT}
          fragmentShader={CORE_FRAG}
          uniforms={uniforms}
          transparent
          opacity={0.95}
        />
      </mesh>

      <mesh ref={innerRef} scale={0.62}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.16} />
      </mesh>

      {/* Thin orbital rings â€” geometry only, no textures or post-processing. */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[1.85, 0.004, 3, 96]} />
        <meshBasicMaterial color={color} transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, Math.PI / 3, 0]}>
        <torusGeometry args={[2.25, 0.003, 3, 96]} />
        <meshBasicMaterial color="#f2efe9" transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

/**
 * Sparse node field with connecting paths â€” "intelligence flowing through
 * systems". Positions and links are generated once into typed arrays and handed
 * straight to BufferAttributes, so no objects are created during animation.
 */
function NodeField({
  count,
  color,
  reducedMotion,
}: {
  count: number;
  color: string;
  reducedMotion: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, links } = useMemo(() => {
    const positions = new Float32Array(count * 3);

    // Even shell distribution so the field never clumps.
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / Math.max(count - 1, 1)) * 2;
      const radius = 2.4 + Math.sin(i * 12.9898) * 0.55;
      const theta = i * 2.399963;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    }

    // Connect each node to its nearest neighbours â€” real structure, not noise.
    const NEIGHBOURS = 2;
    const seg: number[] = [];
    for (let i = 0; i < count; i++) {
      const distances: { j: number; d: number }[] = [];
      for (let j = 0; j < count; j++) {
        if (i === j) continue;
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        distances.push({ j, d: dx * dx + dy * dy + dz * dz });
      }
      distances.sort((a, b) => a.d - b.d);
      for (let k = 0; k < NEIGHBOURS && k < distances.length; k++) {
        const j = distances[k].j;
        seg.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2],
        );
      }
    }

    return { positions, links: new Float32Array(seg) };
  }, [count]);

  useFrame((state) => {
    if (reducedMotion || !pointsRef.current) return;
    // Barely perceptible drift â€” the field should feel almost stationary.
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={color}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[links, 3]}
            count={links.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f2efe9" transparent opacity={0.055} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

/** Pointer parallax. Reads a shared ref, so moving the mouse never re-renders React. */
function PointerRig({
  target,
  reducedMotion,
}: {
  target: React.MutableRefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}) {
  const { camera } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    // Frame-rate independent damping so the camera eases rather than snaps.
    const ease = 1 - Math.pow(0.001, delta);
    camera.position.x += (target.current.x * 0.42 - camera.position.x) * ease;
    camera.position.y += (target.current.y * 0.28 - camera.position.y) * ease;
    camera.lookAt(lookAt);
  });

  return null;
}

export interface SceneProps {
  color: string;
  particleCount: number;
  dpr: [number, number];
  reducedMotion: boolean;
  pointerTarget: React.MutableRefObject<{ x: number; y: number }>;
}

export default function IntelligenceScene({
  color,
  particleCount,
  dpr,
  reducedMotion,
  pointerTarget,
}: SceneProps) {
  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        alpha: true,
        stencil: false,
      }}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Core color={color} reducedMotion={reducedMotion} />
      {particleCount > 0 && (
        <NodeField count={particleCount} color={color} reducedMotion={reducedMotion} />
      )}
      <PointerRig target={pointerTarget} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
