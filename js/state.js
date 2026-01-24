import * as THREE from "three";
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// Init threejs scene
// ----------------------

const scene = new THREE.Scene();
const ambientLight = new THREE.AmbientLight( "#E4E6E7", .9 ); // soft white light
scene.add(ambientLight);

const container = document.getElementById('state-container');
const rect = container.getBoundingClientRect();
const width = rect.width;
const height = rect.height;

const renderer = new THREE.WebGLRenderer({ 
  alpha: true, 
  antialias: true 
});

renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
camera.position.z = 75;

container.appendChild(renderer.domElement);

// Resize, update camera
window.addEventListener('resize', function(e) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
});

// Load and parse SVG
// ---------------------------------

const svgMarkup = document.getElementById('state-svg').innerHTML;

const loader = new SVGLoader();
const svgData = loader.parse(svgMarkup);

// Group for all SVG paths
const svgGroup = new THREE.Group();
// When importing SVGs paths are inverted on Y axis
svgGroup.scale.y *= -1;

const material = new THREE.MeshPhongMaterial({
  color: "#E4E6E7",
});

svgData.paths.forEach((path, _i) => {
  const shapes = SVGLoader.createShapes(path);

  shapes.forEach((shape, _j) => {
    // Geometry
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 4,
      bevelEnabled: false
    });

    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    svgGroup.add(mesh);

    // Outline
    const edges = new THREE.EdgesGeometry(mesh.geometry, 8);
    const lineMaterial = new THREE.LineBasicMaterial({ color: "#6e7477" });
    const line = new THREE.LineSegments(edges, lineMaterial);
    mesh.add(line);
  });
});

// Meshes we got are all relative to themselves
// meaning they have position set to (0, 0, 0)

// Get group's size
const box = new THREE.Box3().setFromObject(svgGroup);
const size = new THREE.Vector3();
box.getSize(size);

const yOffset = size.y / -2;
const xOffset = size.x / -2;

// Offset all of group's elements (center)
svgGroup.children.forEach(item => {
  item.position.x = xOffset;
  item.position.y = yOffset;
});

// Add svg group to the scene
scene.add(svgGroup);

// Animation loop
// ------------------

function animate() {
  renderer.render(scene, camera);

  // Rotate out group 
  svgGroup.rotation.y += 0.01;
  
  requestAnimationFrame(animate);
}

animate();