
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import * as YUKA from './node_modules/yuka/build/yuka.js';

let scene, camera, renderer;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd);

  camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,1,5000);
  camera.rotation.y = 45/180*Math.PI;
  camera.position.x = 800;
  camera.position.y = 100;
  camera.position.z = 1000;


//   controls.addEventListener('change', renderer);

  var hlight = new THREE.AmbientLight(0x404040,0.5);
  scene.add(hlight);

  var directionalLight = new THREE.DirectionalLight(0xffffff,1  );
  directionalLight.position.set(0,1,0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  var light = new THREE.PointLight(0xc4c4c4,1);
  light.position.set(0,300,500);
  scene.add(light);
  var light2 = new THREE.PointLight(0xc4c4c4,1);
  light2.position.set(500,100,0);
  scene.add(light2);
  var light3 = new THREE.PointLight(0xc4c4c4,1);
  light3.position.set(0,100,-500);
  scene.add(light3);
  var light4 = new THREE.PointLight(0xc4c4c4,1);
  light4.position.set(-500,300,500);
  scene.add(light4);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
  var control = new OrbitControls( camera, renderer.domElement);
  // var car;
  // let loader = new GLTFLoader();
  // loader.load('casa1.glb', function(gltf){
  //   car = gltf.scene.children[0];
  //   car.scale.set(0.5,0.5,0.5);
  //   scene.add(gltf.scene);
  //   animate();
  // });




const vehicleGeometry = new THREE.ConeBufferGeometry(0.1, 0.5, 8);
const material = new THREE.MeshNormalMaterial()
const mesh = new THREE.Mesh(vehicleGeometry, material);
mesh.matrixAutoUpdate = false;


const vehicle = YUKA.Vehicle();
vehicle.setRenderComponent(mesh, sync);

function sync(entity, renderComponent) {
  renderComponent.matrix.copy(entity.worldMatrix);
}

const path = new YUKA.Path();
path.add( new YUKA.Vector3(-4, 0, 4));
path.add( new YUKA.Vector3(-6, 0, 0));
path.add( new YUKA.Vector3(-4, 0, -4));
path.add( new YUKA.Vector3(0, 0, 0));
path.add( new YUKA.Vector3(4, 0, -4));
path.add( new YUKA.Vector3(6, 0, 0));
path.add( new YUKA.Vector3(4, 0, 4));
path.add( new YUKA.Vector3(0, 0, 6));

vehicleGeometry.position.copy(path.current());

// Gave order to follow the path and smoth the corners
const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5);
vehicleGeometry.steering.add(followPathBehavior);


// Append the entity
const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);

const time = new YUKA.Time();





function animate() {
  const delta = time.update().getDelta();
    control.update();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}


window.addEventListener('resize', ()=> {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  render.setSize(window.innerWidth, window.innerHeight);
})
animate();
