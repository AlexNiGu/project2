import * as THREE from "three";
import { sRGBEncoding } from "three";
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
    // this.camera.zoom.set(20)    
    // this.camera.rotation.set(0,0,0)
    // this.camera.rotation.set(-0.456, 0.1, -0.5);
    // this.camera.position.set(-20, 195, 300);
    this.camera.rotation.set(-0.206, 0, 0);
    this.camera.position.set(0, 10, 28);

    // Render the scece in the element that you want. In our case is a canvas
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#bg"),
      antialias:true,
      alpha: false
    });
    // configuration of pixelRatio and size
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Controls to move in the scene
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    // pointLightHelper to know where is the light source
    // this.gridHelper = new THREE.GridHelper(200, 50);
    // this.axisHelper = new THREE.AxesHelper(20);
    // this.scene.add( this.gridHelper, this.axisHelper );

    // const pointLightHelper = new THREE.pointLightHelper( camera, renderer.domElement );



    // const bg = 
    // bg.encoding = sRGBEncoding;
    // this.scene.background = bg;

    const geometry = new THREE.BoxGeometry( 90, 80, 1 );
    const material = new THREE.MeshBasicMaterial({color:0x7aa7f0});
    const cube = new THREE.Mesh( geometry, material );
    cube.position.set(0,0,-25)
    this.scene.add( cube );
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    this.hlight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.hlight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-5, -1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.light = new THREE.PointLight(0xa0a0a0, 0.5);
    this.light.position.set(0, 100, -200);
    this.scene.add(this.light);

    this.light2 = new THREE.PointLight(0x909090, 0.1);
    this.light2.position.set(-45, 20, -100);
    // this.light2.rotation.set(5,5,0)
    this.scene.add(this.light2);

    this.light3 = new THREE.PointLight(0x000000, 0.5);
    this.light3.position.set(50, 100, -200);
    this.scene.add(this.light3);

    this.light4 = new THREE.PointLight(0x000000, 5);
    this.light4.position.set(-150, 100, -200);
    this.scene.add(this.light4);



    /**SKYBOX---------------------------------------------------- */
    var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    var skybox = new THREE.Mesh(skyboxGeo);
    this.scene.add(skybox)


    const ft = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_ft.jpg");
    const bk = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_bk.jpg");
    const up = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_up.jpg");
    const dn = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_dn.jpg");
    const rt = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_rt.jpg");
    const lf = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_lf.jpg");

    var skyboxImage = 'purplenebula';

    const materialArray = this.createMaterialArray(skyboxImage);
    skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    skybox = new THREE.Mesh(skyboxGeo, materialArray);
    this.scene.add(skybox);


  }

  createPathStrings(filename) {
    const basePath = "../../assets/img/skybox/";
    const baseFilename = basePath + filename;
    const fileType = ".png";
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
    const pathStings = sides.map(side => {
      return baseFilename + "_" + side + fileType;
    });

    return pathStings;
  }


  createMaterialArray(filename) {
    const skyboxImagepaths = this.createPathStrings(filename);
    const materialArray = skyboxImagepaths.map(image => {
      let texture = new THREE.TextureLoader().load(image);

      return texture;
    });
    return materialArray;
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