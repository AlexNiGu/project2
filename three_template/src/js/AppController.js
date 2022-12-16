import { Enviorment } from "./modules/Enviorment.js";
// import  *  as keyControls from "./modules/KeyControls.js";
import { ViewUI } from "./view/ViewUI.js";
import { Ducktor } from "./view/3dModel/Ducktor.js";
import { Cursor } from "./modules/Cursor.js";
import { ChargingPage } from "./view/charging.js";
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

    this.paintSelected

    this.conditionDraw = true

    this.indexNumber = ''
    this.arrayRewards = []

    JSON.parse(localStorage.getItem('rewards')) != null ? this.arrayRewards = JSON.parse(localStorage.getItem('rewards')) : ''

    console.log(this.arrayRewards)
    this.clock = new THREE.Clock();

    this.loadElementsDucktor("https://res.cloudinary.com/eloy411/image/upload/v1671056488/ducktor_3_fieoxn.glb", 26, 1.5, -1);
    this.loadElementsHouse(this.#myEnviorment.getHouse());

    this.loadElementsRewards(this.arrayRewards)


    this.user = JSON.parse(localStorage.getItem('user'))

    if (this.#scene.length - 2 != this.arrayRewards.length) {
      // window.location.reload()
    }

    console.log("dsadasdasdasdasd", this.#scene.children);
  }


  draw() {
    this.#render.render(this.#scene, this.#camera); // three
    this.renderUI(); // html
  }

  update() {
    // keyControls.resetHover(this.#scene);
    // keyControls.hoverPiece(this.#scene, this.#camera);
    // this.#myKeyControls.hoverPiece();
    this.#controls.update();

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
            this.conditionDraw = true
            this.#ducktor.playAnimationDraw(this.duck);
            this.cameraAnimation.playAnimationDraw();

            setTimeout(async () => {
              this.view = this.#viewUI.render("draw");
              this.#viewUI.drawLogic("draw", this.duck);
              

              /**FETCH PARA SABER QUE DIBUJO ES */
              await this.fetch.fetchGetPaiting()
              this.#viewUI.renderPopUpDraw(this.fetch.paint)
              this.drawListener(this.conditionDraw)
              
              /**LISTENER PARA SUBIR EL DIBUJO */
              document.getElementById('save-panting').addEventListener('click', async () => {

                /** preparamos la imagen en binario*/
                const img = new Image(1000, 1000);
                const canvasIMG = canvas.toDataURL('image/png', 1.0);
                img.src = canvasIMG;

                /**creamos un formdata para almacenar los datos a enviar */
                const user = JSON.parse(localStorage.getItem('user'))
                const formData = new FormData()

                if(this.paintSelected == 'libre'){
                  formData.append('IdDibujo', 'libre')
                  var cuerpoCoins = {
                    IdUser: this.user.IdUser,
                    Coins: this.user.Coins + 50
                  }
                }else{
                  formData.append('IdDibujo', this.fetch.paint[0].IdDibujo)
                  var cuerpoCoins = {
                    IdUser: this.user.IdUser,
                    Coins: this.user.Coins + 200
                  }
                }
                formData.append('NombreDibujo', this.fetch.paint[0].Tipo)
                formData.append('IdUser', user.IdUser)
                formData.append('MyFile', img.src)

                /**Fetch para enviar el dibujo al servidor */

                await this.fetch.fetchSavePainting(formData)

                await this.fetch.responseConversation(cuerpo)

               

                this.user.Coins = cuerpoCoins.Coins
                this.changeShowCoins(this.user.Coins)
                await this.fetch.fetchCoins(cuerpoCoins)

              })


            }, 1500)
            // 
            document.querySelector(".menu").style.display = "none";
            break;
          case "conversationUI":

            var cuerpo = {
              IdUser: this.fetch.user.IdUser,
              IdTest: "this.fetch.test.IdTest",
              Respuesta1: '',
              Respuesta2: 'la respuesta que sea en INTEGER',
              Respuesta3: 'la respuesta que sea en INTEGER',
              Respuesta4: 'la respuesta que sea en INTEGER',
              Respuesta5: 'la respuesta que sea en INTEGER'
            }

            this.#ducktor.playAnimationConversation();
            this.cameraAnimation.playAnimationConversation();
            document.querySelector(".menu").style.display = "none";

            setTimeout(async () => {
              console.log('toy aqui')
              await this.fetch.fetchGetConversation();

              this.user = await JSON.parse(localStorage.getItem('user'))

              cuerpo.IdTest = this.fetch.test[0].IdTest
              cuerpo.Numtest = this.user.Numtest + 1
              // console.log(this.fetch.test)
              this.#viewUI.render("conversation");
              var i = 0
              this.drawLogic(i)

              document.querySelector(".answer").addEventListener('click',async (e) => {
                i++
                if (i <= 5) {
                  // console.log(i)
                  cuerpo[`Respuesta${i}`] = parseInt(e.target.dataset.indexNumber)
                  this.drawLogic(i)
                }
                if (i == 5) {

                  await this.fetch.responseConversation(cuerpo)

                  var cuerpoCoins = {
                    IdUser: this.user.IdUser,
                    Coins: this.user.Coins + 300
                  }

                  this.user.Coins = cuerpoCoins.Coins
                  this.changeShowCoins(this.user.Coins)
                  await this.fetch.fetchCoins(cuerpoCoins)

                }
              })
            }, 1500);

            break;
          case "shopUI":
            this.#ducktor.playAnimationShop();
            this.cameraAnimation.playAnimationShop();

            setTimeout(async () => {
              await this.fetch.getFurnitures()


              this.view = this.#viewUI.render("shop");
              this.#viewUI.drawLogic("shop", this.duck, this.fetch.shopFornitures, false);

              this.listenerShop()

            }, 1500);

            document.querySelector(".menu").style.display = "none";

            break;
          case "gameUI":
            console.log("game");
            setTimeout(async () => {
              console.log("entro")

              this.#viewUI.render("play");
              this.#viewUI.drawLogic("play");
            }, 1500);
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

  drawListener(condition){

      if(condition){
      this.conditionDraw = false
      document.getElementById('button-draw-selected').addEventListener('click',(e)=>{
      this.paintSelected = e.target.textContent
      console.log(this.paintSelected)
      var node = document.querySelector('.popup')
      node.parentNode.removeChild(node)
    })
    document.getElementById('button-libre').addEventListener('click',(e)=>{
      this.paintSelected = e.target.textContent
      var node = document.querySelector('.popup')
      console.log(this.paintSelected)
      node.parentNode.removeChild(node)
    })


  }
  }
  drawLogic(i) {
    this.#viewUI.drawLogic("conversation", "", this.fetch.test[i], false);
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

  loadSingularElement(element, paramX = 0, paramY = 0, paramZ = 0, RotationX = 0, RotationY = 0) {
    var model
    this.loader = new GLTFLoader();
    this.loader.load(element, (glb) => {
      model = glb.scene
      model.position.set(paramX, paramY, paramZ)
      model.rotation.set(RotationX, RotationY, 0)
      this.#scene.add(model)
    })

  }
  loadElementsHouse(element, paramX = 0, paramY = 0, paramZ = 0) {
    var i = 0
    this.loader = new GLTFLoader();
    var mixer;

    this.loader.load(
      element,
      (glb) => {
        // this.houseEnviorment = glb.scene.children[1]; // Array of two (object and mesh). You need to get the mesh
        this.houseEnviorment = glb.scene;
        this.houseEnviorment.position.set(paramX, paramY, paramZ)
        this.#scene.add(this.houseEnviorment);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + ' soy la casa')
        if ((xhr.loaded / xhr.total) * 100 === 100) {
          setTimeout(function () {
            document.getElementById('charging-page').classList.add('vanish')
            setTimeout(function () {
              let node = document.getElementById('charging-page')
              node.parentNode.removeChild(node)
            }, 5300)
          }, 1000)

        };
      },
      function (error) {
        // console.log("An error happened");
      }
    );
  }
  loadElementsDucktor(element, paramX = 0, paramY = 0, paramZ = 0) {

    this.loader = new GLTFLoader();
    var mixer;

    this.loader.load(
      element,
      (glb) => {
        this.duck = glb.scene.children[0];
        this.duck.position.set(10, 10, -10);
        this.duck.rotation.set(0, 3.1, 0);

        mixer = new THREE.AnimationMixer(this.duck);
        const clips = glb.animations;
        clips.forEach(function (clip) {
          const action = mixer.clipAction(clip);
          action.play();
          action.timeScale = 0.5;
        });7

        this.mixer = mixer;
        this.#ducktor.playAnimationDefault(this.duck);
        this.#scene.add(this.duck)
      });
  }
  loadElementsRewards(data) {

    for (let i = 0; i < data.length; i++) {
      this.loader = new GLTFLoader();
      var model

      this.loader.load(data[i].Url, (glb) => {
        model = glb.scene
        model.position.set(data[i].ParamX, data[i].ParamY, data[i].ParamaZ)
        model.rotation.set(data[i].RotationX, data[i].RotationY, 0)

        if (data[i].Name == 'Cuadro') {
          console.log(data[i].UrlIntegrado)
          const texture = new THREE.TextureLoader().load(data[i].UrlIntegrado)
          texture.encoding = THREE.sRGBEncoding;
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping
          texture.repeat.set(4, 4)
          texture.flipY = false

          var mesh = model.children[1]

          mesh.material = new THREE.MeshStandardMaterial({
            map: texture
          })

          mesh.position.set(data[i].ParamX - 20, data[i].ParamY, -39)
          mesh.rotation.set(0, Math.PI / 2, 0)
          // model.children[1].background = texture
          console.log(mesh)
          this.#scene.add(mesh)
        }

        this.#scene.add(model)
      })


    }

  }
  destroyPage() {
    console.log('destroy')
    let node = document.getElementById('charging-page')
    node.parentNode.removeChild(node)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async logicShop(urlIntegrado) {

    var cuerpoCoins = {
      IdUser: this.user.IdUser,
      Coins: this.user.Coins - this.fetch.shopFornitures[this.indexNumber].Price
    }

    this.user.Coins = cuerpoCoins.Coins
    this.changeShowCoins(this.user.Coins)
    localStorage.setItem('user', JSON.stringify(this.user))

    var cuerpoForniture = {
      Id_User: this.user.IdUser,
      Name: this.fetch.shopFornitures[this.indexNumber].Name,
      Paramx: this.fetch.shopFornitures[this.indexNumber].ParamX,
      ParamY: this.fetch.shopFornitures[this.indexNumber].ParamY,
      ParamaZ: this.fetch.shopFornitures[this.indexNumber].ParamaZ,
      RotationX: this.fetch.shopFornitures[this.indexNumber].RotationX,
      RotationY: this.fetch.shopFornitures[this.indexNumber].RotationY,
      IdRewardShop: this.fetch.shopFornitures[this.indexNumber].IdRewardShop,
      Url: this.fetch.shopFornitures[this.indexNumber].Url,
      UrlIntegrado: urlIntegrado
    }

    await this.fetch.fetchCoins(cuerpoCoins)
    await this.fetch.fetchSaveForniture(cuerpoForniture)

    this.arrayRewards.push(cuerpoForniture)
    localStorage.setItem('rewards', JSON.stringify(this.arrayRewards))

    this.loadSingularElement(
      this.fetch.shopFornitures[this.indexNumber].Url,
      this.fetch.shopFornitures[this.indexNumber].ParamX,
      this.fetch.shopFornitures[this.indexNumber].ParamY,
      this.fetch.shopFornitures[this.indexNumber].ParamaZ,
      this.fetch.shopFornitures[this.indexNumber].RotationX,
      this.fetch.shopFornitures[this.indexNumber].RotationY,
      urlIntegrado
    )
  }

  /**LISTENER PARA LA TIENDA */

  listenerShop() {

    document.querySelector('.grid-shop').addEventListener('click', async (e) => {
      if (e.target.nodeName == 'IMG' || e.target.nodeName == 'DIV') {
        e.target.parentElement.click()
      } else if (e.target.nodeName == 'LI') {

        this.indexNumber = parseInt(e.target.dataset.indexNumber)

        if (this.fetch.shopFornitures[this.indexNumber].Price <= parseInt(this.user.Coins)) {

          if (this.fetch.shopFornitures[this.indexNumber].Name == 'Cuadro') {

            await this.fetch.getPersonalPaints()
            console.log('es el cuadro')
            this.#viewUI.data = this.fetch.personalPaints
            this.#viewUI.renderPopUp()
            this.#viewUI.listennersPopUp()

            document.getElementById('popup-aceptar').addEventListener('click', () => {
            const url = document.getElementById('image-selected').src

              this.logicShop(url)

            })

          } else {
            this.logicShop()
          }




        } else {
          console.log('no tienes dinero suficiente')
        }
      }

    })
  }


  changeShowCoins(data) {
    document.getElementById('show-coins').innerText = data
  }
}



/**
 * 
 *ES UN DIV OCUPA TODA LA PANTALLA QUE TIENE DE STYLE
 *
 *  FUNCION QUITAR LA PANTALLA DE CARGA --->   
 * 
 * 
 * LA CONDICION ELEMENTOS PRIUNCIPALES ES TRUE Y LA CONDICION REWARDS SHOPS ES TRUE?
 * SI ES TRUE 
 *  FUNCION QUITAR LA PANTALLA DE CARGA ()
 *  * 
 * 
 * 
 * 
 * CASA Y EL PATO  ==== 
 * 
 * 
 */