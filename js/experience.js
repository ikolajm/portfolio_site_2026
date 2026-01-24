import * as THREE from "three";
import { SVGLoader } from "three/addons/loaders/SVGLoader.js";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

/* --------------------------
   Config
--------------------------- */
const MAX_PARTICLES = 7500;
const PARTICLE_SIZE = 1;
const PARTICLE_COLOR = "#E4E6E7";
const EXTRUDE_DEPTH = 2;
const MORPH_SPEED = 7.5;
const BBOX_SIZE = 300;

const NOISE_RADIUS = 130;
const IDLE_JITTER = 2;

/* --------------------------
   Three.js Setup
--------------------------- */
const container = document.querySelector("#particle-logo");
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 1, 2000);
camera.position.z = 400;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
container.appendChild(renderer.domElement);

function resize() {
  const r = container.getBoundingClientRect();
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
  renderer.setSize(r.width, r.height);
}
resize();
window.addEventListener("resize", resize);

/* --------------------------
   State
--------------------------- */
const morphTargets = [];
let noiseTarget = [];

let currentIndex = 0;
let nextIndex = 0;

let morphPhase = "idle"; // idle | to-noise | to-shape
let morphProgress = 0;

let pointSystem;
const clock = new THREE.Clock();

let basePositions;
let morphFrom = null;
let noiseSeeds;

let jitterStrength = .3;

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
  }

  normalizeAndShuffleTargets();

  noiseTarget = generateNoiseBlob(morphTargets[0].length);

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
  const pts = [];
  const v = new THREE.Vector3();

  for (let i = 0; i < MAX_PARTICLES; i++) {
    sampler.sample(v);
    pts.push(v.clone());
  }
  return pts;
}

function normalizeAndShuffleTargets() {
  const count = Math.min(...morphTargets.map(t => t.length));
  morphTargets.forEach(t => (t.length = count));

  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    morphTargets.forEach(t => ([t[i], t[j]] = [t[j], t[i]]));
  }
}

function generateNoiseBlob(count) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const r = NOISE_RADIUS * Math.pow(Math.random(), 0.4);
    const a = Math.random() * Math.PI * 2;
    const b = Math.random() * Math.PI;
    pts.push(
      new THREE.Vector3(
        r * Math.sin(b) * Math.cos(a),
        r * Math.sin(b) * Math.sin(a),
        (Math.random() - 0.5) * NOISE_RADIUS
      )
    );
  }
  return pts;
}

/* --------------------------
   Points
--------------------------- */
function createPoints(initial) {
  const g = new THREE.BufferGeometry();
  const buf = new Float32Array(initial.length * 3);

  initial.forEach((p, i) => buf.set([p.x, p.y, p.z], i * 3));
  g.setAttribute("position", new THREE.BufferAttribute(buf, 3));

  noiseSeeds = new Float32Array(buf.length).map(() => Math.random() * 10);
  basePositions = buf.slice();

  const mat = new THREE.PointsMaterial({
    color: PARTICLE_COLOR,
    size: PARTICLE_SIZE
  });

  pointSystem = new THREE.Points(g, mat);
  scene.add(pointSystem);
}

/* --------------------------
   Morph Control
--------------------------- */
function startMorphToNoise() {
  morphFrom = basePositions.slice();
  morphProgress = 0;
  morphPhase = "to-noise";
}

function startMorphToShape(index) {
  nextIndex = index;
  morphFrom = basePositions.slice();
  morphProgress = 0;
  morphPhase = "to-shape";
}

/* --------------------------
   Update
--------------------------- */
function updateMorph(dt) {
  const pos = pointSystem.geometry.attributes.position.array;

  morphProgress = THREE.MathUtils.damp(morphProgress, 1, MORPH_SPEED, dt);

  jitterStrength = THREE.MathUtils.damp(
    jitterStrength,
    morphPhase === "idle" ? 1 : 0,
    6,
    dt
  );

  for (let i = 0; i < pos.length; i += 3) {
    const idx = i / 3;

    let bx = basePositions[i];
    let by = basePositions[i + 1];
    let bz = basePositions[i + 2];

    if (morphPhase === "to-noise") {
      bx = THREE.MathUtils.lerp(morphFrom[i], noiseTarget[idx].x, morphProgress);
      by = THREE.MathUtils.lerp(morphFrom[i + 1], noiseTarget[idx].y, morphProgress);
      bz = THREE.MathUtils.lerp(morphFrom[i + 2], noiseTarget[idx].z, morphProgress);
    }

    if (morphPhase === "to-shape") {
      const t = morphTargets[nextIndex][idx];
      bx = THREE.MathUtils.lerp(morphFrom[i], t.x, morphProgress);
      by = THREE.MathUtils.lerp(morphFrom[i + 1], t.y, morphProgress);
      bz = THREE.MathUtils.lerp(morphFrom[i + 2], t.z, morphProgress);
    }

    const jx = Math.sin(clock.elapsedTime + noiseSeeds[i]) * IDLE_JITTER;
    const jy = Math.cos(clock.elapsedTime + noiseSeeds[i + 1]) * IDLE_JITTER;
    const jz = Math.sin(clock.elapsedTime + noiseSeeds[i + 2]) * IDLE_JITTER * 0.5;

    pos[i] = bx + jx * jitterStrength;
    pos[i + 1] = by + jy * jitterStrength;
    pos[i + 2] = bz + jz * jitterStrength;

    basePositions[i]     = bx;
    basePositions[i + 1] = by;
    basePositions[i + 2] = bz;
  }

  if (morphProgress > 0.999 && morphPhase !== "idle") {
    morphPhase = "idle";
    currentIndex = nextIndex;
  }

  pointSystem.geometry.attributes.position.needsUpdate = true;
}

/* --------------------------
   ScrollTriggers
--------------------------- */
function setupScrollTriggers() {
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
   Loop
--------------------------- */
function animate() {
  requestAnimationFrame(animate);
  updateMorph(clock.getDelta());
  renderer.render(scene, camera);
}