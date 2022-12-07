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
                                <button id="save-panting">He acabado!</button>
                            </div>
                            <div class="canvas-container">
                                <canvas id="canvas" class="canvas"></canvas>
                            </div>
                        </section>
                    </div>`;
        this.logicExpresion = "draw";
        break;

      case "conversation":

        
        myView = `    
        <div class="conversation">
          <div class="question center">
                <div class="absolute">
                    <h1 class="anim text text-question"></h1>
                </div>
                <svg width="540" height="190" viewBox="0 0 1080 385" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1029.63 67C838 -18.4557 226.358 -11.5033 77.1608 67C42.9651 84.9922 -40.5308 59.4995 23.4701 224.499C18.9692 285.999 24.4757 370.42 77.1608 366.636C633.594 326.677 717.332 423.412 1029.63 366.636C1079.66 357.538 1092.91 267.999 1065.91 213.999C1085.91 137.999 1061.5 81.2145 1029.63 67Z" fill="#FFFDF1"/>
                    <path d="M313.757 74C313.757 105.48 238.374 123.5 157.874 115.5C81.1064 115.5 37.8738 94.9802 37.8738 63.5C19.374 6 142.106 0 218.874 0C295.641 0 313.757 42.5198 313.757 74Z" fill="#59BCAA"/>
                    <path d="M104.798 83.076C103.305 83.076 102.217 82.8413 101.534 82.372C100.894 81.9027 100.467 81.3053 100.254 80.58C100.041 79.812 99.934 79.0013 99.934 78.148V43.14C99.934 42.3293 100.019 41.5613 100.19 40.836C100.361 40.068 100.787 39.4493 101.47 38.98C102.153 38.5107 103.283 38.2973 104.862 38.34H116.382C119.454 38.34 122.313 38.8947 124.958 40.004C127.603 41.1133 129.929 42.6707 131.934 44.676C133.939 46.6813 135.497 49.028 136.606 51.716C137.715 54.404 138.27 57.3267 138.27 60.484C138.27 63.684 137.715 66.6707 136.606 69.444C135.497 72.1747 133.939 74.564 131.934 76.612C129.929 78.6173 127.582 80.196 124.894 81.348C122.249 82.5 119.347 83.076 116.19 83.076H104.798ZM109.662 73.284H116.382C118.686 73.284 120.755 72.7507 122.59 71.684C124.425 70.5747 125.875 69.0813 126.942 67.204C128.009 65.3267 128.542 63.172 128.542 60.74C128.542 58.308 128.009 56.132 126.942 54.212C125.875 52.292 124.425 50.7987 122.59 49.732C120.755 48.6227 118.665 48.068 116.318 48.068H109.662V73.284ZM158.046 83.012C156.083 83.012 154.227 82.628 152.478 81.86C150.771 81.092 149.278 80.0253 147.998 78.66C146.718 77.252 145.715 75.6093 144.99 73.732C144.307 71.812 143.966 69.7213 143.966 67.46V55.876C143.966 55.0227 144.051 54.2333 144.222 53.508C144.392 52.7827 144.798 52.1853 145.438 51.716C146.12 51.2467 147.251 51.012 148.83 51.012C150.408 51.012 151.518 51.2467 152.158 51.716C152.84 52.1853 153.246 52.804 153.374 53.572C153.544 54.2973 153.63 55.0867 153.63 55.94V67.46C153.63 68.6973 153.843 69.7853 154.27 70.724C154.739 71.62 155.4 72.3027 156.254 72.772C157.15 73.2413 158.195 73.476 159.39 73.476C160.627 73.476 161.672 73.2413 162.526 72.772C163.422 72.26 164.104 71.556 164.574 70.66C165.086 69.764 165.342 68.6973 165.342 67.46V55.812C165.342 54.9587 165.427 54.1693 165.598 53.444C165.768 52.7187 166.174 52.1427 166.814 51.716C167.496 51.2467 168.627 51.012 170.206 51.012C171.784 51.012 172.894 51.2467 173.534 51.716C174.216 52.1853 174.622 52.804 174.75 53.572C174.92 54.2973 175.006 55.0653 175.006 55.876V78.404C175.006 79.2147 174.92 79.9827 174.75 80.708C174.622 81.3907 174.216 81.9453 173.534 82.372C172.851 82.7987 171.742 83.012 170.206 83.012C169.054 83.012 168.158 82.884 167.518 82.628C166.878 82.372 166.408 82.052 166.11 81.668C165.811 81.284 165.619 80.8787 165.534 80.452C165.491 80.0253 165.47 79.6413 165.47 79.3L166.302 78.596C166.174 78.7667 165.896 79.0867 165.47 79.556C165.043 80.0253 164.467 80.5373 163.742 81.092C163.059 81.604 162.248 82.052 161.31 82.436C160.371 82.82 159.283 83.012 158.046 83.012ZM197.506 83.332C195.629 83.332 193.709 82.9907 191.746 82.308C189.826 81.5827 188.034 80.5373 186.37 79.172C184.749 77.764 183.447 76.0573 182.466 74.052C181.485 72.004 180.994 69.6573 180.994 67.012C180.994 64.3667 181.485 62.0413 182.466 60.036C183.447 58.0307 184.749 56.3453 186.37 54.98C187.991 53.6147 189.762 52.5907 191.682 51.908C193.645 51.1827 195.543 50.82 197.378 50.82C198.957 50.82 200.365 51.012 201.602 51.396C202.882 51.7373 203.949 52.164 204.802 52.676C205.698 53.188 206.338 53.636 206.722 54.02C207.447 54.5747 208.087 55.1293 208.642 55.684C209.197 56.2387 209.453 56.964 209.41 57.86C209.367 58.3293 209.218 58.82 208.962 59.332C208.706 59.8013 208.386 60.292 208.002 60.804C206.722 62.596 205.442 63.4067 204.162 63.236C203.522 63.108 202.925 62.8947 202.37 62.596C201.858 62.2973 201.346 61.9987 200.834 61.7C200.365 61.3587 199.853 61.0813 199.298 60.868C198.743 60.6547 198.103 60.548 197.378 60.548C196.141 60.548 195.031 60.8253 194.05 61.38C193.069 61.9347 192.279 62.7027 191.682 63.684C191.127 64.6653 190.85 65.796 190.85 67.076C190.85 68.3133 191.127 69.4227 191.682 70.404C192.279 71.3853 193.047 72.1747 193.986 72.772C194.967 73.3267 196.055 73.604 197.25 73.604C197.975 73.604 198.594 73.5187 199.106 73.348C199.661 73.1773 200.13 72.9853 200.514 72.772C200.898 72.516 201.197 72.324 201.41 72.196C201.922 71.8547 202.413 71.556 202.882 71.3C203.351 71.0013 203.842 70.852 204.354 70.852C204.951 70.852 205.57 71.0867 206.21 71.556C206.85 71.9827 207.554 72.6867 208.322 73.668C209.005 74.564 209.389 75.396 209.474 76.164C209.602 76.932 209.431 77.6573 208.962 78.34C208.493 79.0227 207.767 79.684 206.786 80.324C206.445 80.6227 205.826 81.0067 204.93 81.476C204.077 81.9453 203.01 82.372 201.73 82.756C200.493 83.14 199.085 83.332 197.506 83.332ZM242.043 74.372C243.365 75.524 244.069 76.6333 244.155 77.7C244.24 78.724 243.664 79.9187 242.427 81.284C241.488 82.2653 240.656 82.9053 239.931 83.204C239.248 83.5027 238.565 83.5027 237.883 83.204C237.2 82.948 236.411 82.4147 235.515 81.604L225.403 72.772V78.276C225.403 79.1293 225.317 79.9187 225.147 80.644C225.019 81.3693 224.613 81.9667 223.931 82.436C223.291 82.8627 222.181 83.076 220.603 83.076C219.067 83.076 217.957 82.8627 217.275 82.436C216.592 81.9667 216.165 81.3693 215.995 80.644C215.867 79.876 215.803 79.0653 215.803 78.212V41.284C215.803 40.4307 215.888 39.6413 216.059 38.916C216.229 38.1907 216.656 37.6147 217.339 37.188C218.021 36.7187 219.131 36.484 220.667 36.484C222.203 36.484 223.291 36.7187 223.931 37.188C224.613 37.6147 225.019 38.212 225.147 38.98C225.317 39.7053 225.403 40.4947 225.403 41.348V60.676L232.571 53.764C233.424 52.9533 234.213 52.3987 234.939 52.1C235.707 51.8013 236.453 51.78 237.179 52.036C237.904 52.292 238.672 52.868 239.483 53.764C240.848 55.2573 241.509 56.4733 241.467 57.412C241.424 58.308 240.763 59.396 239.483 60.676L232.571 66.948L242.043 74.372ZM254.581 68.42C253.045 68.42 251.935 68.228 251.253 67.844C250.57 67.4173 250.143 66.884 249.973 66.244C249.845 65.5613 249.781 64.836 249.781 64.068V42.628C249.781 41.86 249.845 41.1347 249.973 40.452C250.143 39.7693 250.57 39.2147 251.253 38.788C251.935 38.3613 253.066 38.148 254.645 38.148C256.223 38.148 257.333 38.3613 257.973 38.788C258.655 39.2147 259.061 39.7693 259.189 40.452C259.359 41.1347 259.445 41.86 259.445 42.628V64.132C259.445 64.8573 259.359 65.5613 259.189 66.244C259.061 66.9267 258.655 67.46 257.973 67.844C257.333 68.228 256.202 68.42 254.581 68.42ZM254.581 83.14C252.49 83.14 251.103 82.7347 250.421 81.924C249.738 81.1133 249.397 79.7693 249.397 77.892C249.397 77.0387 249.482 76.228 249.653 75.46C249.823 74.6493 250.271 73.988 250.997 73.476C251.722 72.964 252.938 72.708 254.645 72.708C256.778 72.708 258.165 73.1133 258.805 73.924C259.487 74.692 259.829 76.036 259.829 77.956C259.829 78.8093 259.743 79.6413 259.573 80.452C259.402 81.22 258.954 81.86 258.229 82.372C257.503 82.884 256.287 83.14 254.581 83.14Z" fill="#373737"/>
                </svg> 
            </div>
            <div class="text">
                <ul class="answer">
                </ul>
            </div>
        </div>`;

        this.logicExpresion = 'conversation';
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


  appenData(data) {
    /*
      0: Object { IdPregunta: "1", IdTest: "1", type_test: "autoestima", … }
      ​​
      IdPregunta: "1"
      ​​
      IdTest: "1"
      ​​
      pregunta: "Cuando te levantas por la mañana que es lo que mas quieres hacer??"
      ​​
      respuesta1: "Volver a dormir!"
      ​​
      respuesta2: "Ver a mi mamá o a mi papá!"
      ​​
      respuesta3: "Jugar a algo!"
      ​​
      respuesta4: ""
      ​​
      type_test: "autoestima"
    */


  }

  drawLogic(logicExpresion, duck='', data='', bol=false) {
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
      case 'conversation':

      if (!bol) {
        // console.log(data)
        document.querySelector('.text-question').innerHTML = data.pregunta;
        document.querySelector('.answer').innerHTML=''
        var i = 1
        Object.entries(data).forEach(([key, value]) => {

          if (key == `respuesta${i}` && value != '') {
            // console.log(key +  "=>", value)
            let myLi = document.createElement('li');
            myLi.setAttribute('data-index-number', i)
             myLi.innerText = value;
             document.querySelector('.answer').appendChild(myLi);
            i++
           
          }
          // console.log(i)
        });
    
        bol = true;
      }



      ////////////////////////////////////////////////////////////////////////////////////
    //     const text = document.querySelector('.anim');
    //     const strText = text.textContent; // it's the value of the h1 text element
    //     // console.log(strText);

    //     // To do a good animation what we can do is split the string into an array
    //     const splitText = strText.split("");
    //     // console.log(splitText);
    //     text.textContent = "";

    //     for (let i=0; i < splitText.length; ++i) {

    //         splitText[i] == " " ? text.innerHTML += "<span>" + '&nbsp;' + "<pan>":         text.innerHTML += "<span>" + splitText[i] + "<pan>";

    //     }

    //     let char = 0;
    //     let timer = setInterval(onTick, 50);

    //     function onTick() {
    //         const span = text.querySelectorAll('span')[char];
    //         span.classList.add('fade');
    //         char++;
    //         if (char === splitText.length) {
    //             complete();
    //             return;
    //         }
    //     }

    //     function complete() {
    //         clearInterval(timer);
    //         timer = null;
    //     }
    //     break;
    }

  }
}
