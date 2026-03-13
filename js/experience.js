import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { getElapsedTime } from "./elapsedTime.js";
import { applyColorField, createBaseHSL, createLightnessOffsets, ColorFieldConfig } from "./colorField.js";
import { ExperienceConfig } from "./sceneConfig.js";
import { particleVertexShader, particleFragmentShader } from "./particleShader.js";

/* --------------------------
  Config
--------------------------- */
// -- Particle Init
const MAX_PARTICLES = ExperienceConfig.MAX_PARTICLES;
const EXTRUDE_DEPTH = 2;
const MORPH_SPEED = 7;
const NOISE_RADIUS = 120;
// -- Camera, Position
const BBOX_SIZE = 275;
const CAMERA_DISTANCE = 375;

/* --------------------------
  State
--------------------------- */
const morphTargets = [];
let noiseTarget = [];
// =
let currentIndex = 0;
let nextIndex = 0;
// =
let morphPhase = "idle"; // idle | to-noise | to-shape
let morphProgress = 0;
// =
let pointSystem;
const clock = new THREE.Clock();
// =
let basePositions;
let currentBase;
let morphFrom = null;
let noiseSeeds;
let jitterAmps; // per-particle drift-radius multiplier (set in createPoints)
// =
let jitterStrength = .7;
// =
let baseHSL = null;
let lightnessOffsets = null;
// =
let lastColorUpdate = 0;
// =
let orbitPhase; // per-particle initial orbit angle (radians)
let orbitSpeed; // per-particle orbital angular velocity (rad/s)

/* --------------------------
  Three.js Setup
--------------------------- */
const scene = new THREE.Scene();
// scene.background = new THREE.Color(BACKGROUND_COLOR);

const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
camera.position.z = CAMERA_DISTANCE;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.LinearToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const container = document.querySelector("#particle-logo");
container.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

function resize() {
  const r = container.getBoundingClientRect();
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();

  renderer.setSize(r.width, r.height);
  composer.setSize(r.width, r.height);

  if (pointSystem) {
    pointSystem.material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
  }
}
resize();
window.addEventListener("resize", resize);

/* --------------------------
  Init
--------------------------- */
init();

async function init() {
  const loader = new SVGLoader();
  const svgSelectors = ["#as-svg", "#jmi-svg", "#pu-svg"];

  for (const sel of svgSelectors) {
    const el = document.querySelector(sel);
    if (!el) continue;

    const svgData = loader.parse(el.innerHTML.trim());
    const geom = svgToMergedBufferGeometry(svgData);
    if (!geom) continue;

    scaleGeometryToBox(geom, BBOX_SIZE);
    morphTargets.push(sampleMergedGeometry(geom));
    geom.dispose();
  }

  normalizeAndShuffleTargets();

  noiseTarget = generateNoiseBlob(MAX_PARTICLES);

  createPoints(noiseTarget);

  startMorphToNoise();
  setupScrollTriggers();
  animate();
}

/* --------------------------
  Geometry Helpers
--------------------------- */
function svgToMergedBufferGeometry(svgData) {
  const geoms = [];
  svgData.paths.forEach(p => {
    SVGLoader.createShapes(p).forEach(s => {
      const g = new THREE.ExtrudeGeometry(s, {
        depth: EXTRUDE_DEPTH,
        bevelEnabled: false
      });
      g.scale(1, -1, 1);
      geoms.push(g);
    });
  });
  return geoms.length
    ? BufferGeometryUtils.mergeBufferGeometries(geoms, true)
    : null;
}

function scaleGeometryToBox(geom, size) {
  geom.computeBoundingBox();
  const b = geom.boundingBox;
  const s = new THREE.Vector3();
  b.getSize(s);

  const scale = size / Math.max(s.x, s.y, s.z);
  const c = new THREE.Vector3();
  b.getCenter(c);

  geom.applyMatrix4(new THREE.Matrix4().makeTranslation(-c.x, -c.y, -c.z));
  geom.applyMatrix4(new THREE.Matrix4().makeScale(scale, scale, scale));
}

function sampleMergedGeometry(geom) {
  const sampler = new MeshSurfaceSampler(new THREE.Mesh(geom)).build();
  const buf = new Float32Array(MAX_PARTICLES * 3);
  const v = new THREE.Vector3();

  for (let i = 0; i < MAX_PARTICLES; i++) {
    sampler.sample(v);
    buf[i * 3]     = v.x;
    buf[i * 3 + 1] = v.y;
    buf[i * 3 + 2] = v.z;
  }
  return buf;
}

function normalizeAndShuffleTargets() {
  const count = MAX_PARTICLES;
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const ai = i * 3;
    const aj = j * 3;

    morphTargets.forEach(t => {
      const tx = t[ai], ty = t[ai + 1], tz = t[ai + 2];
      t[ai] = t[aj];
      t[ai + 1] = t[aj + 1];  
      t[ai + 2] = t[aj + 2];
      t[aj] = tx;     
      t[aj + 1] = ty;           
      t[aj + 2] = tz;
    });
  }
}

/* --------------------------
  Generate Transitional Noise
--------------------------- */
function generateNoiseBlob(count) {
  const buf = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = NOISE_RADIUS * Math.pow(Math.random(), 0.4);
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI;
    buf[i * 3]     = r * Math.sin(b) * Math.cos(a);
    buf[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
    buf[i * 3 + 2] = (Math.random() - 0.5) * NOISE_RADIUS;
  }
  return buf;
}

/* --------------------------
  Points
--------------------------- */
function createPoints(initial) {
  const g = new THREE.BufferGeometry();
  const buf = initial.slice();

  g.setAttribute("position", new THREE.BufferAttribute(buf, 3));

  noiseSeeds = new Float32Array(buf.length).map(() => Math.random() * 10);
  basePositions = buf.slice();
  currentBase = buf.slice();

  // -- Create per-point color buffer
  baseHSL = createBaseHSL(ExperienceConfig.COLOR);
  lightnessOffsets = createLightnessOffsets(MAX_PARTICLES, ColorFieldConfig.LIGHTNESS_VARIATION_RANGE);

  const colors = new Float32Array(initial.length * 3);
  applyColorField({
    positions: basePositions,
    colors,
    baseHSL,
    lightnessOffsets,
    time: 0,
    config: ColorFieldConfig
  });
  g.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  // Split into anchors (tight to logo shape) and drifters (orbital halo cloud).
  // Anchors (aType 1.0): large blobs that preserve the readable logo form.
  // Drifters (aType 0.0): medium glows that orbit outward, forming the liquid halo.
  // jitterAmps drives per-particle drift radius in updateMorph — see ExperienceConfig.
  const types = new Float32Array(MAX_PARTICLES);
  jitterAmps   = new Float32Array(MAX_PARTICLES);

  for (let j = 0; j < MAX_PARTICLES; j++) {
    const isAnchor = Math.random() < ExperienceConfig.ANCHOR_RATIO;
    types[j]      = isAnchor ? 1.0 : 0.0;
    jitterAmps[j] = isAnchor
      ? Math.random() * ExperienceConfig.ANCHOR_JITTER_MAX
      : ExperienceConfig.DRIFT_JITTER_MIN
        + Math.random() * (ExperienceConfig.DRIFT_JITTER_MAX - ExperienceConfig.DRIFT_JITTER_MIN);
  }
  g.setAttribute("aType", new THREE.BufferAttribute(types, 1));

  // Per-particle orbit params — each drifter traces a unique circular arc.
  // Anchors (jAmp ≈ 0) orbit with near-zero radius regardless of phase/speed.
  orbitPhase = new Float32Array(MAX_PARTICLES);
  orbitSpeed = new Float32Array(MAX_PARTICLES);
  for (let j = 0; j < MAX_PARTICLES; j++) {
    orbitPhase[j] = Math.random() * Math.PI * 2;
    orbitSpeed[j] = ExperienceConfig.ORBIT_SPEED_MIN
      + Math.random() * (ExperienceConfig.ORBIT_SPEED_MAX - ExperienceConfig.ORBIT_SPEED_MIN);
  }

  const mat = new THREE.ShaderMaterial({
    vertexShader:   particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uPointSizeBase:   { value: ExperienceConfig.POINT_SIZE_BASE },
      uRungSizeMult:    { value: ExperienceConfig.RUNG_SIZE_MULT },
      uStrandSizeMult:  { value: ExperienceConfig.STRAND_SIZE_MULT },
      uRungAlpha:    { value: ExperienceConfig.RUNG_ALPHA },
      uStrandAlpha:  { value: ExperienceConfig.STRAND_ALPHA },
      // Orb core — universal bright center for all particle types
      uCoreRadius:   { value: ExperienceConfig.ORB_CORE_RADIUS },
      uCoreStrength: { value: ExperienceConfig.ORB_CORE_STRENGTH },
      // HiDPI compensation: keeps CSS-pixel size consistent across 1×/2× DPR devices
      uPixelRatio:   { value: renderer.getPixelRatio() },
    },
    transparent: true,
    depthWrite:  false,
  });

  pointSystem = new THREE.Points(g, mat);
  scene.add(pointSystem);
}

/* --------------------------
  Morph Control
--------------------------- */
function startMorphToNoise() {
  morphFrom = currentBase.slice();
  morphProgress = 0;
  morphPhase = "to-noise";
}

function startMorphToShape(index) {
  nextIndex = index;
  morphFrom = currentBase.slice();
  morphProgress = 0;
  morphPhase = "to-shape";
}

/* --------------------------
  Update Morph
--------------------------- */
function updateMorph(dt) {
  const now = getElapsedTime();
  const pos = pointSystem.geometry.attributes.position.array;

  morphProgress = THREE.MathUtils.damp(morphProgress, 1, MORPH_SPEED, dt);

  jitterStrength = THREE.MathUtils.damp(
    jitterStrength,
    morphPhase === "idle" ? 1 : 0,
    6,
    dt
  );

  for (let i = 0; i < pos.length; i += 3) {
    let bx = basePositions[i];
    let by = basePositions[i + 1];
    let bz = basePositions[i + 2];

    if (morphPhase === "to-noise") {
      bx = THREE.MathUtils.lerp(morphFrom[i],     noiseTarget[i],     morphProgress);
      by = THREE.MathUtils.lerp(morphFrom[i + 1], noiseTarget[i + 1], morphProgress);
      bz = THREE.MathUtils.lerp(morphFrom[i + 2], noiseTarget[i + 2], morphProgress);
    } else if (morphPhase === "to-shape") {
      const t = morphTargets[nextIndex];
      bx = THREE.MathUtils.lerp(morphFrom[i],     t[i],     morphProgress);
      by = THREE.MathUtils.lerp(morphFrom[i + 1], t[i + 1], morphProgress);
      bz = THREE.MathUtils.lerp(morphFrom[i + 2], t[i + 2], morphProgress);
    }

    // Per-particle circular orbital motion.
    // Anchors (jAmp ≈ 0) orbit with near-zero radius → stay tight to logo shape.
    // Drifters orbit at IDLE_JITTER × jitterAmps[ji] radius → smooth predictable arcs.
    // Scaled by jitterStrength (0 during morph → clean transitions; 1 at idle → full orbit).
    const ji    = i / 3;
    const jAmp  = ExperienceConfig.IDLE_JITTER * jitterAmps[ji];
    const angle = orbitPhase[ji] + now * orbitSpeed[ji];
    const jx = Math.cos(angle) * jAmp;
    const jy = Math.sin(angle) * jAmp;
    const jz = Math.sin(angle * 0.3 + orbitPhase[ji]) * jAmp * 0.25; // gentle elliptic z bob

    pos[i]     = bx + jx * jitterStrength;
    pos[i + 1] = by + jy * jitterStrength;
    pos[i + 2] = bz + jz * jitterStrength;

    // Track pre-jitter interpolated position for clean morph interruption
    currentBase[i]     = bx;
    currentBase[i + 1] = by;
    currentBase[i + 2] = bz;
  }

  if (morphProgress > 0.999 && morphPhase !== "idle") {
    if (morphPhase === "to-noise") {
      for (let i = 0; i < basePositions.length; i++) {
        basePositions[i] = noiseTarget[i];
      }
    } else if (morphPhase === "to-shape") {
      const t = morphTargets[nextIndex];
      for (let i = 0; i < basePositions.length; i++) {
        basePositions[i] = t[i];
      }
    }
    morphPhase = "idle";
    currentIndex = nextIndex;
  }
  pointSystem.geometry.attributes.position.needsUpdate = true;

  // -- Color drift
  if (now - lastColorUpdate >= ColorFieldConfig.COLOR_UPDATE_INTERVAL) {
    const colors = pointSystem.geometry.attributes.color.array;
    applyColorField({
      positions: pos,
      colors,
      baseHSL,
      lightnessOffsets,
      time: now,
      config: ColorFieldConfig
    });
    pointSystem.geometry.attributes.color.needsUpdate = true;
    lastColorUpdate = now;
  }
}

/* --------------------------
  ScrollTriggers
--------------------------- */
function setupScrollTriggers() {
  if (typeof ScrollTrigger === "undefined") {
    console.warn("ScrollTrigger not found — scroll-based morphing disabled.");
    return;
  }

  document.querySelectorAll(".noise-trigger").forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: startMorphToNoise,
      onEnterBack: startMorphToNoise
    });
  });

  document.querySelectorAll(".shape-trigger").forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top center",
      end: "bottom center",
      onEnter: () => startMorphToShape(i),
      onEnterBack: () => startMorphToShape(i)
    });
  });
}

/* --------------------------
  Animation Loop
--------------------------- */
let animating = false; 
function animate() {
  updateMorph(clock.getDelta());
  composer.render();
}
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (!animating) {
        animating = true;
        renderer.setAnimationLoop(animate);
      }
    } else {
      animating = false;
      renderer.setAnimationLoop(null);
    }
  });
}, { threshold: 0.01 });
observer.observe(container);   