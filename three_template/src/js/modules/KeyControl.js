import * as THREE from 'three';

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();




export function onMouseMove(event) {
    // this.mouse = new THREE.Vector2();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // console.log(mouse.x, mouse.y);
}

////////////////////////////////////////////////////////////////////////////////

export function hoverPiece(pScene, pCamera) {
    // Make this transparent
    raycaster.setFromCamera(mouse, pCamera);

    const intersect = raycaster.intersectObjects(pScene.children);

    for (let i = 0; i < intersect.length; i++) {
        intersect[i].object.material.transparent = true;
        // console.log(this.mouse, this.camera);
        // intersect[i].object.material.color.set(0x00ff00);
        intersect[i].object.material.opacity = 0.1;
        // console.log("Hover");


    }
    // console.log(intersect);
    // console.log(pScene);
}

export function resetHover(pScene) {
    // const intersect = raycaster.intersectObjects(pScene.children);

    for (let i = 0; i < pScene.children.length; i++) {
        if (pScene.children[i].material) {
            // pScene.children[i].object.material.color.set(0x000000);
            pScene.children[i].material.opacity = 1.0;
        }
    }
}

//////////////////////////////////////////////////////////////////////////

export function onClick(pCamera, pScene) {
    raycaster.setFromCamera(mouse, pCamera);
    var intersect = raycaster.intersectObjects(pScene.children);

    if (intersect > 0) {

    }

    for (let i = 0; i < intersect.length; i++) {
        intersect[i].object.material.color.set(0x00ff00);
        // intersect[i].object.rotation.x -= 3;
    }
    // console.log("Click");

}

    
