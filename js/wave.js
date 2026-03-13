import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import {
    createBaseHSL,
    createLightnessOffsets,
    applyColorField,
    ColorFieldConfig
} from "./colorField.js";
import { getElapsedTime } from "./elapsedTime.js";
import { WaveConfig, computeHelixLength } from "./sceneConfig.js";
import { particleVertexShader, particleFragmentShader } from "./particleShader.js";

/* --------------------------
   Config (derived from WaveConfig)
--------------------------- */
const HELIX_LENGTH   = computeHelixLength();         // responsive: 2.5× visible frustum width
const WAVE_SPEED     = (Math.PI * 2) / WaveConfig.LOOP_SECONDS; // rad/s; controls orbit traversal
const STRAND_PARTICLES = WaveConfig.STRAND_PARTICLES;
const RUNG_PARTICLES   = WaveConfig.RUNG_PARTICLES;
const PARTICLE_COUNT   = STRAND_PARTICLES * 2 + RUNG_PARTICLES;

/* --------------------------
   Three.js Setup
--------------------------- */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight);
camera.position.set(4, 2, 8);
camera.aspect = innerWidth / innerHeight;
camera.updateProjectionMatrix();
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.LinearToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const waveEl = document.getElementById("wave");
waveEl.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

/* --------------------------
   Helix Math
--------------------------- */
function getHelixPos(t, strand, time) {
    const x     = (t - 0.5) * HELIX_LENGTH;
    // WAVE_SPEED derived from WaveConfig.LOOP_SECONDS — adjust that value to
    // speed up or slow down the spiral traversal
    const angle = t * Math.PI * 2 * WaveConfig.HELIX_TWISTS
                  + strand * Math.PI
                  + time * WAVE_SPEED;
    const r     = WaveConfig.HELIX_RADIUS
                  + Math.sin(t * Math.PI * 3 + time * WAVE_SPEED * 0.7) * 0.25;
    const y     = Math.cos(angle) * r;
    const z     = Math.sin(angle) * r;
    return [x, y, z];
}

/* --------------------------
   Geometry & Per-Particle Metadata
--------------------------- */
const geometry  = new THREE.BufferGeometry();
const positions = new Float32Array(PARTICLE_COUNT * 3);
const colors    = new Float32Array(PARTICLE_COUNT * 3);
const types     = new Float32Array(PARTICLE_COUNT);   // 0.0 = strand, 1.0 = rung
// Per-particle: [tParam, helixIndex, noisePhase, noiseAmp]
const meta      = new Float32Array(PARTICLE_COUNT * 4);

let idx = 0;

// Strand particles (2 strands)
for (let strand = 0; strand < 2; strand++) {
    for (let i = 0; i < STRAND_PARTICLES; i++) {
        const t          = Math.random();
        const noisePhase = Math.random() * Math.PI * 2;
        const noiseAmp   = 0.02 + Math.random() * 0.15;
        const [x, y, z]  = getHelixPos(t, strand, 0);
        const scatter    = 0.12;

        positions[idx * 3]     = x + (Math.random() - 0.5) * scatter;
        positions[idx * 3 + 1] = y + (Math.random() - 0.5) * scatter;
        positions[idx * 3 + 2] = z + (Math.random() - 0.5) * scatter;

        types[idx] = 0; // strand particle — rendered as sparkle

        meta[idx * 4]     = t;
        meta[idx * 4 + 1] = strand;
        meta[idx * 4 + 2] = noisePhase;
        meta[idx * 4 + 3] = noiseAmp;

        idx++;
    }
}

// Rung / bridge particles connecting the two strands
for (let i = 0; i < RUNG_PARTICLES; i++) {
    const t          = Math.random();
    const lerpAlong  = Math.random();
    const noisePhase = Math.random() * Math.PI * 2;
    const noiseAmp   = 0.02 + Math.random() * 0.1;
    const [x0, y0, z0] = getHelixPos(t, 0, 0);
    const [x1, y1, z1] = getHelixPos(t, 1, 0);

    positions[idx * 3]     = x0 + (x1 - x0) * lerpAlong;
    positions[idx * 3 + 1] = y0 + (y1 - y0) * lerpAlong;
    positions[idx * 3 + 2] = z0 + (z1 - z0) * lerpAlong;

    types[idx] = 1; // rung particle — rendered as blobby bubble

    meta[idx * 4]     = t;
    meta[idx * 4 + 1] = 2 + lerpAlong; // 2+ flags rung; fractional part = lerp
    meta[idx * 4 + 2] = noisePhase;
    meta[idx * 4 + 3] = noiseAmp;

    idx++;
}

geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
geometry.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
geometry.setAttribute("aType",    new THREE.BufferAttribute(types, 1));

const posAttr   = geometry.attributes.position;
const colorAttr = geometry.attributes.color;

/* --------------------------
   Color Init (colorField)
--------------------------- */
const baseHSL         = createBaseHSL(WaveConfig.COLOR);
const lightnessOffsets = createLightnessOffsets(PARTICLE_COUNT, ColorFieldConfig.LIGHTNESS_VARIATION_RANGE);

// Seed initial colors so first frame isn't blank
applyColorField({
    positions: posAttr.array,
    colors:    colorAttr.array,
    baseHSL,
    lightnessOffsets,
    time:      0,
    config:    ColorFieldConfig
});
colorAttr.needsUpdate = true;

/* --------------------------
   Shader Material
   Uniforms are all driven by WaveConfig — adjust values there to tweak look.
--------------------------- */
const material = new THREE.ShaderMaterial({
    vertexShader:   particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
        // Point sizing
        uPointSizeBase:   { value: WaveConfig.POINT_SIZE_BASE },
        uRungSizeMult:    { value: WaveConfig.RUNG_SIZE_MULT },
        uStrandSizeMult:  { value: WaveConfig.STRAND_SIZE_MULT },
        // Opacity / appearance per particle type
        uRungAlpha:     { value: WaveConfig.RUNG_ALPHA },
        uStrandAlpha:   { value: WaveConfig.STRAND_ALPHA },
        // Orb core — universal bright center for all particle types
        uCoreRadius:    { value: WaveConfig.ORB_CORE_RADIUS },
        uCoreStrength:  { value: WaveConfig.ORB_CORE_STRENGTH },
        // HiDPI compensation: keeps CSS-pixel size consistent across 1×/2× DPR devices
        uPixelRatio:    { value: renderer.getPixelRatio() },
    },
    transparent: true,
    depthWrite:  false,
});

/* --------------------------
   Scene Object
--------------------------- */
const points = new THREE.Points(geometry, material);
points.rotation.x = WaveConfig.ROTATION_X;
points.rotation.z = WaveConfig.ROTATION_Z;
scene.add(points);

/* --------------------------
   Resize
--------------------------- */
window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
    material.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    // Note: HELIX_LENGTH and particle count are startup-computed and do not rebuild on resize.
    // Resize only updates the camera frustum and renderer/composer dimensions.
});

/* --------------------------
   Animation Loop
--------------------------- */
let lastColorUpdate = 0;

function animationLoop() {
    const time    = getElapsedTime();
    const posArray = posAttr.array;

    // -- Update helix positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const t          = meta[i * 4];
        const strandInfo = meta[i * 4 + 1];
        const noisePhase = meta[i * 4 + 2];
        const noiseAmp   = meta[i * 4 + 3];

        const nx = Math.sin(time * 0.7 + noisePhase + t * 5) * noiseAmp;
        const ny = Math.cos(time * 0.5 + noisePhase * 1.3 + t * 4) * noiseAmp;
        const nz = Math.sin(time * 0.4 + noisePhase * 0.7 + t * 3) * noiseAmp;

        if (strandInfo < 2) {
            const [x, y, z] = getHelixPos(t, strandInfo, time);
            posArray[i * 3]     = x + nx;
            posArray[i * 3 + 1] = y + ny;
            posArray[i * 3 + 2] = z + nz;
        } else {
            const lerpAlong     = strandInfo - 2;
            const [x0, y0, z0]  = getHelixPos(t, 0, time);
            const [x1, y1, z1]  = getHelixPos(t, 1, time);
            posArray[i * 3]     = x0 + (x1 - x0) * lerpAlong + nx;
            posArray[i * 3 + 1] = y0 + (y1 - y0) * lerpAlong + ny;
            posArray[i * 3 + 2] = z0 + (z1 - z0) * lerpAlong + nz;
        }
    }
    posAttr.needsUpdate = true;

    // -- Color drift (throttled via ColorFieldConfig.COLOR_UPDATE_INTERVAL)
    if (time - lastColorUpdate >= ColorFieldConfig.COLOR_UPDATE_INTERVAL) {
        applyColorField({
            positions: posArray,
            colors:    colorAttr.array,
            baseHSL,
            lightnessOffsets,
            time,
            config:    ColorFieldConfig
        });
        colorAttr.needsUpdate = true;
        lastColorUpdate = time;
    }

    composer.render();
}

/* --------------------------
   Visibility-Gated Render
   Pauses animation when #wave scrolls off-screen; resumes on re-entry.
--------------------------- */
let animating = false;
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!animating) {
                animating = true;
                renderer.setAnimationLoop(animationLoop);
            }
        } else {
            animating = false;
            renderer.setAnimationLoop(null);
        }
    });
}, { threshold: 0.01 });
observer.observe(waveEl);