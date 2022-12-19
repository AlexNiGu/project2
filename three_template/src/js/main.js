import { AppController } from './AppController.js';
import { Cursor } from './modules/Cursor.js';
import { ChargingPage } from './view/charging.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Audios } from './modules/Audio.js';
// import Shop from '../shop/shop.js';
var audios = new Audios()
document.body.addEventListener('click',(e)=>{
    if(e.clientX >= 755 && e.clientX<=845 && e.clientY >= 450 && e.clientY <= 590){

        audios.playQuack()
    }
    
})
var myAppControl = {}
new Cursor()



const container = document.getElementById('container')

// yes
localStorage.getItem('token') == 'yes'? renderCanvas(): startLogin()
// renderCanvas();
/**LOGIN */

function startLogin() {

    audios.playLoginMusic()
    const buttonLogin = document.getElementById('button-login')

    buttonLogin.addEventListener('click', async () => {

        
        const user = document.getElementById('user').value
        const password = document.getElementById('password').value
    
        var cuerpo = {
            "Nombre": user,
            "Password": password
        }

        var options = {
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cuerpo)
        }

        await fetch('http://localhost:3000/login', options)
            .then(res => res.json())
            .then(response => response.error ?
                mensajeError(response) :
                saveData(response),
            )

    })
    
    function mensajeError(response) {
        alert(response.error)
    }

    function saveData(response) {
        localStorage.setItem('token', 'yes')
        localStorage.setItem('user', JSON.stringify(response))
        audios.stopMusic()
        renderCanvas()
    }


}
const firstInit = new Promise((resolve,reject)=>{
    fetchGetInfoUser()
    resolve()
})


async function renderCanvas(){

    const charging = new ChargingPage()

        await fetchGetInfoUser()
        await fetchGetRewardsUser()
   

    const body = document.getElementById('body')
    const div = document.createElement('div')
    div.id = 'root-ui'
    const canvas = document.createElement('canvas')
    canvas.id = 'bg'
    canvas.style="z-index:-1"
    body.removeChild(container)
    body.insertBefore(div, body.childNodes[0])
    body.insertBefore(canvas, body.childNodes[1])
    var uiRoot = document.getElementById('root-ui');
    uiRoot.innerHTML += charging.renderPage()
    myAppControl = new AppController(uiRoot);
    
    animate()
}

function animate() {
    
    myAppControl.draw();
    myAppControl.update();
    requestAnimationFrame(animate);
}




/**FETCH___________________________________________________________________ */

async function fetchGetRewardsUser(){
    let options = {
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: localStorage.getItem('user')
    }

    await fetch('http://localhost:3000/send-rewards-user', options)
        .then(res => res.json())
        .then(response=>localStorage.setItem('rewards',JSON.stringify(response)))
}

async function fetchGetInfoUser(){
    let options = {
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: localStorage.getItem('user')
    }

    await fetch('http://localhost:3000/ini', options)
        .then(res => res.json())
        .then(response=>localStorage.setItem('user',JSON.stringify(response)))
        
}