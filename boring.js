console.log(data.length);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var material = new THREE.MeshStandardMaterial( { color : 0x00cc00 } );

//create a triangular geometry
var geometry = new THREE.Geometry();

data.map(e => {
  geometry.vertices.push(
    new THREE.Vector3( e.x, e.y, e.z )
  );
})

console.log(geometry)

var normal = new THREE.Vector3( 0, 1, 0 ); //optional
var color = new THREE.Color( 0xffaa00 ); //optional
var materialIndex = 0; //optional
geometry.faces.push( new THREE.Face3( 0, 1, 2, normal, color, materialIndex ));

var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );

var mesh = new THREE.Mesh( geometry, material );
mesh.drawMode = THREE.TrianglesDrawMode; //default

scene.add( mesh );

camera.position.z = 5;

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
}
animate();


// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;