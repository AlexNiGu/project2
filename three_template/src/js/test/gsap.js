import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { SkeletonUtils } from "three/examples/jsm/utils/SkeletonUtils.js";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sets the color of the background
renderer.setClearColor(0xfefefe);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Sets orbit control to move the camera around
// const orbit = new OrbitControls(camera, renderer.domElement);

// Camera positioning
// camera.position.set(0, 2, 10);
// orbit.update();

// Sets a 12 by 12 gird helper
const gridHelper = new THREE.GridHelper(12, 12);
scene.add(gridHelper);

// Sets the x, y, and z axes with each having a length of 4
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

/////////////////////////////////////////////////////////////////////////////
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// let z;
// const zFinal = 14;

const timeLine = gsap.timeline();
window.addEventListener("mousedown", function () {
//   z = camera.position.z;
  timeLine.to(camera.position, {
    z: 14,
    duration: 1.5,
    onUpdate: function()  {
        camera.lookAt(0,0,0);
    }
  })

  .to(camera.position, {
    y: 10,
    duration: 1.5,
    onUpdate: function() {
        camera.lookAt(0,0,0);
    }
  })

  .to(camera.position, {
    x: 10,
    y: 5,
    z: 3,
    duration: 1.5,
    onUpdate: function() {
        camera.lookAt(0,0,0);
    }
  })

});
const timeLine2 = gsap.timeline();

/////////////////////////////////////////////////////////////////////////////
var mixer; // global variable
// let mixer2;
// let mixer3;

const modelURL = new URL("../../assets/phoenix_bird.glb", import.meta.url);

const loader = new GLTFLoader();

camera.position.set(10, 0, 20);

var model;
loader.load(modelURL.href, function (gltf) {
  model = gltf.scene;
  model.scale.set(0.001, 0.001, 0.001);
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

  const clips = gltf.animations;
  clips.forEach(function(clip) {
    const action = mixer.clipAction(clip);
    action.play();
    action.timeScale = 0.5;
  })
//   const clip = THREE.AnimationClip.findByName(clips, "HeadAction");

//   const action = mixer.clipAction(clip);

//   action.play();
//   action.timeScale = 0.5;

  // action2.play();
  // action2.startAt(0.2);
  // action2.timeScale = 0.5;

  // action3.play();
  // action3.startAt(0.35);
  // action3.timeScale = 0.5;

  // window.addEventListener('mousedown', cameraAction);
});

function charMove() {
  timeLine2.to(model.position, {
    z: 1,
    duration: 1.5,
    onUpdate: function()  {
        model.lookAt(0,0,0);
    }
  })

  .to(model.position, {
    y: 1,
    duration: 1.5,
    onUpdate: function() {
        model.lookAt(0,0,0);
    }
  })

  .to(model.position, {
    x: 1,
    y: 1,
    z: 1,
    duration: 1.5,
    onUpdate: function() {
        model.lookAt(0,0,0);
    }
  })
}


function cameraAction() {
  if (!animationIsFinished) {
    animationIsFinished = true;

    timeLine.to(camera.position, {
      x: 0,
      duration,
      ease,
    });
  }
}

const clock = new THREE.Clock();

function animate() {
  // z += 0.1;
  // if (z < zFinal) {
  //     camera.position.z = z;
  // }
  if (model) {
    charMove();
  }
  const delta = clock.getDelta();
  if (mixer) {
    mixer.update(delta);
  }
//   if (mixer && mixer2 && mixer3) {
//     mixer.update(delta);
//     mixer2.update(delta);
//     mixer3.update(delta);
//   }
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
