'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { SVGLoader, type SVGResult } from 'three/examples/jsm/loaders/SVGLoader.js';
import * as THREE from 'three';

const TILT_RANGE_X = 0.15;
const TILT_RANGE_Y = 0.15;
const LERP = 0.05;
const IDLE_REVOLUTION_SECONDS = 25;

// Viewport-aware composition. Desktop offsets the monogram to the right so
// the bottom-left text overlay balances; portrait centers it and lifts it
// into the upper half, leaving the lower half clear for the text.
const PORTRAIT_ASPECT_THRESHOLD = 1.0;
const COMPOSITION = {
  desktop: { targetHeight: 11, xOffset: 3, yOffset: 0 },
  portrait: { targetHeight: 7, xOffset: 0, yOffset: 2.5 },
} as const;

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: none)').matches;
}

function Monogram() {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const touchModeRef = useRef(false);
  const svg = useLoader(SVGLoader, '/assets/svg/personal_logo_white.svg') as SVGResult;
  const { viewport } = useThree();

  const shapes = useMemo(() => svg.paths.flatMap((p) => p.toShapes(true)), [svg]);

  const { centerOffset, sourceHeight } = useMemo(() => {
    const bbox = new THREE.Box2();
    shapes.forEach((shape) => {
      const pts = shape.getPoints(24);
      pts.forEach((p) => bbox.expandByPoint(p));
    });
    const size = new THREE.Vector2();
    bbox.getSize(size);
    const center = new THREE.Vector2();
    bbox.getCenter(center);
    return { centerOffset: center, sourceHeight: size.y };
  }, [shapes]);

  const composition =
    viewport.aspect < PORTRAIT_ASPECT_THRESHOLD ? COMPOSITION.portrait : COMPOSITION.desktop;
  const scale = composition.targetHeight / sourceHeight;

  useEffect(() => {
    touchModeRef.current = isTouchDevice();
    if (touchModeRef.current) return;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      target.current = { x: -y * TILT_RANGE_X, y: x * TILT_RANGE_Y };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    if (touchModeRef.current) {
      g.rotation.y += (delta * Math.PI * 2) / IDLE_REVOLUTION_SECONDS;
    } else {
      g.rotation.x += (target.current.x - g.rotation.x) * LERP;
      g.rotation.y += (target.current.y - g.rotation.y) * LERP;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, -scale, scale]} position={[composition.xOffset, composition.yOffset, 0]}>
      <group position={[-centerOffset.x, -centerOffset.y, -3]}>
        {shapes.map((shape, i) => (
          <mesh key={i}>
            <extrudeGeometry
              args={[
                shape,
                {
                  depth: 6,
                  bevelEnabled: true,
                  bevelSegments: 16,
                  bevelSize: 0.55,
                  bevelThickness: 0.55,
                  curveSegments: 32,
                },
              ]}
            />
            <meshStandardMaterial
              color="#eeeeee"
              metalness={1.0}
              roughness={0.18}
              envMapIntensity={.85}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Fires once, after the scene's async assets (the SVG paths and the HDRI
 * environment) have resolved and the Suspense subtree commits. Drives the
 * fade-in so the monogram eases in instead of popping.
 */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

export function HeroMonogram({ className = '' }: { className?: string }) {
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div
      className={`pointer-events-none transition-opacity duration-700 ease-out ${
        ready ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.15} />
        <Suspense fallback={null}>
          <Monogram />
          <Environment preset="warehouse" />
          <ReadySignal onReady={handleReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
