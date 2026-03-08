import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

// SCENE CONSTANTS
const PILLAR_COUNT      = 32;
const PILLAR_MIN_GAP    = 2.5;
const PILLAR_SPREAD     = 65;    // placement area: ±32.5 on X and Z
const PILLAR_CLEAR      = 6;     // clear radius around center
const PILLAR_FLOOR_Y    = -35;   // base plane; all pillar bottoms sit here, receding into fog
const PILLAR_MIN_HEIGHT = 8;     // shortest pillar
const PILLAR_MAX_HEIGHT = 35;    // tallest pillar; tops reach near Y=0
const ORBIT_RADIUS      = 45;    // camera's orbital radius around origin
const ORBIT_HEIGHT      = 60;    // camera elevation above pillar field
const ORBIT_SPEED       = 0.04;  // radians/sec (clockwise from above)

// Helper to create highly detailed, high-resolution procedural textures
function createDetailedTextures() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bumpCtx = bumpCanvas.getContext('2d');

  if (ctx && bumpCtx) {
    ctx.fillStyle = '#b0b5b9';
    ctx.fillRect(0, 0, size, size);

    bumpCtx.fillStyle = '#808080';
    bumpCtx.fillRect(0, 0, size, size);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;
    const bumpImgData = bumpCtx.getImageData(0, 0, size, size);
    const bData = bumpImgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 80;
      data[i]   = Math.min(255, Math.max(0, data[i]   + noise));
      data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise));
      data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise));

      const bNoise = 128 + noise * 2.2;
      bData[i] = bData[i+1] = bData[i+2] = Math.min(255, Math.max(0, bNoise));
    }
    ctx.putImageData(imgData, 0, 0);
    bumpCtx.putImageData(bumpImgData, 0, 0);

    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = Math.random() * 3 + 0.5;

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10, 11, 13, ${Math.random() * 0.8 + 0.2})`;
      ctx.fill();

      bumpCtx.beginPath();
      bumpCtx.arc(x, y, r, 0, Math.PI * 2);
      bumpCtx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.9 + 0.1})`;
      bumpCtx.fill();
    }

    for (let i = 0; i < 40; i++) {
      const isHorizontal = Math.random() > 0.5;
      const pos = Math.random() * size;
      const thickness = Math.random() * 3 + 1;

      ctx.fillStyle = 'rgba(15, 15, 18, 0.9)';
      bumpCtx.fillStyle = 'rgba(0, 0, 0, 1.0)';

      if (isHorizontal) {
        ctx.fillRect(0, pos, size, thickness);
        bumpCtx.fillRect(0, pos, size, thickness);
      } else {
        ctx.fillRect(pos, 0, thickness, size);
        bumpCtx.fillRect(pos, 0, thickness, size);
      }
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  return { map, bumpMap };
}

export function initPillars(container, onReady) {
  // SCENE, CAMERA, RENDERER
  const scene = new THREE.Scene();

  const fogColor = new THREE.Color('#050812');
  scene.background = fogColor;
  scene.fog = new THREE.Fog(fogColor, 40, 100);

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, ORBIT_HEIGHT, ORBIT_RADIUS);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  // POST-PROCESSING
  const renderScene = new RenderPass(scene, camera);
//   const bloomPass = new UnrealBloomPass(
//     new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
//     0.48, // intensity
//     0.4,  // radius
//     0.6   // threshold
//   );

  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);
//   composer.addPass(bloomPass);

  // LIGHTS
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.16);
  scene.add(ambientLight);

  const centerLight1 = new THREE.PointLight(0x1e40af, 60, 80, 2);
  centerLight1.position.set(0, 20, 0);
  scene.add(centerLight1);

  const centerLight2 = new THREE.PointLight(0x3b82f6, 48, 60, 2);
  centerLight2.position.set(0, 15, 20);
  scene.add(centerLight2);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.48);
  dirLight1.position.set(10, 20, 10);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xaabbff, 0.24);
  dirLight2.position.set(-20, 10, -10);
  scene.add(dirLight2);

  // TEXTURES & MATERIALS
  const { map, bumpMap } = createDetailedTextures();

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  map.anisotropy = maxAnisotropy;
  map.repeat.set(2, 3);
  bumpMap.anisotropy = maxAnisotropy;
  bumpMap.repeat.set(2, 3);

  const pillarMaterial = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.75,
    metalness: 0.15,
    map: map,
    bumpMap: bumpMap,
    bumpScale: 0.5,
  });

  // Height-based fog: pillar bases dissolve into the scene fog regardless of camera distance.
  // Injected via onBeforeCompile so it compiles once and runs as pure GPU arithmetic.
  pillarMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uHeightFogTop    = { value: 0.0 };
    shader.uniforms.uHeightFogBottom = { value: PILLAR_FLOOR_Y };

    // Pass world Y from vertex → fragment, handling InstancedMesh matrices correctly.
    shader.vertexShader = 'varying float vWorldY;\n' + shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
      {
        vec4 _wp = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          _wp = instanceMatrix * _wp;
        #endif
        vWorldY = (modelMatrix * _wp).y;
      }`
    );

    shader.fragmentShader = [
      'varying float vWorldY;',
      'uniform float uHeightFogTop;',
      'uniform float uHeightFogBottom;',
    ].join('\n') + '\n' + shader.fragmentShader.replace(
      '#include <fog_fragment>',
      `#include <fog_fragment>
      float heightFog = clamp((uHeightFogTop - vWorldY) / (uHeightFogTop - uHeightFogBottom), 0.0, 1.0);
      heightFog = pow(heightFog, 1.5);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, heightFog * 0.9);`
    );
  };

  // PILLARS — vertical columns spread across the XZ ground plane.
  // Tops emerge from the fog near Y=0; bases recede downward into it.
  // Placement pass: collect transforms only, then batch into one InstancedMesh (1 draw call).
  const placedPillars = [];
  let attempts = 0;

  while (placedPillars.length < PILLAR_COUNT && attempts < 2500) {
    attempts++;

    const size = 1.5 + Math.random() * 1.5;
    const x = (Math.random() - 0.5) * PILLAR_SPREAD;
    const z = (Math.random() - 0.5) * PILLAR_SPREAD;

    if (Math.abs(x) < PILLAR_CLEAR && Math.abs(z) < PILLAR_CLEAR) continue;

    let overlap = false;
    for (const p of placedPillars) {
      const xOverlap = Math.abs(x - p.x) < (size / 2 + p.size / 2 + PILLAR_MIN_GAP);
      const zOverlap = Math.abs(z - p.z) < (size / 2 + p.size / 2 + PILLAR_MIN_GAP);
      if (xOverlap && zOverlap) {
        overlap = true;
        break;
      }
    }

    if (!overlap) {
      const height = PILLAR_MIN_HEIGHT + Math.random() * (PILLAR_MAX_HEIGHT - PILLAR_MIN_HEIGHT);
      const y = PILLAR_FLOOR_Y + height / 2;
      placedPillars.push({ x, y, z, size, height });
    }
  }

  const pillarGeometry = new THREE.BoxGeometry(1, 1, 1);
  const instancedMesh = new THREE.InstancedMesh(pillarGeometry, pillarMaterial, placedPillars.length);
  const matrix = new THREE.Matrix4();

  placedPillars.forEach(({ x, y, z, size, height }, i) => {
    matrix.makeScale(size, height, size);
    matrix.setPosition(x, y, z);
    instancedMesh.setMatrixAt(i, matrix);
  });

  instancedMesh.instanceMatrix.needsUpdate = true;
  scene.add(instancedMesh);

  // ANIMATION LOOP
  let animationId;
  let firstFrame = true;
  const clock = new THREE.Clock();

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    camera.position.x = -Math.sin(elapsedTime * ORBIT_SPEED) * ORBIT_RADIUS;
    camera.position.y = ORBIT_HEIGHT;
    camera.position.z = Math.cos(elapsedTime * ORBIT_SPEED) * ORBIT_RADIUS;
    camera.lookAt(0, 0, 0);

    composer.render();

    if (firstFrame) {
      firstFrame = false;
      onReady?.();
    }
  };

  animate();

  // RESIZE HANDLER
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', handleResize);

  // CLEANUP
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationId);
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    pillarGeometry.dispose();
    pillarMaterial.dispose();
    map.dispose();
    bumpMap.dispose();
    renderer.dispose();
    scene.clear();
  });
}

// Self-initialize against the .pillars element
const pillarsEl = document.querySelector('.pillars');
if (pillarsEl) {
  initPillars(pillarsEl, () => pillarsEl.classList.add('is-visible'));
}
