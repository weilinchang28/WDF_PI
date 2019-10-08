const regl = require('regl')()     // declaring a const value ... regl - which is calling the library regl

const points = [                   // Array in an array -- declaring three constant points for the triangle 
[0, 0.5, 0],
[0.5, -0.5, 0],
[-0.5, -0.5, 0]
]


const colors = [                   // declaring three sets of colors in an array 
[1, 0, 0],
[0, 1, 0],
[0, 0, 1]
]

var attributes = {                 // First var attributes - buffer of points and colors 
	position: regl.buffer(points), // creating a buffer for all the points - - - flat out those three vertex points above into on string of numbers 
	aColor: regl.buffer(colors),   // creating a buffer called: aColor 
	}
	
var vertexShader = `          	  // Second var vertexShader - - - 
								  // Top part - declaring attributes 

	precision mediump float;      // medium p means medium precision
	attribute vec3 position;      // vec3 = three vector < x, y, z > points 
	attribute vec3 aColor;        // vec3 = three vector < x, y, z > of colors (aColor - - - a = attribute abbriv.) 

	varying vec3 vColor;          // passing vColor through fragShader - - - fragShader doesn't take attributes 

	////////////////////////////////////////////////////////////////////////////////

	void main() {                 // void main() is just a syntax - - - the system only reacts to void main 
		gl_Position = vec4(position, 5.0);    // this is for 3d 4x4 matrix - - - leave the last arguments as 1.0 
		vColor = aColor;          // passing attribute vColor 
		}
		`
		
var fragShader = `
	precision mediump float;      // medium precision float 

	varying vec3 vColor;          // passing attribute vColor 

	////////////////////////////////////////////////////////////////////////////////

	void main(){
		gl_FragColor = vec4(vColor, 0.3);      // ** last vec is for transparency 
		}
		`
		
	console.log('attribute:', attributes)
		
const drawTriangle = regl(          // drawTriangle is from regl library - - - () returning attributes, frag, and vert 
		{
			attributes: attributes, // saying attributes is equivalent to attributes 
			frag: fragShader,       // frag is equivalant to fragShader
			vert: vertexShader,     // etc. 
			count: 3                // count 1, 2, 3 - - - if to change the order, change it from the top 
			}
			)
			
		
function clear () { 			    // writing a function: clear 
	regl.clear({    			    // calling the clear function from regl library 
	color: [0.1, 0.1, 0.1, 1]       // assigning baclground refresh color 
	})
}

function render (){                 // writing the function render - - - compiling all the functions that go into render 
	console.log('render')
	clear() 					    // calling the function clear
	drawTriangle() 				    // calling the function drawTriangle 
	
	window.requestAnimationFrame(render); // looping (three) steps above in proper framerate 
}

render()    				        // executing the function render 