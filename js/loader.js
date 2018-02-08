//////////////////////////////////////////////////////////////////////////////////
var container, scene, camera, renderer, controls, stats, object, starship, particle;
var clock = new THREE.Clock();
var clock2 = new THREE.Clock();

var MAIN = 1;
var score = 0;
var moveSpeed = 1.5;
var speed = 30;

var aspect = window.innerWidth / window.innerHeight;
// TEXTURE
var textureCity = THREE.ImageUtils.loadTexture('../assets/img/city.jpeg');
var cityMaterial = new THREE.MeshBasicMaterial({map: textureCity});
var textureWall = THREE.ImageUtils.loadTexture('../assets/img/wall.jpeg');
var wallMaterial = new THREE.MeshBasicMaterial({map: textureWall});
var textureCyl = THREE.ImageUtils.loadTexture('../assets/img/cyl.png');
var cylMaterial = new THREE.MeshBasicMaterial({map: textureCyl});
// BAT
var BAT = new THREE.BoxGeometry( 10, 80, 10 );
var mesh = new THREE.Mesh(BAT, cylMaterial);
var BAT2 = new THREE.BoxGeometry( 100, 10, 10 );
var mesh2 = new THREE.Mesh(BAT2, cylMaterial);
//--------
init();
animate();

//----------------------------------START----------------------------//
function start() {
	console.log("start");
	score = 0;
	speed = 30;

	// BAT START //
	mesh.position.set(-40+(Math.random()*80), 40, -150);
	mesh2.position.set(0, Math.random()*100, -200);
	scene.add(mesh);	
	scene.add(mesh2);
	
	MAIN = 0;
	document.getElementById('hub').style.cssText = 'visibility: hidden;';
	
}