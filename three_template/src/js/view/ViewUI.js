import { CameraAnimation } from "../modules/CameraAnimation";
import { Ducktor } from "./3dModel/Ducktor";
import { Memorama } from "../modules/memorama";

export class ViewUI {
  UIroot = document.getElementById("root-ui");
  camera;
  anim;
  duck;
  constructor(camera) {
    this.camera = camera;
    this.anim = new CameraAnimation(camera);
    this.duckAnim = new Ducktor();
    this.i = 0
    this.data
    this.user = JSON.parse(localStorage.getItem('user'))
    this.coins=this.user.Coins
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
        
        break

      case "shop":
        // var image = new Image();
        myView = `
                    <div class="shop">
                    <header class="flex shop-header">
                    <h1>Tienda!</h1>
                    <div>
                        <div class="close center">
                            <svg width="45" height="45" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_i_87_576)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.8228 0.642526C24.1023 0.921978 24.2593 1.30099 24.2593 1.6962C24.2593 2.0914 24.1023 2.47042 23.8228 2.74987L14.3398 12.2329L23.8228 21.716C24.1023 21.9954 24.2593 22.3745 24.2593 22.7697C24.2593 23.1649 24.1023 23.5439 23.8228 23.8233C23.5434 24.1028 23.1644 24.2598 22.7692 24.2598C22.3739 24.2598 21.9949 24.1028 21.7155 23.8233L12.2324 14.3403L2.74936 23.8233C2.46991 24.1028 2.0909 24.2598 1.69569 24.2598C1.30049 24.2598 0.921472 24.1028 0.64202 23.8233C0.362569 23.5439 0.205575 23.1649 0.205573 22.7697C0.205575 22.3745 0.362568 21.9954 0.64202 21.716L10.1251 12.2329L0.64202 2.74987C0.362569 2.47042 0.205574 2.0914 0.205574 1.6962C0.205574 1.30099 0.362568 0.921978 0.64202 0.642526C0.921471 0.363075 1.30049 0.206081 1.69569 0.206081C2.0909 0.206081 2.46991 0.363075 2.74937 0.642526L12.2324 10.1256L21.7155 0.642526C21.9949 0.363075 22.3739 0.206081 22.7692 0.206081C23.1644 0.206081 23.5434 0.363075 23.8228 0.642526Z" fill="#F13333"/>
                                </g>
                                <defs>
                                <filter id="filter0_i_87_576" x="0.206055" y="0.206055" width="24.0527" height="28.0537" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_87_576"/>
                                </filter>
                                </defs>
                            </svg>                        
                        </div>
                    </div>
                </header>
                        <main>
                            <ul class="grid-shop">
                            
                            </ul>
                        </main>
                    </div>`;
        break;
      case 'play':
          console.log('entro en tu cu')
          myView = `
            <div class="contenedor-general memograma" style="z-index: 3;>
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
            <div class="game-card">
              <div class="contenedor-tarjetas"></div>
              <div class="pantalla-bloqueada">
                <h2 class="mensaje">¡Has perdido el juego!</h2>
              </div>
            </div>
          </div>
        `
        break;
      default:
        myView = `
        <div class="flex menu" style="z-index: 3; position: fixed;">
        <div class="coins"><p id='show-coins'>${this.coins} </p><svg width="52" height="52" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_87_578)">
        <path d="M7.22827 0.0635796C5.21803 0.282988 2.2979 0.930763 1.56786 1.31734C1.35626 1.43227 0.954213 2.53975 0.626227 3.92934C-0.527014 8.80855 -0.0720661 14.3982 1.86411 19.2357L2.28732 20.2805L2.83749 20.2491C3.67332 20.2073 6.01155 19.57 7.38697 19.0267C11.5027 17.3968 14.8672 14.6594 17.3641 10.9295C18.3163 9.49812 19.1204 7.85779 19.7023 6.11297C20.1255 4.86966 20.6122 2.88454 20.6122 2.42483C20.6122 2.3308 20.4323 2.18452 20.2207 2.10094C18.1999 1.2651 15.5655 0.533739 13.4177 0.230747C11.9999 0.0217876 8.47673 -0.0722446 7.22827 0.0635796ZM9.36547 9.22647L8.23339 10.3549L7.01666 9.15334L5.79994 7.95182L6.93202 6.83388L8.07468 5.7055L9.2914 6.90702L10.5081 8.10854L9.36547 9.22647Z" fill="#2FABF7"/>
        <path d="M23.3735 4.88007C22.2097 9.97869 19.0462 14.9937 14.8988 18.2744C12.0527 20.5312 8.4343 22.276 5.00632 23.0491C4.42441 23.185 3.92714 23.2999 3.90598 23.3208C3.85308 23.373 4.38209 24.2402 5.1756 25.3999C6.81553 27.7925 9.49232 30.7911 11.3862 32.3583C16.1896 36.3285 22.8551 38.6898 31.5097 39.4629C33.0756 39.6092 38.408 39.6406 39.3602 39.5152L39.9633 39.442L40.0373 38.8465C40.196 37.7077 40.122 32.5046 39.9315 30.5195C39.138 22.3805 36.7257 15.8609 32.8005 11.2429C30.8749 8.97569 27.5739 6.18607 24.6961 4.40991C24.1776 4.08602 23.7227 3.82482 23.6804 3.82482C23.6486 3.82482 23.5111 4.29498 23.3735 4.88007ZM26.9073 14.2937C27.6374 14.6594 28.2298 14.9937 28.2298 15.0564C28.2298 15.234 27.0237 17.3236 26.336 18.3371C24.3681 21.2207 21.5114 24.0417 18.5913 25.985C17.565 26.6641 15.449 27.8552 15.2691 27.8552C15.1527 27.8552 13.7667 25.1701 13.8408 25.1074C13.8725 25.0865 14.2746 24.8671 14.7401 24.6163C18.5913 22.5685 22.0299 19.3297 24.3575 15.5579C24.6855 15.0251 25.0558 14.3773 25.1827 14.1161C25.3097 13.8549 25.4578 13.6459 25.5002 13.6459C25.5425 13.6459 26.1773 13.9385 26.9073 14.2937Z" fill="#2FABF7"/>
        <path d="M37.7732 12.7265C39.0322 14.7847 40.4183 17.8878 41.1377 20.2281C41.3176 20.8341 41.4869 21.3983 41.5186 21.4715C41.5503 21.5759 42.6189 20.5938 44.6292 18.6087C46.5548 16.7072 47.6445 15.5579 47.5599 15.5161C47.4012 15.4325 37.3712 11.8698 37.2971 11.8698C37.2654 11.8698 37.477 12.2563 37.7732 12.7265Z" fill="#2FABF7"/>
        <path d="M43.2963 35.9315C43.2857 38.0002 43.0635 41.2182 42.8836 42.0332C42.8519 42.169 42.7249 42.2944 42.5874 42.3257C41.7621 42.5033 38.5034 42.7227 36.4085 42.7332C35.0543 42.7332 33.9434 42.7541 33.9434 42.775C33.9434 42.8377 38.9478 53.2961 39.0113 53.3692C39.0536 53.411 42.4816 50.0886 46.629 45.993C53.2205 39.4838 54.1515 38.5226 53.9822 38.4286C53.6014 38.2405 43.3915 33.4971 43.3492 33.4971C43.328 33.4971 43.2963 34.5942 43.2963 35.9315Z" fill="#2FABF7"/>
        <path d="M12.1054 36.9659C12.2218 37.3629 15.745 47.0169 15.7767 47.0378C15.7979 47.0587 17.1839 45.7109 18.8661 44.0497C20.9081 42.0332 21.8709 41.0093 21.7651 40.9779C21.691 40.9466 21.0139 40.7376 20.2839 40.5078C17.7446 39.7137 14.9515 38.5018 13.0153 37.3316C12.1583 36.8196 12.0419 36.7674 12.1054 36.9659Z" fill="#2FABF7"/>
        </g>
        <defs>
        <filter id="filter0_i_87_578" x="0" y="6.10352e-05" width="54" height="57.3696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_87_578"/>
        </filter>
        </defs>
        <animate
        attributeName="rx"
        values="0;5;0"
        dur="10s"
        repeatCount="indefinite" />
        </svg>
    </div>
        <button id="draw" class="button-menu">
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i_82_11)">
        <path d="M62.6207 2.37928C61.097 0.85584 59.0306 0 56.8759 0C54.7213 0 52.6549 0.85584 51.1312 2.37928L47.55 5.96048L59.0395 17.45L62.6207 13.8688C64.1442 12.3451 65 10.2787 65 8.12406C65 5.96941 64.1442 3.90298 62.6207 2.37928ZM55.7555 20.7341L44.2659 9.24454L6.65866 46.8518C4.74844 48.7611 3.3442 51.1163 2.57294 53.7047L0.0967408 62.0154C-0.0228097 62.4164 -0.0317261 62.8424 0.0709352 63.2481C0.173597 63.6538 0.384017 64.0242 0.679933 64.3201C0.975848 64.616 1.34625 64.8264 1.75195 64.9291C2.15765 65.0317 2.58356 65.0228 2.98461 64.9033L11.2953 62.4271C13.8837 61.6558 16.2389 60.2516 18.1482 58.3413L55.7555 20.7341Z" fill="#2FABF7"/>
        </g>
        <defs>
        <filter id="filter0_i_82_11" x="0" y="0" width="65" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_82_11"/>
        </filter>
        </defs>
        </svg>
        
    </button>
    <button id="conversation" class="button-menu">
    <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_i_82_17)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5 7.55253e-06C24.9817 7.55253e-06 17.5902 0.593361 10.3629 1.73673C4.24048 2.70343 0 8.48363 0 14.9705V35.0312C0 41.5181 4.24048 47.2983 10.3629 48.265C13.0774 48.695 15.8136 49.045 18.5714 49.3183V62.5021C18.5718 62.9963 18.7082 63.4792 18.9633 63.8899C19.2184 64.3007 19.5808 64.6208 20.0048 64.8098C20.4287 64.9989 20.8951 65.0484 21.3452 64.9521C21.7952 64.8558 22.2087 64.618 22.5333 64.2688L35.4838 50.325C35.7038 50.0918 35.9985 49.9582 36.3071 49.9517C42.5162 49.785 48.6324 49.2183 54.6371 48.265C60.7595 47.2983 65 41.5214 65 35.0312V14.9705C65 8.48029 60.7595 2.70343 54.6371 1.73673C47.3072 0.578038 39.9085 -0.00241516 32.5 7.55253e-06ZM20.8929 21.2507C19.9693 21.2507 19.0836 21.6458 18.4306 22.3491C17.7776 23.0524 17.4107 24.0063 17.4107 25.0009C17.4107 25.9954 17.7776 26.9493 18.4306 27.6526C19.0836 28.3559 19.9693 28.751 20.8929 28.751C21.8164 28.751 22.7021 28.3559 23.3551 27.6526C24.0081 26.9493 24.375 25.9954 24.375 25.0009C24.375 24.0063 24.0081 23.0524 23.3551 22.3491C22.7021 21.6458 21.8164 21.2507 20.8929 21.2507ZM29.0179 25.0009C29.0179 24.0063 29.3847 23.0524 30.0378 22.3491C30.6908 21.6458 31.5765 21.2507 32.5 21.2507C33.4235 21.2507 34.3092 21.6458 34.9622 22.3491C35.6153 23.0524 35.9821 24.0063 35.9821 25.0009C35.9821 25.9954 35.6153 26.9493 34.9622 27.6526C34.3092 28.3559 33.4235 28.751 32.5 28.751C31.5765 28.751 30.6908 28.3559 30.0378 27.6526C29.3847 26.9493 29.0179 25.9954 29.0179 25.0009ZM44.1071 21.2507C43.1836 21.2507 42.2979 21.6458 41.6449 22.3491C40.9919 23.0524 40.625 24.0063 40.625 25.0009C40.625 25.9954 40.9919 26.9493 41.6449 27.6526C42.2979 28.3559 43.1836 28.751 44.1071 28.751C45.0307 28.751 45.9164 28.3559 46.5694 27.6526C47.2224 26.9493 47.5893 25.9954 47.5893 25.0009C47.5893 24.0063 47.2224 23.0524 46.5694 22.3491C45.9164 21.6458 45.0307 21.2507 44.1071 21.2507Z" fill="#2FABF7"/>
    </g>
    <defs>
    <filter id="filter0_i_82_17" x="0" y="0" width="65" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_82_17"/>
    </filter>
    </defs>
    </svg>

</button>
<button id="game" class="button-menu">
<svg width="60" height="65" viewBox="0 0 60 65" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_82_5)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.41906C0 1.78449 5.95061 -1.78749 10.8154 0.927061L55.7271 26.01C60.767 28.8233 60.767 36.1767 55.7271 38.99L10.8193 64.0729C5.9545 66.7875 0.00389155 63.2155 0.00389155 57.5809V7.41906H0Z" fill="#2FABF7"/>
</g>
<defs>
<filter id="filter0_i_82_5" x="0" y="0" width="59.5068" height="69" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_82_5"/>
</filter>
</defs>
</svg>
        
</button>
<button id="shop" class="button-menu">
<svg width="65" height="71" viewBox="0 0 65 71" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_i_82_19)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.3056 15.1944V17.7268H10.5965C7.355 17.7268 4.64027 20.1714 4.29924 23.396L0.0346856 63.9143C-0.0580666 64.7967 0.0357073 65.6888 0.309925 66.5327C0.584143 67.3765 1.03268 68.1533 1.62645 68.8127C2.22021 69.472 2.94594 69.9992 3.75657 70.36C4.56719 70.7208 5.44461 70.9072 6.33191 70.9071H58.6681C59.5554 70.9072 60.4328 70.7208 61.2434 70.36C62.0541 69.9992 62.7798 69.472 63.3736 68.8127C63.9673 68.1533 64.4159 67.3765 64.6901 66.5327C64.9643 65.6888 65.0581 64.7967 64.9653 63.9143L60.7008 23.396C60.5372 21.8399 59.8032 20.3995 58.6404 19.3526C57.4775 18.3057 55.9682 17.7265 54.4035 17.7268H47.6944V15.1944C47.6944 11.1646 46.0935 7.29983 43.244 4.45033C40.3945 1.60083 36.5298 0 32.5 0C28.4702 0 24.6055 1.60083 21.756 4.45033C18.9065 7.29983 17.3056 11.1646 17.3056 15.1944ZM32.5 5.06479C29.8135 5.06479 27.237 6.13201 25.3373 8.03168C23.4376 9.93134 22.3704 12.5078 22.3704 15.1944V17.7268H42.6296V15.1944C42.6296 12.5078 41.5624 9.93134 39.6627 8.03168C37.763 6.13201 35.1865 5.06479 32.5 5.06479ZM22.3704 32.9211C22.3704 35.6077 23.4376 38.1842 25.3373 40.0838C27.237 41.9835 29.8135 43.0507 32.5 43.0507C35.1865 43.0507 37.763 41.9835 39.6627 40.0838C41.5624 38.1842 42.6296 35.6077 42.6296 32.9211V30.3888C42.6296 29.7171 42.8964 29.073 43.3713 28.5981C43.8462 28.1232 44.4903 27.8564 45.162 27.8564C45.8336 27.8564 46.4777 28.1232 46.9527 28.5981C47.4276 29.073 47.6944 29.7171 47.6944 30.3888V32.9211C47.6944 36.9509 46.0935 40.8157 43.244 43.6652C40.3945 46.5147 36.5298 48.1155 32.5 48.1155C28.4702 48.1155 24.6055 46.5147 21.756 43.6652C18.9065 40.8157 17.3056 36.9509 17.3056 32.9211V30.3888C17.3056 29.7171 17.5724 29.073 18.0473 28.5981C18.5223 28.1232 19.1664 27.8564 19.838 27.8564C20.5097 27.8564 21.1538 28.1232 21.6287 28.5981C22.1036 29.073 22.3704 29.7171 22.3704 30.3888V32.9211Z" fill="#2FABF7"/>
</g>
<defs>
<filter id="filter0_i_82_19" x="0" y="0" width="65" height="74.9071" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_82_19"/>
</filter>
</defs>
</svg>
                           
</button>
        </div>`;
        break;
    }
    this.UIroot.innerHTML += myView;
  }


  drawLogic(logicExpresion, duck = '', data = '', bol = false) {
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
      case 'play':
        
        var imgCover = new Image();
        var img1 = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        var img7 = new Image();
        var img8 = new Image();

        imgCover.src= require('../../assets/img/doodad.jpg');
        img1.src= require('../../assets/img/1.jpg');
        img2.src= require('../../assets/img/2.jpg');
        img3.src= require('../../assets/img/3.jpg');
        img4.src= require('../../assets/img/4.jpg');
        img5.src= require('../../assets/img/5.jpg');
        img6.src= require('../../assets//img/6.jpg');
        img7.src= require('../../assets/img/7.jpg');
        img8.src= require('../../assets/img/8.jpg');

        var json = [
          {
              "src": img1.src,
              "default" : imgCover.src
          },
          {
              "src": img1.src,
              "default" : imgCover.src
          },
          {
              "src": img2.src,
              "default" : imgCover.src
          },
          {
              "src": img2.src,
              "default" : imgCover.src
          },
          {
              "src": img3.src,
              "default" : imgCover.src
          },
          {
              "src": img3.src,
              "default" : imgCover.src
          },
          {
              "src": img4.src,
              "default" : imgCover.src
          },
          {
              "src": img4.src,
              "default" : imgCover.src
          },
          {
              "src": img5.src,
              "default" : imgCover.src
          },
          {
              "src": img5.src,
              "default" : imgCover.src
          },
          {
              "src": img6.src,
              "default" : imgCover.src
          },
          {
              "src": img6.src,
              "default" : imgCover.src
          },
          {
              "src": img7.src,
              "default" : imgCover.src
          },
          {
              "src": img7.src,
              "default" : imgCover.src
          },
          {
              "src": img8.src,
              "default" : imgCover.src
          },
          {
              "src": img8.src,
              "default" : imgCover.src
          }
        ]


        new Memorama(json);

        break;
      case "shop":
        if (!bol) {
          this.appendReward(data)
          bol = true
        }
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
          document.querySelector('.answer').innerHTML = ''
          var i = 1
          Object.entries(data).forEach(([key, value]) => {

            if (key == `respuesta${i}` && value != '') {
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
 renderPopUp(i=0){

  const popUp =`<div class="popup" id="popup">
  <div class="imagen-popup" id="imagen-popup">
  <button id="button-iz-popup" class="button-iz-popup"> izquierda </button>
  <button id="button-der-popup" class="button-der-popup"> derecha </button> 
  <img src="${this.data[i].URL_Dibujo}" id="image-selected">
  </div>
  <div class="popup-buttons">
  <button id="popup-aceptar">Aceptar</button>
  <button id="popup-cancelar">Cancelar</button>
  </div>
  </div>`
          
  document.querySelector('.shop').innerHTML += popUp
  }

  listennersPopUp(){

    document.getElementById("button-der-popup").addEventListener('click',()=>{

      let node = document.getElementById("image-selected")
      node.parentElement.removeChild(node)

      if(this.data.length != 0){

        if(this.i < this.data.length -1){

          this.i++

        }else{
          this.i = 0
        }
        console.log(this.i)
        document.getElementById('imagen-popup').innerHTML += `<img src="${this.data[this.i].URL_Dibujo}" id="image-selected"></img>`
        this.listennersPopUp()
      }

    })

    document.getElementById("button-iz-popup").addEventListener('click',()=>{

      let node = document.getElementById("image-selected")
      node.parentElement.removeChild(node)

      if(this.data.length != 0){

        if(this.i > 0){
          this.i--
        }else{
          this.i = this.data.length -1
        }
        console.log(this.i)
        document.getElementById('imagen-popup').innerHTML += `<img src="${this.data[this.i].URL_Dibujo}" id="image-selected"></img>`
        this.listennersPopUp()
      }
      
    })
  }


  appendReward(data) {
    for (let i = 0; i < data.length; i++) {
      document.querySelector('.grid-shop').innerHTML +=
        `<li class="product" data-index-number="${i}">
            <div class="container-prod">
                <div class="center"><img src="${data[i].UrlImagen}" alt="product img" class="center"></div>
                <div class="center"><h3 class="center price">${data[i].Price}<svg class='svg-shop-fish' width="50" height="47" viewBox="0 0 76 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_100_2)">
                <path d="M5.19555 33.8415C3.92924 35.4181 2.32244 37.941 2.07958 38.7306C2.01122 38.9615 2.51004 40.0289 3.26071 41.2434C5.89537 45.509 10.1696 49.1398 14.9592 51.1913L15.9973 51.6308L16.3641 51.2196C16.9256 50.599 18.1283 48.495 18.7167 47.1383C20.4744 43.0755 20.9179 38.7608 20.046 34.3578C19.7072 32.6723 19.1159 30.9438 18.2936 29.2986C17.7137 28.1202 16.6541 26.3724 16.3291 26.0473C16.2626 25.9808 16.032 26.0046 15.8232 26.0951C13.8033 26.933 11.4233 28.2787 9.69033 29.5832C8.54008 30.4379 5.9823 32.8627 5.19555 33.8415ZM13.1859 38.8094L13.1833 40.4078L11.4734 40.4186L9.7634 40.4293L9.7734 38.8383L9.78349 37.2325L11.4934 37.2217L13.2034 37.211L13.1859 38.8094Z" fill="#2FABF7"/>
                <path d="M20.0181 25.8308C22.8005 30.259 24.1097 36.0421 23.4968 41.2945C23.0801 44.9028 21.7553 48.6952 19.878 51.6658C19.5626 52.1733 19.2922 52.6062 19.292 52.636C19.2916 52.7103 20.2788 52.9494 21.66 53.2084C24.5114 53.7406 28.5245 53.9681 30.9718 53.7372C37.1757 53.148 43.5586 50.1044 50.2251 44.5314C51.4357 43.5276 55.2285 39.7792 55.8131 39.0172L56.1879 38.5391L55.8191 38.0656C55.1261 37.1481 51.3945 33.5213 49.8562 32.2523C43.54 27.0582 37.2242 24.154 31.1832 23.6641C28.2184 23.4225 23.9117 23.7842 20.6208 24.5632C20.0252 24.7007 19.5188 24.8377 19.4889 24.8676C19.4665 24.8901 19.7017 25.3198 20.0181 25.8308ZM29.1733 29.9885C29.9481 29.7308 30.6035 29.5483 30.6478 29.5926C30.7734 29.7182 31.3981 32.0486 31.6285 33.2516C32.276 36.6821 32.2507 40.6968 31.56 44.1358C31.3146 45.3417 30.6605 47.6802 30.5333 47.8073C30.451 47.8896 27.5723 46.971 27.5803 46.8743C27.588 46.8371 27.7172 46.3977 27.869 45.8912C29.1442 41.72 29.2854 36.9983 28.2643 32.6854C28.1194 32.0767 27.9232 31.3568 27.8283 31.0823C27.7334 30.8079 27.6904 30.5554 27.7203 30.5254C27.7502 30.4955 28.406 30.2535 29.1733 29.9885Z" fill="#2FABF7"/>
                <path d="M35.7486 21.1969C38.0942 21.7621 41.2685 22.9762 43.4321 24.1224C43.9878 24.4237 44.5064 24.7029 44.5806 24.7322C44.6769 24.7836 44.7381 23.3335 44.7558 20.5084C44.7728 17.8022 44.7307 16.219 44.6413 16.2493C44.47 16.3024 34.8585 20.8754 34.8061 20.9278C34.7836 20.9502 35.2066 21.074 35.7486 21.1969Z" fill="#2FABF7"/>
                <path d="M56.0622 33.7001C57.5175 35.1703 59.6359 37.6029 60.0849 38.3064C60.1585 38.4248 60.1574 38.6033 60.0823 38.7227C59.6244 39.4318 57.4753 41.8912 56.0013 43.3799C55.0437 44.3375 54.273 45.1378 54.2877 45.1526C54.3321 45.1969 65.266 49.0535 65.3626 49.0603C65.4221 49.06 65.4967 44.2867 65.5333 38.458C65.5915 29.1945 65.5702 27.8564 65.384 27.9096C64.9817 28.046 54.4082 31.9114 54.3782 31.9413C54.3633 31.9563 55.1165 32.7544 56.0622 33.7001Z" fill="#2FABF7"/>
                <path d="M34.7378 56.4867C35.1009 56.6851 44.4185 61.0202 44.4558 61.0125C44.4855 61.0123 44.5125 59.0793 44.5274 56.7151C44.5454 53.8453 44.5022 52.4405 44.4052 52.4931C44.3307 52.5234 43.7041 52.8544 43.0254 53.2081C40.6684 54.4421 37.8363 55.5602 35.6398 56.1018C34.6718 56.3458 34.5526 56.3912 34.7378 56.4867Z" fill="#2FABF7"/>
                </g>
                <defs>
                <filter id="filter0_i_100_2" x="2.07324" y="16.2488" width="63.4883" height="48.7637" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="shape" result="effect1_innerShadow_100_2"/>
                </filter>
                </defs>
                </svg>
                </h3>
                </div>
            </div>
            <p class="title-product">${data[i].Name}</p>
         </li>`
    }
  }


  renderPopUpDraw(data){
    const popDraw = `<div class="popup" id="popup">
    <div class="imagen-popup" id="imagen-popup">
  <button id="button-draw-selected" class="button-iz-popup"> ${data[0].Tipo}</button>
  <button id="button-libre" class="button-der-popup"> Libre </button> 
  </div>
  </div>
    </div>`

    document.querySelector('.draw').innerHTML += popDraw
  }
}



