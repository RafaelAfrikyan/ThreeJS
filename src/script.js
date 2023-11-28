import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";

const scene = new THREE.Scene();
const canvas = document.querySelector(".canvas");

const sizes = {
  width: 2000,
  height: 1000,
};

const cursor = {
  x: 0,
  y: 0,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const renderer = new THREE.WebGLRenderer({ canvas });

canvas.addEventListener("mousemove", (event) => {
  cursor.x = -(event.clientX / sizes.width - 0.5);
  cursor.y = event.clientY / sizes.height - 0.5;
});

const tick = () => {
  controls.update();

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  // camera.position.y = cursor.y * 2;
  // camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
// const group = new THREE.Group();
// const meshes = [];

// const colors = ["red", "blue", "white"];
// for (let x = -1.2; x <= 1.2; x += 1.2) {
//   for (let y = -1.2; y <= 1.2; y += 1.2) {
//     const material = new THREE.MeshBasicMaterial({
//       color: colors[(Math.random() * 3) | 0],
//       wireframe: true,
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     mesh.scale.set(0.5, 0.5, 0.5);
//     mesh.position.set(x, y, 0);
//     meshes.push(mesh);
//   }
// }

// group.add(...meshes);
// scene.add(group);

// document.addEventListener("scroll", (e) => {
// console.log(e, "eee");

// const coordinates = canvas.getBoundingClientRect();
// renderer.render(scene, camera);

// const position = coordinates.bottom / sizes.height;

// const upThenCenter = position > 0.75;
// const downThenCenter = position < 0.75;
// console.log(position, "position");

// mesh.position.y = position - 0.75;
// mesh.position.y = 2 * position;
// if (upThenCenter) {
//   mesh.position.x = 3 * position;
//   mesh.position.y = 2 * position;
// } else {
//   mesh.position.x = -3 / position;
//   mesh.position.y = -2 / position;
// }
// });
// document.body.addEventListener("mousemove", (e) => {
// Get the mouse coordinates
// const mouseX = e.clientX;
// const mouseY = e.clientY;
// mesh.position.x = mouseX / 1000;
// mesh.position.y = mouseY / 1000;

// mesh.rotation.x = mouseY / 100;
// mesh.rotation.y = mouseX / 100;
// camera.lookAt(new THREE.Vector3(mouseX / 100, mouseY / 100, 0));
// renderer.render(scene, camera);

// Log the coordinates (you can do something else with them)
// });

// const clock = new THREE.Clock();
// const tick = () => {
//   const elepsedTime = clock.getElapsedTime();
//   camera.position.x = Math.cos(elepsedTime);
//   camera.position.y = Math.sin(elepsedTime);

//   camera.lookAt(mesh.position);

//for moove object like our desing
// mesh.position.x = Math.cos(elepsedTime);
// mesh.position.y = Math.sin(elepsedTime);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();

// const clock = new THRfEE.Clock();
// const animate = () => {
//   const delta = clock.getDelta();
//   meshes.forEach((item, index) => {
//     const mult = index % 2 === 0 ? 1 : -1;
//     item.rotation.x += mult * delta;
//     item.rotation.y += mult * delta * 0.4;
//   });
//   const elepsedTime = clock.getElapsedTime();

//   camera.position.x = Math.cos(elepsedTime);
//   camera.position.y = Math.sin(elepsedTime);

//   camera.lookAt(mesh.position);
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(animate);
// };
// animate();

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
