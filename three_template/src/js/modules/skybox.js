skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
skybox = new THREE.Mesh(skyboxGeo);
scene.add(skybox);


const ft = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_ft.jpg");
const bk = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_bk.jpg");
const up = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_up.jpg");
const dn = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_dn.jpg");
const rt = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_rt.jpg");
const lf = new THREE.TextureLoader().load("../../assets/img/skybox/purplenebula_lf.jpg");



function createPathStrings(filename) {
const basePath = "./static/skybox/";
const baseFilename = basePath + filename;
const fileType = ".png";
const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
const pathStings = sides.map(side => {
return baseFilename + "_" + side + fileType;
});

return pathStings;
}






var skyboxImage = "purplenebula";
function createMaterialArray(filename) {
const skyboxImagepaths = createPathStrings(filename);
const materialArray = skyboxImagepaths.map(image => {
let texture = new THREE.TextureLoader().load(image);

return texture;
});
return materialArray;
}


function createMaterialArray(filename) {
const skyboxImagepaths = createPathStrings(filename);
const materialArray = skyboxImagepaths.map(image => {
let texture = new THREE.TextureLoader().load(image);

return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }); // <---
});
return materialArray;
}

const skyboxImage = 'purplenebula';

function init() {
const materialArray = createMaterialArray(skyboxImage);
skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

animate();
}