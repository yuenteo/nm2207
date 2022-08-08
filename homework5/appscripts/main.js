/* Smile/ Frown with Raphael Graphics */

console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;

//------------------------------- SHAPES -----------//

var rect = paper.rect(0, 0, dimX, dimY);
rect.attr({
	"fill": "#fff5d0"
})

var mouth = paper.path("M 100,150 Q 200,200 300,150");

var eye1 = paper.ellipse(140,70,10,20);
var eye2 = paper.ellipse(260,70,10,20);
								
//------------------------------- TOGGLE BUTTON ---//

let buttonState = "smiling"

let myToggle = document.getElementById("myToggle");
let happyCat = document.getElementById("happyCat");

myToggle.addEventListener("click", function(ev){

	console.log("hehe u clik")

	if (buttonState === "smiling") {

		myToggle.value = "frowning";

		/*mouth.attr({
			"path": "M 100,150 Q 200,100 300,150"
		})*/

		drawMouth(200, 100, 1000);

		eye1.animate({
			"ry": .1
		}, 100, "bounce")

		eye2.animate({
			"ry": .1
		}, 100, "bounce")

		smallDot.animate({
		"cx": 200,
		"cy": 100
		}, 1000, "linear");

		buttonState = "frowning"

	} else {
		myToggle.value = "smiling";

		/*mouth.attr({
			"path": "M 100,150 Q 200,200 300,150"
		})*/

		drawMouth(200, 200, 1000);

		eye1.animate({
			"ry": 20
		}, 100, "bounce")

		eye2.animate({
			"ry": 20
		}, 100, "bounce")

		smallDot.animate({
		"cx": 200,
		"cy": 200
		}, 1000, "linear");

		buttonState = "smiling"
	}

})

//--------------------------- drawMouth ----------//

var drawMouth = function(bx, by, time){
	mouthPathString = `M ${100}, ${150} Q ${bx}, ${by}, ${300}, ${150}`;
	console.log("your mouth path string is " + mouthPathString);
	mouth.animate({
		"path": mouthPathString 
	}, time, "linear");
}

//--------------------------- small DOT . ----------//

let smallDot = paper.circle(200,200,5);

smallDot.attr({
	"fill": "black"
})
// animated in the TOGGLE BUTTON section

//------------------- make dot draggable ----------//

let mouseState = "up"

smallDot.node.addEventListener("mousedown", function(ev){
	console.log("it is down");
	mouseState = "down";
})

smallDot.node.addEventListener("mouseup", function(ev){
	console.log("it UP");
	mouseState = "up";
})

smallDot.node.addEventListener("mousemove", function(ev){
	if (mouseState === "down"){

		smallDot.attr({
			"cx": ev.offsetX,
			"cy": ev.offsetY
		})

		mouseState = "down"

		mouth.attr({
			"path": `M ${100}, ${150} Q ${smallDot.attr("cx")}, ${smallDot.attr("cy")}, ${300}, ${150}`
		})
	} 

	else {
		mouseState = "up"
	}
})

rect.node.addEventListener("mousemove", function(ev){
	if (mouseState === "down"){

		smallDot.attr({
			"cx": ev.offsetX,
			"cy": ev.offsetY
		})

		mouseState = "down"

		mouth.attr({
			"path": `M ${100}, ${150} Q ${smallDot.attr("cx")}, ${smallDot.attr("cy")}, ${300}, ${150}`
		})
	} 

	else {
		mouseState = "up"
	}
})

//---------------------- redraw mouth with dot's bezier point ----------//

console.log("cx of small dot is " + smallDot.attr("cx") + " and the cy is " + smallDot.attr("cx"));
// at mousemove section

