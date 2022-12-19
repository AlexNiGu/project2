import { Enviorment } from "./modules/Enviorment.js";
import  *  as keyControls from "./modules/KeyControl.js";
import { ViewUI } from "./view/ViewUI.js";
import { Ducktor } from "./view/3dModel/Ducktor.js";
import { Cursor } from "./modules/Cursor.js";
import { ChargingPage } from "./view/charging.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";
import { CameraAnimation } from "./modules/CameraAnimation.js";
import { Fetch } from "./modules/Fetch.js";
import { Audios } from "./modules/Audio"
import { Memorama } from "./modules/memorama";

import gsap from "gsap";

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
  paintSelected;

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

    this.audio = new Audios()

    this.paintSelected = []

    this.conditionDraw = true

    this.indexNumber = ''
    this.arrayRewards = []

    // this.listenersClicks()
    JSON.parse(localStorage.getItem('rewards')) != null ? this.arrayRewards = JSON.parse(localStorage.getItem('rewards')) : ''

    console.log(this.arrayRewards)
    this.clock = new THREE.Clock();

    // this.listenersClicks()
    
    this.loadElementsHouse(this.#myEnviorment.getHouse());
    this.loadElementsDucktor(this.#ducktor.getDucktor(), 26, 1.5, -1);
    this.loadElementsRewards(this.arrayRewards)

    this.user = JSON.parse(localStorage.getItem('user'))

    if (this.#scene.length - 2 != this.arrayRewards.length) {
      // window.location.reload()
    }

    console.log("dsadasdasdasdasd", this.#scene.children);
  }

  listenersClicks(){
    var i = 0
    document.body.addEventListener('click',(e)=>{
      if(e.clientX >= 755 && e.clientX<=845 && e.clientY >= 450 && e.clientY <= 590){
        console.log(i++)
          this.audio.playQuack()
      }
      
  })
  }

  draw() {
    this.#render.render(this.#scene, this.#camera); // three
    this.renderUI(); // html
  }

  update() {
    

    // keyControls.resetHover(this.#scene);
    // keyControls.hoverPiece(this.#scene, this.#camera);
    // this.#myKeyControls.hoverPiece();
      // keyControls.Click(this.#camera,this.#scene)
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
    
    // window.addEventListener('click',()=>{keyControls.Click(this.#camera,this.#scene,true)});
    // window.addEventListener('mouseup', window.removeEventListener('mousedown',keyControls.Click(this.#camera,this.#scene)) );
    document.getElementById("game").addEventListener("click", () => {
      this.audio.stopMusic()
      this.sectionUI = "gameUI";
      this.renderUIActivate = true;
      // this.audio.playClickMusic()
    });
    document.getElementById("conversation").addEventListener("click", () => {
      this.audio.stopMusic()
      this.sectionUI = "conversationUI";
      this.renderUIActivate = true;
      // this.audio.playClickMusic()
    });
    document.getElementById("draw").addEventListener("click", () => {
      this.audio.stopMusic()
      this.sectionUI = "drawUI";
      this.renderUIActivate = true;
      // this.audio.playClickMusic()
    });
    document.getElementById("shop").addEventListener("click", () => {
      this.audio.stopMusic()
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
            // this.#ducktor.playAnimationDraw(this.duck);
            this.cameraAnimation.playAnimationDraw();
            this.audio.playClickMusic()
            this.audio.playDrawMusic()

            setTimeout(async () => {
              this.view = this.#viewUI.render("draw");
              /**FETCH PARA SABER QUE DIBUJO ES */
              await this.fetch.fetchGetPaiting()
              this.#viewUI.renderPopUpDraw(this.fetch.paint)
              this.drawListener()

              this.drawLogic("draw", this.duck);
              /**LISTENER PARA SUBIR EL DIBUJO */
              document.getElementById('save-panting').addEventListener('click', async () => {

                document.querySelector('.parrafo3').style.display='flex'
                // this.drawLogic("draw", this.duck);
                /** preparamos la imagen en binario*/
                const img = new Image(1000, 1000);
                const canvasIMG = canvas.toDataURL('image/png', 1.0);
                img.src = canvasIMG;

                /**creamos un formdata para almacenar los datos a enviar */
                const user = JSON.parse(localStorage.getItem('user'))
                const formData = new FormData()

                
                if (this.paintSelected.length == 0) {
    
                  formData.append('IdDibujo', 'Libre')
                  formData.append('NombreDibujo', 'Libre')
                  var cuerpoCoins = {
                    IdUser: this.user.IdUser,
                    Coins: this.user.Coins + 50
                  }
                } else{
                  formData.append('IdDibujo', this.fetch.paint[0].IdDibujo)
                  formData.append('NombreDibujo', this.fetch.paint[0].Tipo)
                  var cuerpoCoins = {
                    IdUser: this.user.IdUser,
                    Coins: this.user.Coins + 200
                  }
                }
  
                
                
                formData.append('IdUser', user.IdUser)
                formData.append('MyFile', img.src)

                console.log(formData)
                /**Fetch para enviar el dibujo al servidor */

               this.fetch.fetchSavePainting(formData)
                this.user.Coins = cuerpoCoins.Coins
                // localStorage.setItem('user',this.user)
                this.changeShowCoins(this.user.Coins)
                this.fetch.fetchCoins(cuerpoCoins)

              })

            }, 1500)
            // 
            document.querySelector(".menu").style.display = "none";
            break;
          case "conversationUI":
            this.audio.playClickMusic()
            this.audio.playConversationMusic()
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

              await this.fetch.fetchGetConversation();

              this.user = await JSON.parse(localStorage.getItem('user'))

              if (this.fetch.test != null) {



                cuerpo.IdTest = this.fetch.test[0].IdTest
                cuerpo.Numtest = this.user.Numtest + 1
                // console.log(this.fetch.test)
                this.#viewUI.render("conversation");
                var i = 0
                this.drawLogic("conversation", "", this.fetch.test[i], false)
                this.listenerCLoseConversation()
                document.querySelector(".answer").addEventListener('click', async (e) => {
                  i++
                  console.log(i)
                  if (i <= 4) {
                    var audio = new Audios().playSubClick()
                    cuerpo[`Respuesta${i}`] = parseInt(e.target.dataset.indexNumber)
                    this.drawLogic("conversation", "", this.fetch.test[i], false)
                  }
                  if (i == 5) {

                    cuerpo[`Respuesta${i}`] = parseInt(e.target.dataset.indexNumber)
                    this.drawLogic("conversation", "", this.fetch.test[i], true)
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
              }
            }, 1500);

            break;
          case "shopUI":
            this.audio.playClickMusic()
            this.#ducktor.playAnimationShop();
            this.cameraAnimation.playAnimationShop();
            this.audio.playShopMusic()
            this.view = this.#viewUI.render("shop");

            this.fetch.getFurnitures().then(() => {
              this.#viewUI.appendReward(this.fetch.shopFornitures)
              this.listenerElementsShop()
              this.listenerShopMenu()
            })


            document.querySelector(".menu").style.display = "none";

            break;
          case "gameUI":
            this.audio.playClickMusic()
            this.audio.playGameMusic()
            setTimeout(async () => {

              this.#viewUI.render("play");
              this.drawLogic("play");
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

  drawListener() {
    document.getElementById('button-draw-selected').addEventListener('click', async (e) => {
      this.paintSelected.push(e.target.textContent)
      var node = document.querySelector('.popup')
      node.parentNode.removeChild(node)
      document.querySelector('.overlay').style.display = 'none'
    })
    document.getElementById('button-libre').addEventListener('click',async (e) => {
      var node = document.querySelector('.popup')
      node.parentNode.removeChild(node)
      document.querySelector('.overlay').style.display = 'none'
    })

  }


  listener2() {
    window.addEventListener("resize", () => {
      this.#camera.aspect = window.innerWidth / window.innerHeight;
      this.#camera.updateProjectionMatrix();
      this.#render.setSize(window.innerWidth, window.innerHeight);
    });

    this.buttonConversation.addEventListener("click", this.activeDrawUI());
    
    // window.addEventListener('click', keyControls.onClick(this.#camera, this.#scene ));
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////


  /**CARGAR ELEMENTOS_--------------------------------------------------------------------------------- */
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


        this.houseEnviorment.traverse(function (node) {
          if (node.isMesh) node.castShadow = true;
        })
        this.#scene.add(this.houseEnviorment);
        // console.log(this.houseEnviorment)
      },
      (xhr) => {
        // console.log((xhr.loaded / xhr.total) * 100 + ' soy la casa')
        if ((xhr.loaded / xhr.total) * 100 === 100) {
          setTimeout(() => {
            document.getElementById('charging-page').classList.add('vanish')
            setTimeout(() => {
              this.audio.playAmbientMusic()
              let node = document.getElementById('charging-page')
              node.parentNode.removeChild(node)
            }, 3300)
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
        
        glb.scenes.forEach((scene) => {
          this.duck = scene
          scene.traverse((node) => {
            if (node.isMesh) {
              node.addEventListener('click', () => {
                console.log('mesh clicked!');
              });
            }
          });
        });
        
        this.duck.position.set(20, 0.35, -2);
        this.duck.rotation.set(0, 1.8, 0);

        mixer = new THREE.AnimationMixer(this.duck);
        const clips = glb.animations;

        console.log(clips)
        // clips.forEach(function (clip) {
        //   const action = mixer.clipAction(clip);
        //   action.play();
        //   action.timeScale = 0.5;
        // }); 

        const clip = THREE.AnimationClip.findByName(clips,'ArmatureAction.001')
        const action = mixer.clipAction(clip)
        action.play();
        action.timeScale = 0.5;

        this.mixer = mixer;
        this.#ducktor.playAnimationDefault(this.duck,clips,mixer)
        this.#scene.add(this.duck)
        console.log(this.#scene)
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
          texture.flipY = true

          var mesh = model.children[2]

          mesh.material = new THREE.MeshStandardMaterial({
            map: texture
          })

          mesh.position.set(data[i].ParamX+1.6, data[i].ParamY+1, -11.6)
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

  /**LOGICA DE LA TIENDA--------------------------------------------------------------------- */
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

    document.querySelector(".close").click()
    /**CERRAR LA SHOP Y ACERCAR LA CÁMARA DONDE SE HAYA PUESTO EL OBJETO */
  }

  /**LISTENERS PARA LA TIENDA---------------------------------------------------------------- */

  listenerElementsShop() {

    document.getElementById('grid-shop').addEventListener('click', async (e) => {
      if (e.target.nodeName == 'IMG' || e.target.nodeName == 'DIV') {
        e.target.parentElement.click()
      } else if (e.target.nodeName == 'LI') {

        this.indexNumber = parseInt(e.target.dataset.indexNumber)

        if (this.fetch.shopFornitures[this.indexNumber].Price <= parseInt(this.user.Coins)) {

          let audioGood = new Audios().playClickMusic() 

          if (this.fetch.shopFornitures[this.indexNumber].Name == 'Cuadro') {

            await this.fetch.getPersonalPaints()

            this.#viewUI.data = this.fetch.personalPaints
            this.#viewUI.renderPopUp()
            this.listennersPopUp()

            document.getElementById('popup-aceptar').addEventListener('click', () => {
              const url = document.getElementById('image-selected').src

              this.logicShop(url)

            })

            document.getElementById('popup-cancelar').addEventListener('click', () => {
              const url = document.getElementById('image-selected').src


              var node = document.querySelector('.popup')
              node.parentElement.removeChild(node)
              let overlay = document.querySelector('.overlay')
              overlay.parentElement.removeChild(overlay)
              this.listenerShopMenu()
              this.listenerElementsShop()
              // this.logicShop(url)

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

  listenerShopMenu() {
    var shop = document.querySelector(".shop");
    var menu = document.querySelector(".menu");
    menu.style.opacity = 0;
    setTimeout(() => {
      shop.style.opacity = 1;
    }, 500);

    document.querySelector(".close").addEventListener("click", () => {
      this.audio.stopMusic()
      shop.style.opacity = 0;
      setTimeout(() => {
        shop.remove();
        this.audio.playAmbientMusic()
      }, 500);
      menu.style.display = "flex";
      menu.style.opacity = 1;
      this.cameraAnimation.playAnimationDefault();
      this.#ducktor.playAnimationDefault(this.duck);
    });
  }


  /**------------------- COINS */
  changeShowCoins(data) {
    document.getElementById('show-coins').innerText = data
  }




  /**----------DRAW UI LISTENNERS----AND LOGIC */

  drawLogic(logicExpresion, duck = '', data = '', bol = false) {
    switch (logicExpresion) {
      case "draw":
        var draw = document.querySelector(".draw");
        var menu = document.querySelector(".menu");
        setTimeout(() => {
          draw.style.opacity = 1;
        }, 500);
        document.querySelector(".close").addEventListener("click", () => {
          this.audio.stopMusic()
          console.log('yep')
          draw.style.opacity = 0;
         
            setTimeout(() => {
              this.audio.playAmbientMusic()
              draw.remove();
  
              this.cameraAnimation.playAnimationDefault();
            }, 500);
      
          

          menu.style.display = "flex";
          menu.style.opacity = 1;
        });
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const color = document.getElementById("color");
        const line = document.getElementById("lineWidth");
        const clear = document.getElementById("clear");

        const canvasOffsetX = canvas.offsetLeft;
        const canvasOffsetY = canvas.offsetTop;

        canvas.width = 1251;
        canvas.height = window.innerHeight - canvasOffsetY - 200;

        let paint = false;
        let lineWidth = 5;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        clear.addEventListener("click", (e) => {
          if (e.target.id === "clear") {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        });

        color.addEventListener("click", (e) => {
          if (e.target.id === "stroke") {
            ctx.strokeStyle = e.target.value;
          }
        });
        line.addEventListener("click", (e) => {
          if (e.target.id === "lineWidth") {
            lineWidth = e.target.value;
          }
        });

        canvas.addEventListener("mousedown", (e) => {
          paint = false;
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY);
        });

        canvas.addEventListener("mouseup", () => {
          paint = true;
        });

        canvas.addEventListener("mousemove", (e) => {
          if (paint == false) {
            ctx.lineCap = "round";
            ctx.lineWidth = `${line.value}`;
            ctx.strokeStyle = `${color.value}`;

            ctx.lineTo(e.offsetX , e.offsetY);
            ctx.stroke();
          }
        });
        break;
      case 'play':
        var menograma = document.querySelector(".memograma");
        var menu = document.querySelector(".menu");
        setTimeout(() => {
          menograma.style.opacity = 1;
        }, 500);
        document.querySelector(".close").addEventListener("click", () => {
          this.audio.stopMusic()
          menograma.style.opacity = 0;
          setTimeout(() => {
            this.audio.playAmbientMusic()
            menograma.remove();
            this.cameraAnimation.playAnimationDefault();
          }, 500);

          menu.style.display = "flex";
          menu.style.opacity = 1;
        });
        var imgCover = new Image();
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        var img7 = new Image();
        var img8 = new Image();


        imgCover.src = require('../assets/img/doodad.jpg');

        if (this.user.Edad >= 5 && this.user.Edad <= 8) {
          img1.src = require('../assets/img/gameA/1.jpg');
          img2.src = require('../assets/img/gameA/2.jpg');
          img3.src = require('../assets/img/gameA/3.jpg');
          img4.src = require('../assets/img/gameA/4.jpg');
          img5.src = require('../assets/img/gameA/5.jpg');
          img6.src = require('../assets/img/gameA/6.jpg');
          img7.src = require('../assets/img/gameA/7.jpg');
          img8.src = require('../assets/img/gameA/8.jpg');
        } else {
          img1.src = require('../assets/img/gameB/1.jpg');
          img2.src = require('../assets/img/gameB/2.jpg');
          img3.src = require('../assets/img/gameB/3.jpg');
          img4.src = require('../assets/img/gameB/4.jpg');
          img5.src = require('../assets/img/gameB/5.jpg');
          img6.src = require('../assets/img/gameB/6.jpg');
          img7.src = require('../assets/img/gameB/7.jpg');
          img8.src = require('../assets/img/gameB/8.jpg');
        }



        var json = [
          {
            "src": img1.src,
            "default": imgCover.src
          },
          {
            "src": img1.src,
            "default": imgCover.src
          },
          {
            "src": img2.src,
            "default": imgCover.src
          },
          {
            "src": img2.src,
            "default": imgCover.src
          },
          {
            "src": img3.src,
            "default": imgCover.src
          },
          {
            "src": img3.src,
            "default": imgCover.src
          },
          {
            "src": img4.src,
            "default": imgCover.src
          },
          {
            "src": img4.src,
            "default": imgCover.src
          },
          {
            "src": img5.src,
            "default": imgCover.src
          },
          {
            "src": img5.src,
            "default": imgCover.src
          },
          {
            "src": img6.src,
            "default": imgCover.src
          },
          {
            "src": img6.src,
            "default": imgCover.src
          },
          {
            "src": img7.src,
            "default": imgCover.src
          },
          {
            "src": img7.src,
            "default": imgCover.src
          },
          {
            "src": img8.src,
            "default": imgCover.src
          },
          {
            "src": img8.src,
            "default": imgCover.src
          }
        ]


        new Memorama(json);

        break;
      case 'conversation':

        
        if (!bol) {
          // console.log(data)
          document.querySelector('.text-question').innerHTML = data.pregunta;
          document.querySelector('.answer').innerHTML = ''
          var i = 1
          Object.entries(data).forEach(([key, value]) => {

            if (key == `respuesta${i}` && value != '') {
              let myLi = document.createElement('li');
              myLi.setAttribute('class', 'li-answer center')
              myLi.setAttribute('data-index-number', i)
              myLi.innerText = value;
              document.querySelector('.answer').appendChild(myLi);
              i++
            }
            // console.log(i)
          });

          bol = true;

        }else{
          document.querySelector('.text-question').innerHTML = 'HAS ACABADO POR HOY!!!'
          document.querySelector('.answer').innerHTML = ''
          document.querySelector('.answer').innerHTML = 'TU RECOMEPNSA ES DE 300 PECES!'
        }

    }

  }
  listennersPopUp() {

    document.getElementById("button-der-popup").addEventListener('click', () => {

      let node = document.getElementById("image-selected")
      node.parentElement.removeChild(node)

      if (this.fetch.personalPaints.length != 0) {

        if (this.i < this.fetch.personalPaints.length - 1) {

          this.i++

        } else {
          this.i = 0
        }
        console.log(this.i)
        document.getElementById('imagen-popup').innerHTML += `<img src="${this.fetch.personalPaints[this.i].URL_Dibujo}" id="image-selected"></img>`
        this.listennersPopUp()
      }

    })
    const bottonIZ = document.getElementById("button-iz-popup")
    bottonIZ.addEventListener('click', () => {

      let node = document.getElementById("image-selected")
      node.parentElement.removeChild(node)

      if (this.fetch.personalPaints.length != 0) {

        if (this.i > 0) {
          this.i--
        } else {
          this.i = this.fetch.personalPaints.length - 1
        }
        console.log(this.i)
        document.getElementById('imagen-popup').innerHTML += `<img src="${this.fetch.personalPaints[this.i].URL_Dibujo}" id="image-selected"></img>`
        this.listennersPopUp()
      }

    })
  }

  listenerCLoseConversation(){
    document.querySelector(".close").addEventListener("click", () => {
         
      var menograma = document.querySelector(".conversation");
        var menu = document.querySelector(".menu");
     
      console.log('ara si')
    this.audio.stopMusic()
    menograma.style.opacity = 0;

    
      setTimeout(() => {
        this.audio.playAmbientMusic()
        menograma.remove();
        this.cameraAnimation.playAnimationDefault();
      }, 500);
    
      setTimeout(() => {
        menograma.style.opacity = 1;
      }, 500);
    

    menu.style.display = "flex";
    menu.style.opacity = 1;
  });
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