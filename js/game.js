/////////////////////////////////////////////////////////////////////////////////
// ---------------------------------- INIT ----------------------------------- //
function init(){
	// SCENE //
	scene = new THREE.Scene();
	// CAMERA //
	camera = new THREE.PerspectiveCamera( 75, aspect, 1, 5000 ); //Perspective
	camera.position.set(0, 20, 60);
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
	var plan = new THREE.PlaneGeometry( 100, 100, 10, 10 );
	plan.rotateX(THREE.Math.degToRad(-90));
	var PlaneMaterial = new THREE.MeshLambertMaterial({color:0x1a1a1a});
	var PlaneMesh = new THREE.Mesh(plan, PlaneMaterial);
	scene.add(PlaneMesh);
	var Etoile = new THREE.PlaneGeometry( 100, 100, 10, 10 );
	var etoileMesh = new THREE.Mesh( Etoile, cityMaterial );
	etoileMesh.position.set(0, 50, -50);
	scene.add( etoileMesh );
	// BORD //
	for (let i = 50; i >= -50; i-=100) {
		var bord = new THREE.BoxGeometry(  1, 100, 100);
		var plat = new THREE.Mesh(bord, wallMaterial);
		plat.position.set( i, 50, 0 );
		plat.rotateX(THREE.Math.degToRad(-90));
		// plat.rotateY(THREE.Math.degToRad(-90));
		scene.add(plat);
	}
	// LUNE //
	var lune = new THREE.CircleGeometry( 5, 20 );
	var SphereMaterial = new THREE.MeshBasicMaterial( {color: 0xe6ffff});
	var sphereMesh = new THREE.Mesh( lune, SphereMaterial );
	sphereMesh.position.set(30, 60, -50);
	scene.add( sphereMesh );
	// LIGHT //
	var light = new THREE.PointLight(0xb3ffff, 4, 100);
	light.position.set(30, 60, -20);
	scene.add(light);
	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
}
// -------------------------------- UPDATE ---------------------------------- //
function update() {
	// COLLISION //
	if (mesh.position.z >= 40 ) {
		if (mesh.position.x+10 >= camera.position.x && mesh.position.x-10 <= camera.position.x) {
			collision();
		}
	}
	if (mesh2.position.z >= 40) {
		if (mesh2.position.y+16 >= camera.position.y && mesh2.position.y <= camera.position.y) {
			collision();
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
    if (speed >= 60) { moveSpeed = 2.5; }
    if (speed >= 100) { moveSpeed = 5; }
    // SCORE //
	document.getElementById("score").innerHTML = score;
	score++;
}
// ----------------------------------- MOVE -------------------------------------- //
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
// ---------------------------------- COLLISION ---------------------------------- //
function collision() {
	MAIN++;
	document.getElementById('hub').style.cssText = 'visibility: visible;';
	document.getElementById("mainScore").innerHTML = score;
	document.getElementById("mainSpeed").innerHTML = Math.round(speed);
}
// ---------------------------------- RENDER ------------------------------------- //
function animate() {
    requestAnimationFrame( animate );
	render();
	if (MAIN == 0) {	
		update();
	}		
}
function render() {
    renderer.render(scene, camera);  
}