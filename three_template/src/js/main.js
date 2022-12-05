import { AppController } from './AppController.js';
import { Cursor } from './modules/Cursor.js';
import * as THREE from "three";


var myAppControl = new AppController();
var cursor = new Cursor();

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