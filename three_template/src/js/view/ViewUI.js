import { CameraAnimation } from "../modules/CameraAnimation";
import { Ducktor } from "./3dModel/Ducktor";

export class ViewUI {
  UIroot = document.getElementById("root-ui");
  camera;
  anim;
  duck;
  constructor(camera) {
    this.camera = camera;
    this.anim = new CameraAnimation(camera);
    this.duckAnim = new Ducktor();
  }

  render(myExpresion) {
    var myView;
    switch (myExpresion) {
      case "draw":
        myView = `
                    <div class="draw">
                        <header class="flex">
                            <h1>Dibujo!</h1>
                            <div>
                                <div class="close center">
                                <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="5.67111" y1="3.15967" x2="37.2604" y2="34.749" stroke="#F9F6E3" stroke-width="6" stroke-linecap="round"/>
                                    <line x1="35.1934" y1="4.64596" x2="4.29314" y2="35.5462" stroke="#F9F6E3" stroke-width="6" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>
                        </header>
                    
                        <section class="container">
                            <div id="toolbar">
                                <h1>Tool Selection</h1>
                                <label for="stroke">Stroke</label>
                                <input id="color" name='stroke' type="color">
                                <label for="lineWidth">Line Width</label>
                                <input id="lineWidth" name='lineWidth' type="number" value="5">
                                <button id="clear">Clear</button>
                                <button id="btndownload">Download</button>
                            </div>
                            <div class="canvas-container">
                                <canvas id="canvas" class="canvas"></canvas>
                            </div>
                        </section>
                    </div>`;
        this.logicExpresion = "draw";
        break;

      case "conversation":
        myView = ``;

        break;

      case "play":
        myView = ``;

        break;

      case "shop":
        var image = new Image();
        image.src = require("../../assets/img/Rectangle.png"); // necesari in parcel
        myView = `
                    <div class="shop">
                        <header class="flex">
                            <h1>Tienda!</h1>
                            <div>
                                <div class="close center">
                                <svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="5.67111" y1="3.15967" x2="37.2604" y2="34.749" stroke="#F9F6E3" stroke-width="6" stroke-linecap="round"/>
                                    <line x1="35.1934" y1="4.64596" x2="4.29314" y2="35.5462" stroke="#F9F6E3" stroke-width="6" stroke-linecap="round"/>
                                    </svg>
                                </div>
                            </div>

                        </header>
                        <main>
                            <ul class="grid">
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                                <li class="product">
                                    <div class="container-prod">
                                        <div class="center"><img src="${image.src}" alt="product img" class="center"></div>
                                        <div class="center"><h3 class="center price">230 peces</h3></div>
                                    </div>
                                    <p class="title-product">Rocket</p>
                                </li>
                            </ul>
                        </main>
                    </div>`;
        break;
      default:
        myView = `
                <div class="flex menu" style="z-index: 3; position: fixed;">
                    <button id="draw"><svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M67.8656 12.5673L79.6539 24.3555M67.8656 12.5673L75.4042 5.02421C76.9757 3.45269 79.1071 2.56982 81.3296 2.56982C83.5521 2.56982 85.6835 3.45269 87.255 5.02421C88.8265 6.59573 89.7094 8.72717 89.7094 10.9496C89.7094 13.1721 88.8265 15.3035 87.255 16.875L23.0451 81.0849C20.6827 83.446 17.7693 85.1814 14.5681 86.1345L2.56982 89.7094L6.14474 77.7111C7.0978 74.5099 8.83323 71.5966 11.1943 69.2341L67.8701 12.5673H67.8656Z" stroke="#2C6344" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button id="conversation"><svg width="86" height="80" viewBox="0 0 86 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.9136 30.75C28.9136 31.1589 28.7515 31.551 28.463 31.8401C28.1745 32.1293 27.7832 32.2917 27.3752 32.2917C26.9671 32.2917 26.5758 32.1293 26.2873 31.8401C25.9988 31.551 25.8367 31.1589 25.8367 30.75C25.8367 30.3411 25.9988 29.949 26.2873 29.6599C26.5758 29.3708 26.9671 29.2083 27.3752 29.2083C27.7832 29.2083 28.1745 29.3708 28.463 29.6599C28.7515 29.949 28.9136 30.3411 28.9136 30.75ZM28.9136 30.75H27.3752M44.2982 30.75C44.2982 31.1589 44.1361 31.551 43.8476 31.8401C43.5591 32.1293 43.1678 32.2917 42.7598 32.2917C42.3517 32.2917 41.9604 32.1293 41.6719 31.8401C41.3834 31.551 41.2213 31.1589 41.2213 30.75C41.2213 30.3411 41.3834 29.949 41.6719 29.6599C41.9604 29.3708 42.3517 29.2083 42.7598 29.2083C43.1678 29.2083 43.5591 29.3708 43.8476 29.6599C44.1361 29.949 44.2982 30.3411 44.2982 30.75ZM44.2982 30.75H42.7598M59.6828 30.75C59.6828 31.1589 59.5208 31.551 59.2322 31.8401C58.9437 32.1293 58.5524 32.2917 58.1444 32.2917C57.7364 32.2917 57.345 32.1293 57.0565 31.8401C56.768 31.551 56.6059 31.1589 56.6059 30.75C56.6059 30.3411 56.768 29.949 57.0565 29.6599C57.345 29.3708 57.7364 29.2083 58.1444 29.2083C58.5524 29.2083 58.9437 29.3708 59.2322 29.6599C59.5208 29.949 59.6828 30.3411 59.6828 30.75ZM59.6828 30.75H58.1444M2.75977 43.1245C2.75977 49.7022 7.36694 55.4331 13.8654 56.391C18.3249 57.0488 22.8295 57.5545 27.3752 57.908V77L44.5403 59.8032C45.3902 58.9549 46.5328 58.4663 47.7321 58.4383C55.7387 58.241 63.726 57.5573 71.65 56.391C78.1526 55.4331 82.7598 49.7063 82.7598 43.1203V18.3797C82.7598 11.7937 78.1526 6.0669 71.6541 5.10901C62.0868 3.70183 52.4296 2.99696 42.7598 3.00001C32.9464 3.00001 23.2972 3.71945 13.8654 5.10901C7.36694 6.0669 2.75977 11.7978 2.75977 18.3797V43.1203V43.1245Z" stroke="#2C6344" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>			
                    </button>
                    <button id="game"><svg width="79" height="85" viewBox="0 0 79 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.51953 9.80474C3.51953 5.39469 8.24106 2.60235 12.1027 4.72494L71.5208 37.4293C72.429 37.9297 73.1864 38.6647 73.7138 39.5578C74.2413 40.4508 74.5195 41.4692 74.5195 42.5065C74.5195 43.5439 74.2413 44.5623 73.7138 45.4553C73.1864 46.3484 72.429 47.0834 71.5208 47.5838L12.1027 80.283C11.221 80.768 10.2283 81.0149 9.22223 80.9993C8.21618 80.9837 7.23155 80.7061 6.36531 80.194C5.49907 79.6818 4.78109 78.9528 4.28209 78.0785C3.78309 77.2043 3.52027 76.2151 3.51953 75.2084V9.80474V9.80474Z" stroke="#2C6344" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>			
                    </button>
                    <button id="shop"><svg width="79" height="85" viewBox="0 0 79 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.51953 9.80474C3.51953 5.39469 8.24106 2.60235 12.1027 4.72494L71.5208 37.4293C72.429 37.9297 73.1864 38.6647 73.7138 39.5578C74.2413 40.4508 74.5195 41.4692 74.5195 42.5065C74.5195 43.5439 74.2413 44.5623 73.7138 45.4553C73.1864 46.3484 72.429 47.0834 71.5208 47.5838L12.1027 80.283C11.221 80.768 10.2283 81.0149 9.22223 80.9993C8.21618 80.9837 7.23155 80.7061 6.36531 80.194C5.49907 79.6818 4.78109 78.9528 4.28209 78.0785C3.78309 77.2043 3.52027 76.2151 3.51953 75.2084V9.80474V9.80474Z" stroke="#2C6344" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>			
                    </button>
                </div>`;
        break;
    }
    this.UIroot.innerHTML += myView;
  }

  drawLogic(logicExpresion, duck) {
    switch (logicExpresion) {
      case "draw":
        var draw = document.querySelector(".draw");
        var menu = document.querySelector(".menu");
        setTimeout(() => {
          draw.style.opacity = 1;
        }, 500);
        document.querySelector(".close").addEventListener("click", () => {
          draw.style.opacity = 0;
          setTimeout(() => {
            draw.remove();
            this.anim.playAnimationDefault();
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

        canvas.width = window.innerWidth - canvasOffsetX;
        canvas.height = window.innerHeight - canvasOffsetY;

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
          ctx.moveTo(e.clientX, e.clientY);
        });

        canvas.addEventListener("mouseup", () => {
          paint = true;
        });

        canvas.addEventListener("mousemove", (e) => {
          if (paint == false) {
            ctx.lineCap = "round";
            ctx.lineWidth = `${line.value}`;
            ctx.strokeStyle = `${color.value}`;

            ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
            ctx.stroke();
          }
        });
        break;
      case "shop":
        var shop = document.querySelector(".shop");
        var menu = document.querySelector(".menu");
        menu.style.opacity = 0;
        setTimeout(() => {
          shop.style.opacity = 1;
        }, 500);

        document.querySelector(".close").addEventListener("click", () => {
          shop.style.opacity = 0;
          setTimeout(() => {
            shop.remove();
          }, 500);
          menu.style.display = "flex";
          menu.style.opacity = 1;
          this.anim.playAnimationDefault();
          this.duckAnim.playAnimationDefault(duck);
        });
        break;
    }
    //             button.addEventListener('click', async (e)=> {
    //                 const img = new Image(1000, 1000);
    //                 const dataURL = canvas.toDataURL();
    //                 const fullQuality = canvas.toDataURL('image/png', 1.0);
    //                 img.src = fullQuality;
    //                 // console.log(fullQuality)

    //                 // const file = new FileReader();
    //                 // file.onload = function () {
    //                 //     document.querySelector(img).src = file.result;
    //                 // }
    //                 // file.readAsDataURL(files[0]);
    //                 // console.log(dataURL);
    //                 // document.body.appendChild(img);

    //                 // Function download IMG
    //                 // var a = document.createElement('a');
    //                 // a.href = img.src;
    //                 // a.download = "draw.png";
    //                 // console.log(a);
    //                 // document.body.appendChild(a);
    //                 // a.click();
    //                 // document.body.removeChild(a);

    //                 // const array = [img.outerHTML];
    //                 // const blob = new Blob(array, { type: "text/html" })

    //                 // const file = new FileList();

    //                 console.log(typeof img.src);

    //                 const formData = new FormData()
    //                 // formData.append('pregunta',pregunta.value)
    //                 formData.append('IdDibujo', 1)
    //                 formData.append('NombreDibujo','casa')

    //                 formData.append('IdUser',1)
    //                 formData.append('MyFile',img.src)

    //                 console.log(formData)

    //                 const options = {
    //                     method: 'post',
    //                     body: formData ,//cambair stringfy
    //                     headers : {'Accept': 'multipart/form-data'},
    //                 }

    //                 await fetch('http://localhost:3000/save-painting',options).then(res=>res.json()).then(response=>console.log(response))

    //             })

    //                     // return response.json(); // parses JSON response into native JavaScript objects

    //         break;
    //     }
  }
}
