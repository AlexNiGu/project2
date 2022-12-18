
// import * as YUKA from './yuka.js';
import * as THREE from 'three';
import gsap from "gsap";
import { Audios } from '../../modules/Audio';


export class Ducktor {

    timeLineDefault;
    timeLineConversation;
    timeLineDraw;
    timeLineGame;
    timeLineShop;

    modelURL = new URL("../../../assets/ducktor.glb", import.meta.url);

    constructor(duck) {

        this.timeLineDefault = gsap.timeline();
        this.timeLineConversation = gsap.timeline();
        this.timeLineDraw = gsap.timeline();
        this.timeLineGame = gsap.timeline();
        this.timeLineShop = gsap.timeline();
        this.duck = duck;
        this.audio = new Audios()
    }

    getDucktor() {
        return this.modelURL.href;
    }

    playAnimationDefault(duck, clips, mixer) {
        let repeat = this.timeLineDefault.repeat();
        // 20, 0.35, -2
        this.timeLineDefault
            .to(duck.position, {
                x: 0, // frente -- es izquierda | ++ es derecha
                y: 0.35, // abajo -- es basjo | ++ es arriba
                z: -2, // adelante -- es adelante | ++ es atras
                duration: 9,
                // ease: "expo.out",
                onStart: ()=> {
                    this.audio.playSteps()
                },
            }, "+=0").to(duck.rotation, {
                duration: 0.5,
                y: Math.PI * 3,
                // repeat: -1 // means infinite in gsap doc. Not a joke
            },)
            .to(duck.position, {
                x: 0, // frente -- es izquierda | ++ es derecha
                y: 0.35, // abajo -- es basjo | ++ es arriba
                z: 5, // adelante -- es adelante | ++ es atras
                duration: 3.5,
                onComplete: () => {
                  
                    this.audio.stopMusic()
                      
                            const clip1 = THREE.AnimationClip.findByName(clips,'Action.001')
                              const action1 = mixer.clipAction(clip1)
                              action1.play();
                              action1.timeScale = 0.5;
                        

                        const clip2 = THREE.AnimationClip.findByName(clips,'ArmatureAction.001')
                              const action2 = mixer.clipAction(clip2)
                              action2.stop();
                              action2.timeScale = 0.5;


              


                    //   const clip = THREE.AnimationClip.findByName(clips,'ArmatureAction.001')
                    //   const action = mixer.clipAction(clip)
                    //   action.play();
                    //   action.timeScale = 0.5;
                }
                // ease: "expo.out",
                // onUpdate: function() {
                //     this.camera.polookAt(0,0,0);
                // },
            },)
        // .to(duck.position, {
        //     x: 26, // frente -- es izquierda | ++ es derecha
        //     y: 0.3, // abajo -- es basjo | ++ es arriba
        //     z: -1, // adelante -- es adelante | ++ es atras
        //     duration: 6,
        //     // ease: "expo.out",
        //     // onUpdate: function() {
        //     //     this.camera.polookAt(0,0,0);
        //     // },
        // },)


        // this.timeLineDefault.repeat(-1)
    }

    ordenador(){

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