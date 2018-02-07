//////////////////////////////////////////////////////////////////////////////////
var container, scene, camera, renderer, controls, stats, object, starship;
var clock = new THREE.Clock();
var clock2 = new THREE.Clock();

var score = 0;
var moveSpeed = 1.5;
var speed = 30;

var BAT = new THREE.BoxGeometry( 10, 80, 10 );
var material = new THREE.MeshLambertMaterial({color:0x999966});
var mesh = new THREE.Mesh(BAT, material);
var BAT2 = new THREE.BoxGeometry( 100, 10, 10 );
var mesh2 = new THREE.Mesh(BAT2, material);

var aspect = window.innerWidth / window.innerHeight;

init();
animate();
/////////////////////////////////////////////////////////////////////////////////
// ---------------------------------- INIT ----------------------------------- //
function init(){
	// SCENE //
	scene = new THREE.Scene();
	// CAMERA //
	camera = new THREE.PerspectiveCamera( 75, aspect, 1, 5000 ); //Perspective
	camera.position.set(0, 20, 50);
	scene.add(camera);
	// RENDERER //
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	//------------------------- MESH ---//
	// STARSHIP //
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load( '../assets/models/SuperStarShip.mtl', function( materials ) {
		materials.preload();
		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.load( '../assets/models/SuperStarShip.obj', function ( object ) {
			starship = object;
			starship.position.set(0, -10, -30);
			starship.scale.set(0.02,0.02,0.02);
			scene.add( starship );
			camera.add( starship );
		});
	});
	// PLAN //
	const plan = new THREE.PlaneGeometry( 100, 100, 10, 10 );
	plan.rotateX(THREE.Math.degToRad(-90));
	const PlaneMaterial = new THREE.MeshLambertMaterial({color:0x333333});
	const PlaneMesh = new THREE.Mesh(plan, PlaneMaterial);
	scene.add(PlaneMesh);
	const Etoile = new THREE.PlaneGeometry( 100, 100, 10, 10 );
	const EtoileMaterial = new THREE.MeshLambertMaterial({color:0x00001a});
	const etoileMesh = new THREE.Mesh( Etoile, EtoileMaterial );
	etoileMesh.position.set(0, 50, -50);
	scene.add( etoileMesh );
	// BORD //
	for (let i = 50; i >= -50; i-=100) {
		const bord = new THREE.BoxGeometry(  1, 100, 100);
		const material = new THREE.MeshLambertMaterial({color:0x999966});
		const plat = new THREE.Mesh(bord, material);
		plat.position.set( i, 50, 0 );
		plat.rotateX(THREE.Math.degToRad(-90));
		// plat.rotateY(THREE.Math.degToRad(-90));
		scene.add(plat);
	}
	// LUNE //
	const lune = new THREE.CircleGeometry( 5, 20 );
	const SphereMaterial = new THREE.MeshBasicMaterial( {color: 0xe6ffff});
	const sphereMesh = new THREE.Mesh( lune, SphereMaterial );
	sphereMesh.position.set(30, 60, -30);
	scene.add( sphereMesh );
	// BAT START //
	mesh.position.set(-40+(Math.random()*80), 40, -50);
	scene.add(mesh);
	mesh2.position.set(0, Math.random()*100, -100);
	scene.add(mesh2);
	// LIGHT //
	const light = new THREE.PointLight(0xb3ffff, 4, 100);
	light.position.set(30, 60, -20);
	scene.add(light);
	const light2 = new THREE.PointLight(0xffffff, 0.3, 100);
	light2.position.set(20, 50, -10);
	scene.add(light2);
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
}
// -------------------------------- UPDATE ---------------------------------- //
function update() {
	// COLLISION //
	if (mesh.position.z >= 40) {
		if (mesh.position.x+10 >= camera.position.x && mesh.position.x-10 <= camera.position.x) {
			console.log("impact");
		}
	}
	if (mesh2.position.z >= 40) {
		if (mesh2.position.y+16 >= camera.position.y && mesh2.position.y <= camera.position.y) {
			console.log("impact 2");
		}
	}

	// MOVE BAT //
	if (mesh.position.z<= 50) {
    	mesh.position.z += clock.getDelta()*speed;
    }else{
    	scene.remove(mesh);
    	mesh.position.set(-40+(Math.random()*80), 40, -50);
    	scene.add(mesh);
    }
	if (mesh2.position.z<= 50) {
    	mesh2.position.z += clock2.getDelta()*speed;
    }else{
    	scene.remove(mesh2);
    	mesh2.position.set(0, Math.random()*100, -50);
    	scene.add(mesh2);
    }
    // SPEED //
    document.getElementById("speed").innerHTML = Math.round(speed);
    speed+= 0.01;
    if (speed >= 80) { moveSpeed = 2; }
    // SCORE //
	document.getElementById("score").innerHTML = score;
	score++;
}
// ---------------------------------- MOVE ------------------------------------- //
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 38 && camera.position.y<= 70) {  // UP
        camera.position.y += moveSpeed;
        starship.rotation.x = THREE.Math.degToRad(20);
    } else if (keyCode == 40 && camera.position.y>= 15) {  // DOWN
        camera.position.y -= moveSpeed;
        starship.rotation.x = THREE.Math.degToRad(-20);
    } else if (keyCode == 37 && camera.position.x>= -35) {  // LEFT
        camera.position.x -= moveSpeed;
        starship.rotation.z = THREE.Math.degToRad(20);
    } else if (keyCode == 39 && camera.position.x<= 35) {  // RIGHT
        camera.position.x += moveSpeed;
        starship.rotation.z = THREE.Math.degToRad(-20);
    }
}
// ---------------------------------- RENDER ------------------------------------- //
function animate() {
    requestAnimationFrame( animate );
	render();	
	update();		
}

function render() {
    renderer.render(scene, camera);  
}