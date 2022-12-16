import gsap from "gsap";

export class CameraAnimation {

    timeLineDefault;
    timeLineConversation;
    timeLineDraw;
    timeLineGame;
    timeLineShop;

    constructor(camera) {
        this.camera = camera;
        this.timeLineDefault = gsap.timeline();
        this.timeLineConversation = gsap.timeline();
        this.timeLineDraw = gsap.timeline();
        this.timeLineGame = gsap.timeline();
        this.timeLineShop = gsap.timeline();

    }

    playAnimationConversation() {
        // 27 / 35 / 32
        this.timeLineDraw
        .to(this.camera.position, {
            x: 0, // frente -- es izquierda | ++ es derecha
            y: 3, // abajo -- es basjo | ++ es arriba
            z: 24, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(this.camera.rotation, {
            duration: 1.5, 
            x: 0.0005
        }, "<");
    }


    playAnimationDraw() {

        // 27 / 35 / 32
        this.timeLineDraw
        .to(this.camera.position, {
            x: 0, // frente -- es izquierda | ++ es derecha
            y: 3, // abajo -- es basjo | ++ es arriba
            z: 24, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(this.camera.rotation, {
            duration: 1.5, 
            x: 0.0005
        }, "<");
    }

    playAnimationDefault() {
        // 27 / 25 / 32
        this.timeLineDefault
        .to(this.camera.position, {
            x: 0, // frente -- es izquierda | ++ es derecha
            y: 10, // abajo -- es basjo | ++ es arriba
            z: 28, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(this.camera.rotation, {
            duration: 1.5, 
            x: -0.206
        }, "<");
    }


    playAnimationGame() {
        // 27 / 35 / 32
        this.timeLineDraw
        .to(this.camera.position, {
            x: 0, // frente -- es izquierda | ++ es derecha
            y: 3, // abajo -- es basjo | ++ es arriba
            z: 24, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(this.camera.rotation, {
            duration: 1.5, 
            x: 0.0005
        }, "<");
    }

    playAnimationShop() {
        // 27 / 35 / 32
        this.timeLineShop
        .to(this.camera.position, {
            x: 0, // frente -- es izquierda | ++ es derecha
            y: 3, // abajo -- es basjo | ++ es arriba
            z: 24, // adelante -- es adelante | ++ es atras
            duration: 1.5,
            // ease: "expo.out",
            // onUpdate: function() {
            //     this.camera.polookAt(0,0,0);
            // },
        }, "+=0")
        .to(this.camera.rotation, {
            duration: 1.5, 
            x: 0.0005
        }, "<");
    }
}