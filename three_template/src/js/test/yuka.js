
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import * as YUKA from 'yuka'

const scene = new THREE.Scene();


// PerspectiveCamera is te most used one (There is a lot of cameras). Because represent human eye
// params = (Field of view, aspect ratio (user window), view frustum)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Render the scece in the element that you want. In our case is a canvas
const renderer =  new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})
// configuration of pixelRatio and size
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//position the camera in the scene
camera.position.setZ(30);

// Controls to move in the scene
const controls = new OrbitControls( camera, renderer.domElement );


//////////////////////////////////////////////////////////////////////////
// pointLightHelper to know where is the light source
const gridHelper = new THREE.GridHelper(200, 50);
const axisHelper = new THREE.AxesHelper(20);
scene.add( gridHelper, axisHelper );

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshLambertMaterial({ // LISGTS ONLY WORK WITH THIS TYPE OF MESH. WITH THE STANDARD MATERIAL IT doesn't work (new THREE.MeshStandardMaterial({}) )
    color: 0xff00ff,
    // shading: THREE.FlatShading
})
const Mesh = new THREE.Mesh(Geometry, material);

scene.add(Mesh);

////////////////////////////////////////////////////////////////////////////////////////////////
const light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10,0,25);
scene.add(light);

///////////////////////////////////////////////////////////////////////////////////////////////////


// Resize window to make it responsive to the window

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})


////////////////////////////////////////////////////////////////////////////////////////////////





function animate() {

    Mesh.position.z += 0.01;
    Mesh.rotation.x += 0.01;
    Mesh.rotation.y += 0.01;
    Mesh.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate();