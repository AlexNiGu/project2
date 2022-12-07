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

  async renderUI() {
    if (this.renderUIActivate) {
      // Is an infinte loop. And we can't have an infinite loop
      if (this.duck) {
        switch (this.sectionUI) {
          case "drawUI":
            // console.log("draw");
            this.#ducktor.playAnimationDraw(this.duck);
            this.cameraAnimation.playAnimationDraw();

            setTimeout(async () => {
              this.view = this.#viewUI.render("draw");
              this.#viewUI.drawLogic("draw", this.duck);

              /**FETCH PARA SABER QUE DIBUJO ES */
              await this.fetch.fetchGetPaiting()
              // console.log(this.fetch.paint)
              /**LISTENER PARA SUBIR EL DIBUJO */
              document.getElementById('save-panting').addEventListener('click', async ()=>{

                /** preparamos la imagen en binario*/
                const img = new Image(1000, 1000);
                const canvasIMG = canvas.toDataURL('image/png', 1.0);
                img.src = canvasIMG;

                /**creamos un formdata para almacenar los datos a enviar */
                const user = JSON.parse(localStorage.getItem('user'))
                const formData = new FormData()
                formData.append('IdDibujo', this.fetch.paint[0].IdDibujo)
                formData.append('NombreDibujo',this.fetch.paint[0].Tipo)
                formData.append('IdUser',user.IdUser)
                formData.append('MyFile',img.src)

                /**Fetch para enviar el dibujo al servidor */

                await this.fetch.fetchSavePainting(formData)
            
              })

              
            }, 1500);

            document.querySelector(".menu").style.display = "none";
            break;
          case "conversationUI":
         
            var cuerpo = {
              IdUser:this.fetch.user.IdUser,
              IdTest:"this.fetch.test.IdTest",
              Respuesta1:'',
              Respuesta2:'la respuesta que sea en INTEGER',
              Respuesta3:'la respuesta que sea en INTEGER',
              Respuesta4:'la respuesta que sea en INTEGER',
              Respuesta5:'la respuesta que sea en INTEGER'
          }

            this.#ducktor.playAnimationConversation();
            this.cameraAnimation.playAnimationConversation();
            document.querySelector(".menu").style.display = "none";

            setTimeout(async ()=> {
              await this.fetch.fetchGetConversation();

              cuerpo.IdTest = this.fetch.test[0].IdTest
              // console.log(this.fetch.test)
              this.#viewUI.render("conversation");
              var i = 0
              this.drawLogic(i)

              document.querySelector(".answer").addEventListener('click',(e)=>{
                i ++
                if(i<=5){
                  // console.log(i)
                  cuerpo[`Respuesta${i}`]=parseInt(e.target.dataset.indexNumber)
                  this.drawLogic(i)
                }
                if(i == 5){
                  this.fetch.responseConversation(cuerpo)
                }
              })
            },1500);
            /**TE PONGO EL FETCH AQUI DE TEST*/

            

            break;
          case "shopUI":
            this.#ducktor.playAnimationShop();
            this.cameraAnimation.playAnimationShop();

            setTimeout(async () => {
              this.view = this.#viewUI.render("shop");
              this.#viewUI.drawLogic("shop", this.duck);

              await this.fetch.getFurnitures()
              await this.fetch.getPersonalPaints()
              
              // console.log(this.fetch.shopFornitures)
              // console.log(this.fetch.personalPaints)

            }, 1500);

            document.querySelector(".menu").style.display = "none";

            break;
          case "gameUI":
            // console.log("game");
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

  drawLogic(i){
    this.#viewUI.drawLogic("conversation","", this.fetch.test[i], false);
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
        // // console.log("d", elem);
      },
      function (xhr) {
        // console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        // console.log("An error happened");
      }
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
}