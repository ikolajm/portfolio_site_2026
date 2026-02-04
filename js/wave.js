import * as THREE from "three";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";

// General setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, innerWidth/innerHeight);
camera.position.set( 4, 2, 8 );
camera.aspect = innerWidth/innerHeight;
camera.updateProjectionMatrix();
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({
    alpha: true, 
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
renderer.setAnimationLoop( animationLoop );
const wave = document.getElementById('wave');
wave.appendChild(renderer.domElement);
			
window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    renderer.setSize(innerWidth, innerHeight);
    camera.updateProjectionMatrix();
});

// Waves with simplex noise
const geometry = new THREE.PlaneGeometry(innerWidth/10, 1, innerWidth*2, 4);
const pos = geometry.getAttribute('position');
const simplex = new SimplexNoise();

const waves = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        color: "#E4E6E7",
        size: .025 * window.devicePixelRatio
    })
);	
waves.rotation.x = .25;
waves.rotation.z = .15;
scene.add(waves);

function animationLoop( t ) {
    for( let i=0; i<pos.count; i++ ) {
        const x = pos.getX( i );
        const y = pos.getY( i );	
        const z = simplex.noise3d( x/2, y/2, t/8000 );

        pos.setZ( i, z );
    }
    pos.needsUpdate = true;
	
    renderer.render( scene, camera );
}
