// Import necessary modules from Three.js
import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Set up scene, camera, renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up OrbitControls to rotate around the model
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth camera motion

// Basic ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Position the camera so it's viewing the scene
camera.position.set(0, 2, 5);

// Sketchfab embed setup
const iframe = document.createElement('iframe');
iframe.src = 'https://sketchfab.com/models/b7c69a6b655b47c99f871d5ec5aee854/embed?autostart=1&preload=1&ui_infos=0&ui_controls=1';
iframe.width = window.innerWidth;
iframe.height = window.innerHeight;
iframe.setAttribute('frameborder', '0');
iframe.setAttribute('allow', 'autoplay; fullscreen; xr-spatial-tracking');
document.body.appendChild(iframe);

// Animation loop to update the Three.js scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Enable camera control
  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
  iframe.width = window.innerWidth;
  iframe.height = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
