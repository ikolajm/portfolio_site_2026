import * as THREE from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { AfterimagePass } from "three/addons/postprocessing/AfterimagePass.js";
import {
    createBaseHSL,
    createLightnessOffsets,
    applyColorField,
    ColorFieldConfig
} from "./colorField.js";
import { getElapsedTime } from "./elapsedTime.js";
import { createOrbTexture, OrbConfig } from "./orbs.js";

/* --------------------------
   Config
--------------------------- */
const BACKGROUND_COLOR = "#141515";
// -- Particle Init
const PARTICLE_SIZE = 4;
const PARTICLE_COLOR = "#0099E5";
// -- Wave Positioning
const WAVE_ROTATION_X = .25;
const WAVE_ROTATION_Z = .1;
const WAVE_LOOP_SECONDS = 12;

/* --------------------------
    Three.js Setup
--------------------------- */
const scene = new THREE.Scene();
scene.background = new THREE.Color(BACKGROUND_COLOR);

const camera = new THREE.PerspectiveCamera(30, innerWidth/innerHeight);
camera.position.set( 4, 2, 8 );
camera.aspect = innerWidth/innerHeight;
camera.updateProjectionMatrix();
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
    alpha: true, 
    antialias: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.LinearToneMapping;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const wave = document.getElementById('wave');
wave.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

/* --------------------------
  Orb Trails
--------------------------- */
const afterimagePass = new AfterimagePass();
afterimagePass.uniforms['damp'].value = OrbConfig.AFTERIMAGE_THRESHOLD;
composer.addPass(afterimagePass);

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight),
  OrbConfig.BLOOM_STRENGTH,
  OrbConfig.BLOOM_RADIUS,
  OrbConfig.BLOOM_THRESHOLD
);
composer.addPass(bloomPass);
			
window.addEventListener( "resize", (event) => {
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
});

/* --------------------------
  Init Waves
--------------------------- */
const WAVE_SEGMENTS_X = 2400
const geometry = new THREE.PlaneGeometry(innerWidth/10, 1, WAVE_SEGMENTS_X, 3);
const pos = geometry.getAttribute('position');
const randomOffsets = new Float32Array(pos.count);
for (let i = 0; i < pos.count; i++) {
    randomOffsets[i] = Math.random() * Math.PI * 2;
}
const simplex = new SimplexNoise();

/* --------------------------
  Per-point Color Buffer
--------------------------- */
const baseHSL = createBaseHSL(PARTICLE_COLOR);
const lightnessOffsets = createLightnessOffsets(pos.count, ColorFieldConfig.LIGHTNESS_VARIATION_RANGE);

const colors = new Float32Array(pos.count * 3);
applyColorField({
    positions: pos.array,
    colors,
    baseHSL,
    lightnessOffsets,
    time: 0,
    config: ColorFieldConfig
});
geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const colorAttr = geometry.getAttribute("color");

/* --------------------------
  Orb Textures
--------------------------- */
const orbTexture = createOrbTexture();

/* --------------------------
  Create Point Waves
--------------------------- */
const waves = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        size: PARTICLE_SIZE,
        vertexColors: true,
        color: PARTICLE_COLOR,
        map: orbTexture,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    })
);
waves.material.sizeAttenuation = false;
waves.rotation.x = WAVE_ROTATION_X;
waves.rotation.z = WAVE_ROTATION_Z;
scene.add(waves);

/* --------------------------
  Animation Loop
--------------------------- */
function animationLoop() {
    const time = getElapsedTime();
    // -- Wave
    for( let i=0; i<pos.count; i++ ) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        pos.setZ(i, simplex.noise3d( x/4, y/4, time/WAVE_LOOP_SECONDS ));
    }
    pos.needsUpdate = true;

    // -- Color Drift
    applyColorField({
        positions: pos.array,
        colors: colorAttr.array,
        baseHSL,
        lightnessOffsets,
        time,
        config: ColorFieldConfig
    });
    colorAttr.needsUpdate = true;
	
    composer.render();
}
renderer.setAnimationLoop(animationLoop);