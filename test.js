// Import necessary modules from Three.js
import * as THREE from 'https://unpkg.com/three@0.152.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.152.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.0/examples/jsm/controls/OrbitControls.js';

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit Controls to allow rotating, panning, and zooming in the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enables inertia
controls.dampingFactor = 0.25; // Smoother movement
controls.screenSpacePanning = true; // Allows panning in the XY plane
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Load the GLTF model
const loader = new GLTFLoader();
let mixer; // Animation mixer to control animations

loader.load('./public/orrerry/scene.gltf', function (gltf) {
  const model = gltf.scene;
  scene.add(model);

  // Scale the model down if necessary
  model.scale.set(0.3, 0.3, 0.3); // Adjust scale for better fit

  // Initialize the animation mixer and play animations if present
  mixer = new THREE.AnimationMixer(model);
  if (gltf.animations.length > 0) {
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  }

  // Center the model in the scene
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center); // Center the model
}, undefined, function (error) {
  console.error('Error loading the model:', error);
});

// Adjust the camera position to a more suitable distance
camera.position.set(0, 2, 20); // Adjust this value for a comfortable zoom level

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Update animations if mixer exists
  if (mixer) {
    const delta = clock.getDelta(); // Get the time since the last frame
    mixer.update(delta); // Update the animation mixer with the time
  }

  controls.update(); // Update controls for smoother movement
  renderer.render(scene, camera);
}

const clock = new THREE.Clock(); // Clock to manage time for animation mixer
animate();

