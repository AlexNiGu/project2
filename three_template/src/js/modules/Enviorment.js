import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Enviorment {
  modelURL = new URL("../../assets/casa1.glb", import.meta.url);

  #house = this.modelURL.href;
  constructor() {
    this.scene = new THREE.Scene();

    // PerspectiveCamera is te most used one (There is a lot of cameras). Because represent human eye
    // params = (Field of view, aspect ratio (user window), view frustum)
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.rotation.set(-0.356, 0, 0);
    this.camera.position.set(27, 25, 32);
    // console.log(this.camera);

    // Render the scece in the element that you want. In our case is a canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
    });
    // configuration of pixelRatio and size
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls to move in the scene
    // this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // pointLightHelper to know where is the light source
    this.gridHelper = new THREE.GridHelper(200, 50);
    this.axisHelper = new THREE.AxesHelper(20);
    // this.scene.add( this.gridHelper, this.axisHelper );

    // const pointLightHelper = new THREE.pointLightHelper( camera, renderer.domElement );

    this.scene.background = new THREE.Color(0xdddddd);

    /////////////////////////////////////////////////////////////////////////////////////////////////////

    this.hlight = new THREE.AmbientLight(0x404040, 0.5);
    this.scene.add(this.hlight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.light = new THREE.PointLight(0xc4c4c4, 1);
    this.light.position.set(0, 300, 500);
    this.scene.add(this.light);

    this.light2 = new THREE.PointLight(0xc4c4c4, 1);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);

    this.light3 = new THREE.PointLight(0xc4c4c4, 1);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);

    this.light4 = new THREE.PointLight(0xc4c4c4, 1);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }
  getRender() {
    return this.renderer;
  }
  getControls() {
    return this.controls;
  }
  getHouse() {
    return this.#house;
  }
}
