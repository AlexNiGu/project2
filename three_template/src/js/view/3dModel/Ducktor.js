
// import * as YUKA from './yuka.js';
import * as THREE from 'three';
import gsap from "gsap";


export class Ducktor {

    timeLineDefault;
    timeLineConversation;
    timeLineDraw;
    timeLineGame;
    timeLineShop;

    modelURL = new URL("../../../assets/doggo2.glb", import.meta.url);

    constructor(duck) {

        this.timeLineDefault = gsap.timeline();
        this.timeLineConversation = gsap.timeline();
        this.timeLineDraw = gsap.timeline();
        this.timeLineGame = gsap.timeline();
        this.timeLineShop = gsap.timeline();
        this.duck = duck;
    }

    getDucktor() {
        return this.modelURL.href;
    }

    playAnimationDefault(duck) {
        let repeat = this.timeLineDefault.repeat();
        // 26, 1.5, -1
        this.timeLineDefault
        .to(duck.position, {
            x: 33, // frente -- es izquierda | ++ es derecha
            y: 1.5, // abajo -- es basjo | ++ es arriba
            z: -1, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(duck.position, {
            x: 10, // frente -- es izquierda | ++ es derecha
            y: 1.5, // abajo -- es basjo | ++ es arriba
            z: -5, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        },)
        .to(duck.position, {
            x: 26, // frente -- es izquierda | ++ es derecha
            y: 1.5, // abajo -- es basjo | ++ es arriba
            z: -1, // adelante -- es adelante | ++ es atras
            duration: 6,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        },)
        .to(duck.rotation, {
            duration: 1.5, 
            y: Math.PI * 3,
            // repeat: -1 // means infinite in gsap doc. Not a joke
        }, "<");

        this.timeLineDefault.repeat(-1)
    }


    playAnimationConversation() {

    }


    playAnimationDraw(duck) {

        this.timeLineDefault.kill();
        // 26, 1.5, -1
        this.timeLineDraw
        .to(duck.position, {
            x: 33, // frente -- es izquierda | ++ es derecha
            y: 1.5, // abajo -- es basjo | ++ es arriba
            z: -1, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(duck.rotation, {
            duration: 1.5, 
            y: Math.PI * 3,
        }, "<");

    }

    playAnimationGame() {

    }

    playAnimationShop() {


    }


}