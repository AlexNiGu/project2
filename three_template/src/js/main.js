import { AppController} from './AppController.js';
import { Cursor } from './modules/Cursor.js';
import * as THREE from "three";


var myAppControl = new AppController();
new Cursor();

function animate() {
    myAppControl.draw();
    myAppControl.update();
    requestAnimationFrame(animate);
}
animate();
