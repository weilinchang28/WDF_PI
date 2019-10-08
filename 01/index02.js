const regl = require('regl')()     

const glm = require('gl-matrix')
var mat4 = glm.mat4
var projectionMatrix = mat4.create()
var fov = 45 * Math.PI/180;
var aspect = window.innerWidth / window.innerHeight
// console.log('fov, aspect', fov, aspect)

mat4.perspective(projectionMatrix, fov, aspect, 0.01, 1000.0)


var viewMatrix = mat4.create();
mat4.lookAt(viewMatrix, [0, 0, 10], [0, 0, 0], [0, 1, 0])

//////////////////////////////////////////
var mouseX = 0
var mouseY = 0

window.addEventListener('mousemove', function (e){
	// console.log('Mouse move', e.clientX, e.clientY)

	var percentX = e.clientX / window.innerWidth; // 0~1
	var percentY = e.clientY / window.innerHeight; 

	percentX = percentX * 2 - 1 // -1 ~ 1
	percentY = percentY * 2 - 1 // -1 ~ 1 

	var moveRange = 5.0 
	mouseX = percentX * moveRange
	mouseY = (percentY * -1) * moveRange

	// console.log(percentX, percentY)
})

//////////////////////////////////////////

var currTime = 0;
var r = 0.5;

var positions = [

];


 var colors = [

 ]

let vertexCount = 0

for(var i=0; i<10; i++) {
	var z = -i * 0.3;
 
	positions.push([-r, r, z]);
	positions.push([r, r, z]);
	positions.push([r, -r, z]);

	positions.push([r, -r, z]);
	positions.push([-r, -r, z]);
	positions.push([-r, r, z]);


	colors.push([1, 0, 0]);
	colors.push([0, 0.6, 0]);
	colors.push([0, 0, 0.8]);

	colors.push([0, 0, 0.8]);
	colors.push([0.3, 0.8, 0.5]);
	colors.push([1, 0, 0]);
	vertexCount += 6;

	// console.log(i, positions.length)
}


const drawTriangle = regl({
	frag:`
	precision mediump float;
	varying vec3 vColor;
	
	void main(){
		gl_FragColor = vec4(vColor, 0.7);
	}`,
	
	vert:`
	precision mediump float;
	attribute vec3 aPosition;
	attribute vec3 color;

	uniform float uTime;
	uniform mat4 uProjectionMatrix;
	uniform mat4 uViewMatrix;
	
	uniform vec3 uTranslate;

	varying vec3 vColor;

	 
	
	void main(){
		vec3 pos = aPosition + uTranslate;
		// vec3 pos = aPosition; 	   	    	// creating holder for position
		float movingRange = 0.01;        	// pos.x - only adding uTime to X 
		// float scale = sin(uTime * 0.8);
		// scale = scale * 0.5 + 0.5;
		
		// pos.xy *= scale;

		pos.x += sin(uTime) * movingRange; 	
		pos.y += cos(uTime) * movingRange;	
		//pos.z += cos(uTime) * movingRange;
		
		

		gl_Position = uProjectionMatrix * uViewMatrix * vec4(pos, 1.0);
		vColor = color;

		
	}`,

	attributes: {
		aPosition: regl.buffer(positions),
		color: regl.buffer(colors)
	},

	uniforms: {
		uTime: regl.prop('time'),
		uProjectionMatrix: projectionMatrix,
		uViewMatrix: regl.prop('view'),
		uTranslate: regl.prop('translate')
	},

	count: vertexCount
})

			
		
function clear () { 			    // writing a function: clear 

	regl.clear({    			    // calling the clear function from regl library 
	color: [0.1, 0.3, 0.2, 0.5]       // assigning baclground refresh color 
	})
}

function render (){                 // writing the function render - - - compiling all the functions that go into render 
	var cameraR = 15.0 
	currTime += 0.02                // time increase every frame 
	const cameraX = Math.sin(currTime) * cameraR
	const cameraZ = Math.cos(currTime) * cameraR
	const cameraY = Math.cos(currTime) * cameraR
	mat4.lookAt(viewMatrix, [cameraX, mouseY, cameraZ], [0, 0, 0], [0, 1, 0])
	// mat4.lookAt(viewMatrix, [2, 2, 5], [0, 0, 0], [0, 1, 0])



	clear() 					    // calling the function clear
	
for (var i = 0; i < 3; i++){
	for (var w = 0; w < 5; w++){
		var obj = {
			time: currTime,
			view: viewMatrix,
			translate: [-2.2 + (w * 1.1), -1.1 + (i * 1.1), 0]
		}

		drawTriangle(obj) 
	}

					    // calling the function drawTriangle 
	// assign the current to time for setting up the uniform

}

	
	
	window.requestAnimationFrame(render); // looping (three) steps above in proper framerate 
}

render()    				        // executing the function render 


