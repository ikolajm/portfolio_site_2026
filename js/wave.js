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
renderer.setAnimationLoop( animationLoop );
const wave = document.getElementById('wave');
wave.appendChild(renderer.domElement);
			
window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix();
});

// Waves with simplex noise
const geometry = new THREE.PlaneGeometry(innerWidth/8, 1, innerWidth*2, 4);
const pos = geometry.getAttribute('position');
const simplex = new SimplexNoise();

const waves = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        color: "#E4E6E7",
        size: .1
    })
);	
waves.rotation.x = Math.PI/8;
scene.add(waves);

function animationLoop( t ) {
    for( let i=0; i<pos.count; i++ ) {
        const x = pos.getX( i );
        const y = pos.getY( i );	
        const z = simplex.noise3d( x/2, y/2, t/5000 );

        pos.setZ( i, z );
    }
    pos.needsUpdate = true;
	
    renderer.render( scene, camera );
}
