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
        <header class="flex shop-header">
            <h1>Dibujo!</h1>
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
        <div class="">
                <div id="toolbar" class="center toolbar">
                    <label for="stroke">Color</label>
                    <input id="color" name='stroke' type="color">
                    <label for="lineWidth">Tamaño</label>
                    <input id="lineWidth" name='lineWidth' type="number" value="5">
                    <button id="clear"><svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_i_86_472)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.3259 5.48144V5.88468C31.018 6.09569 33.6992 6.39911 36.3629 6.7942C36.564 6.82406 36.7563 6.88758 36.9288 6.98114C37.1013 7.0747 37.2506 7.19646 37.3682 7.33948C37.4858 7.4825 37.5694 7.64396 37.6141 7.81466C37.6589 7.98536 37.664 8.16195 37.6292 8.33434C37.5944 8.50673 37.5203 8.67156 37.4111 8.8194C37.3019 8.96725 37.1599 9.09522 36.993 9.196C36.8262 9.29679 36.6378 9.36842 36.4387 9.40681C36.2395 9.44519 36.0335 9.44958 35.8324 9.41972L35.3992 9.35755L33.3164 32.5751C33.1963 33.9138 32.4912 35.1643 31.3419 36.0765C30.1927 36.9888 28.684 37.4957 27.1177 37.4958H10.8841C9.31769 37.4957 7.80906 36.9888 6.65982 36.0765C5.51058 35.1643 4.80542 33.9138 4.68533 32.5751L2.60044 9.35755L2.16729 9.41972C1.96617 9.44958 1.76015 9.44519 1.561 9.40681C1.36185 9.36842 1.17348 9.29679 1.00663 9.196C0.669655 8.99246 0.440822 8.68251 0.370467 8.33434C0.300111 7.98617 0.393997 7.62831 0.631469 7.33948C0.868942 7.05065 1.23055 6.8545 1.63674 6.7942C4.30041 6.39864 6.98159 6.09522 9.67375 5.88468V5.48144C9.67375 2.70315 12.1876 0.329873 15.5098 0.239277C17.8366 0.175449 20.1652 0.175449 22.4919 0.239277C25.8141 0.329873 28.3259 2.70315 28.3259 5.48144ZM15.6093 2.9021C17.8698 2.84014 20.132 2.84014 22.3925 2.9021C23.953 2.94474 25.2172 4.07098 25.2172 5.48144V5.68217C21.0761 5.4666 16.9236 5.4666 12.7824 5.68217V5.48144C12.7824 4.07098 14.0446 2.94474 15.6093 2.9021ZM14.8736 13.4628C14.8657 13.2879 14.8176 13.1159 14.7322 12.9569C14.6468 12.7978 14.5257 12.6548 14.3758 12.5358C14.2259 12.4169 14.0501 12.3244 13.8585 12.2637C13.6669 12.203 13.4632 12.1753 13.2591 12.182C13.055 12.1888 12.8544 12.23 12.6689 12.3032C12.4833 12.3764 12.3164 12.4802 12.1776 12.6087C12.0389 12.7372 11.931 12.8878 11.8602 13.0521C11.7894 13.2163 11.757 13.3909 11.7649 13.5658L12.484 29.5535C12.5 29.9066 12.6789 30.2398 12.9815 30.4798C13.1313 30.5987 13.3069 30.6911 13.4984 30.7517C13.6899 30.8124 13.8934 30.8401 14.0974 30.8334C14.3014 30.8266 14.5018 30.7855 14.6873 30.7123C14.8727 30.6391 15.0395 30.5354 15.1782 30.407C15.3168 30.2786 15.4246 30.128 15.4954 29.9639C15.5662 29.7997 15.5985 29.6253 15.5906 29.4504L14.8736 13.4628ZM26.2307 13.5658C26.2458 13.3875 26.219 13.2084 26.1517 13.0392C26.0845 12.8699 25.9782 12.714 25.8391 12.5807C25.7001 12.4474 25.5312 12.3395 25.3424 12.2634C25.1537 12.1872 24.949 12.1444 24.7406 12.1375C24.5321 12.1306 24.3242 12.1597 24.1292 12.2231C23.9341 12.2865 23.756 12.3829 23.6053 12.5066C23.4547 12.6303 23.3346 12.7787 23.2523 12.9429C23.17 13.1072 23.127 13.284 23.1261 13.4628L22.407 29.4504C22.391 29.8038 22.5395 30.1481 22.8197 30.4076C23.0999 30.6671 23.489 30.8206 23.9012 30.8342C24.3134 30.8479 24.7151 30.7206 25.0179 30.4805C25.3207 30.2403 25.4997 29.9068 25.5157 29.5535L26.2307 13.5658Z" fill="#F43434"/>
                        </g>
                        <defs>
                        <filter id="filter0_i_86_472" x="0.347656" y="0.191406" width="37.3042" height="41.3044" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_86_472"/>
                        </filter>
                        </defs>
                        </svg>
                        </button>
                    <button id="save-panting">He acabado!</button>
              </div>
          </div>
        
    <section class="container">
        <div class="canvas-container">
            <canvas id="canvas" class="draw-canvas"></canvas>
        </div>
    </section>`;
        this.logicExpresion = "draw";
        break;

      case "conversation":
        myView = `    
        <div class="conversation">
        <header class="flex shop-header">
            <h1>Encuestas!</h1>
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
        <div class="center">
              <div class="question">
                  <h1 class="text-question">Siento una especie de temor como si algo malo fuera a suceder:</h1>
              </div>

          </div>
          <hr class="hr">
          <div class="text">
              <ul class="answer">
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
            <div class="contenedor-general memograma" style="z-index: 3;">
            <header class="flex">
              <h1>Juego!</h1>
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
        var menograma = document.querySelector(".memograma");
        var menu = document.querySelector(".menu");
        setTimeout(() => {
          menograma.style.opacity = 1;
        }, 500);
        document.querySelector(".close").addEventListener("click", () => {
          draw.style.opacity = 0;
          setTimeout(() => {
            menograma.remove();
            // this.anim.playAnimationDefault();
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
              myLi.setAttribute('class', 'li-answer center')
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
}



