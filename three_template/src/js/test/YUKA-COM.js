import * as THREE from 'three';
import * as YUKA from 'yuka';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";



const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

renderer.setClearColor(0xA3A3A3);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 20, 0);
camera.lookAt(scene.position);


const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
// const vehicleGeometry = new THREE.ConeBufferGeometry(0.1, 0.5, 8);
// vehicleGeometry.rotateX(Math.PI * 0.5);
// const vehicleMaterial = new THREE.MeshNormalMaterial();
// const vehicleMesh = new THREE.Mesh(vehicleGeometry, vehicleMaterial);
// vehicleMesh.matrixAutoUpdate = false;
// scene.add(vehicleMesh);



///////////////////////////////////////////////////// - YUKA 


const vehicle = new YUKA.Vehicle();

// vehicle.setRenderComponent(vehicleMesh, sync);

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


vehicle.position.copy(path.current());

vehicle.maxSpeed = 1;
path.loop = true; // MAKE THE LOOP INFINITE

const followPathBehavior = new YUKA.FollowPathBehavior(path, 0.5); // 0.5 is radius of croner
vehicle.steering.add(followPathBehavior);

// MAKE THE PATH IN A MORE STRICT WAY
const onPathBehavior = new YUKA.OnPathBehavior(path);
onPathBehavior.radius = 0.03;
vehicle.steering.add(onPathBehavior);

const entityManager = new YUKA.EntityManager();
entityManager.add(vehicle);


///////////////////////////////////////////////////// - LOADER
const modelURL = new URL("../../assets/doggo2.glb", import.meta.url);

const loader = new GLTFLoader();
loader.load(modelURL.href, function(glb) {
    const model = glb.scene;
    // model.position.set(1, 5, 505)
    scene.add(model);
    vehicle.scale = new YUKA.Vector3(0.5,0.5,0.5)
    vehicle.rotation = new YUKA.Quaternion(-Math.PI / 2, 5, 5, 5)
    model.matrixAutoUpdate = false;
    vehicle.setRenderComponent(model, sync);

    model.scale.set(0.01, 0.01, 0.01);
    // const model2 = SkeletonUtils.clone(model);
    // const model3 = SkeletonUtils.clone(model);
  
    scene.add(model);
    // scene.add(model2);
    // scene.add(model3);
  
    // model2.position.set(7,-4,6);
    // model3.position.set(-7,4,-2);
  
    mixer = new THREE.AnimationMixer(model);
    // mixer2 = new THREE.AnimationMixer(model2);
    // mixer3 = new THREE.AnimationMixer(model3);
  
    const clips = glb.animations;
    clips.forEach(function(clip) {
      const action = mixer.clipAction(clip);
      action.play();
      action.timeScale = 0.5;
    })

})


///////////////////////////////////////////////////// - YUKA HELPER
const position = [];
for(let i = 0; i < path._waypoints.length; i++) { // FOR CREATING THE HELPERS OF THE PATHS
    const waypoint = path._waypoints[i];
    position.push(waypoint.x, waypoint.y, waypoint.z);
}

const lineGeometry = new THREE.BufferGeometry(); //bufferGeomtry is the helpers
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(position, 3)); 

const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF}); // CREATE THE LINE OF THE PATHS
const lines = new THREE.LineLoop(lineGeometry, lineMaterial);
scene.add(lines);

////////////////////////////////////////////////////////////7

const time = new YUKA.Time();

function animate() {
    const delta = time.update().getDelta();
    entityManager.update(delta);
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});