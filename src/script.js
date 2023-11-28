import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const scene = new THREE.Scene();
const canvas = document.querySelector(".canvas");

const sizes = {
  width: 1600,
  height: 1000,
};

const cursor = {
  x: 0,
  y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 2, 5);
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#FFFFFF",
    metalness: 0,
    roughness: 0.5,
  })
);

const renderer = new THREE.WebGLRenderer({ canvas });

floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const hemiLight = new THREE.HemisphereLight("#FFFFFF", "#FFFFFF", 0.61);
hemiLight.position.set(0, 50, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight("#FFFFFF", 0.54);
dirLight.position.set(-8, 12, 8);
dirLight.castShadow = true;
scene.add(dirLight);

const loader = new GLTFLoader();

let mixer = null;
loader.load("/models/BrainStem/BrainStem.gltf", (gltf) => {
  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();
  scene.add(gltf.scene);
});

const clock = new THREE.Clock();

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  const delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }
  window.requestAnimationFrame(tick);
};
tick();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
