import { Enviorment } from "./modules/Enviorment.js";
// import  *  as keyControls from "./modules/KeyControls.js";
import { ViewUI } from "./view/ViewUI.js";
import { Ducktor } from "./view/3dModel/Ducktor.js";
import { Cursor } from "./modules/Cursor.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { CameraAnimation } from "./modules/CameraAnimation.js";
import { Fetch } from "./modules/Fetch.js";

export class AppController {
  #myEnviorment;
  #scene;
  #camera;
  #controls;
  #render;
  #myKeyControls;
  duck;
  houseEnviorment;
  cursor;

  drawUI;
  conversationUI;
  shopUI;
  GameUI;
  sectionUI;

  #viewUI;
  renderUIActivate = true;

  #ducktor;
  cameraAnimation;

  clock;
  mixer;
  
  fetch;

  constructor() {
    // this.cursor = new Cursor();
    this.#myEnviorment = new Enviorment();
    this.#ducktor = new Ducktor();
    this.fetch = new Fetch();
    this.#scene = this.#myEnviorment.getScene();
    this.#camera = this.#myEnviorment.getCamera();
    this.#render = this.#myEnviorment.getRender();
    this.#controls = this.#myEnviorment.getControls();
    this.#viewUI = new ViewUI(this.#camera);
    this.cameraAnimation = new CameraAnimation(this.#camera);

    this.clock = new THREE.Clock();

    this.loadElements(this.#myEnviorment.getHouse());
    this.loadElements(this.#ducktor.getDucktor(), 26, 1.5, -1, true);
  }

  draw() {
    this.#render.render(this.#scene, this.#camera); // three
    this.renderUI(); // html
  }

  update() {
    // keyControls.resetHover(this.#scene);
    // keyControls.hoverPiece(this.#scene, this.#camera);
    // this.#myKeyControls.hoverPiece();
    // this.#controls.update();

    // This is for the animations of the character
    if (this.duck) {
      const delta = this.clock.getDelta();
      if (this.mixer) {
        this.mixer.update(delta);
      }
    }
  }

  listener() {
    document.getElementById("game").addEventListener("click", () => {
      this.sectionUI = "gameUI";
      this.renderUIActivate = true;
    });
    document.getElementById("conversation").addEventListener("click", () => {
      this.sectionUI = "conversationUI";
      this.renderUIActivate = true;
    });
    document.getElementById("draw").addEventListener("click", () => {
      this.sectionUI = "drawUI";
      this.renderUIActivate = true;
    });
    document.getElementById("shop").addEventListener("click", () => {
      this.sectionUI = "shopUI";
      this.renderUIActivate = true;
    });
  }

  renderUI() {
    if (this.renderUIActivate) {
      // Is an infinte loop. And we can't have an infinite loop
      if (this.duck) {
        switch (this.sectionUI) {
          case "drawUI":
            console.log("draw");
            this.#ducktor.playAnimationDraw(this.duck);
            this.cameraAnimation.playAnimationDraw();

            setTimeout(() => {
              this.view = this.#viewUI.render("draw");
              this.#viewUI.drawLogic("draw", this.duck);

              // FETCH ======
              //document.getElementbyID('download).addEvenetListener('click, ())=> {
              // this.Fetch.fetchDraw();
              //}

            //=======================
            }, 1500);


            document.querySelector(".menu").style.display = "none";
            break;
          case "conversationUI":
            console.log("conversation");

            this.#ducktor.playAnimationConversation();
            this.cameraAnimation.playAnimationConversation();
            document.querySelector(".menu").style.display = "none";

            break;
          case "shopUI":
            this.#ducktor.playAnimationShop();
            this.cameraAnimation.playAnimationShop();

            setTimeout(() => {
              this.view = this.#viewUI.render("shop");
              this.#viewUI.drawLogic("shop", this.duck);
            }, 1500);

            document.querySelector(".menu").style.display = "none";

            break;
          case "gameUI":
            console.log("game");
            this.#ducktor.playAnimationGame();
            this.cameraAnimation.playAnimationConversation();
            document.querySelector(".menu").style.display = "none";

            break;
        }
      } else {
        this.#viewUI.render();
      }
      this.renderUIActivate = false;
    }
    this.listener();
    // this.listener.bind(this);
  }

  listener2() {
    window.addEventListener("resize", () => {
      this.#camera.aspect = window.innerWidth / window.innerHeight;
      this.#camera.updateProjectionMatrix();
      this.#render.setSize(window.innerWidth, window.innerHeight);
    });

    // this.buttonConversation.addEventListener("click", this.activeDrawUI());
    // window.addEventListener('mousemove', keyControls.onMouseMove, false);
    // window.addEventListener('click', keyControls.onClick(this.#camera, this.#scene ));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  loadElements(element, paramX = 0, paramY = 0, paramZ = 0, bol = false) {
    this.loader = new GLTFLoader();
    var mixer;

    this.loader.load(
      element,
      (glb) => {
        this.houseEnviorment = glb.scene.children[1]; // Array of two (object and mesh). You need to get the mesh
        // car.scale.set(paramX,paramY,paramZ);
        this.#scene.add(glb.scene);
        if (bol == true) {
          this.duck = glb.scene.children[0];
          this.duck.position.set(paramX, paramY, paramZ);
          this.duck.rotation.set(0, 3.1, 0);

          mixer = new THREE.AnimationMixer(this.duck);
          const clips = glb.animations;
          clips.forEach(function (clip) {
            const action = mixer.clipAction(clip);
            action.play();
            action.timeScale = 0.5;
          });

          this.mixer = mixer;
          this.#ducktor.playAnimationDefault(this.duck);
        }
        // console.log("d", elem);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
}