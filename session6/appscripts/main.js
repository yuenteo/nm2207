
console.log("yo, I'm alive!");

var paper = new Raphael(document.getElementById("mySVGCanvas"));
// Find get paper dimensions
var dimX = paper.width;
var dimY = paper.height;


//------------------------------------------
// Careate a rectangle with the same dimensions as the canvas and save it in the variable bg
var bg = paper.rect(0, 0, dimX, dimY);

// Set some background rectangle attributes
bg.attr({
"stroke": "#444444",
"stroke-width": 20,
"fill" : "#CCAAFF"        // must be filled to get mouse clicks        
})

// add mousedown listener that prints to console (but only if the rectangle was filled)
bg.node.addEventListener("mousedown", function(ev){
console.log("mouse down on paper")
});

//------------------------------------------

mybigheart="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4z"

// create myHeart1 with attributes
var myHeart1 = paper.path(mybigheart)
myHeart1.attr({
	"stroke-width": 2,
	"fill": "#7C5295"
})

//============================================================
// create some kind of transfomation
myHeart1.transform("S .7 T 40, -40");

//============================================================
// animate myHeart1 in stages

var foo = function(s, r){

	console.log("this is working fine");
	myHeart1.animate({
		transform: "S 0.2 R 100"
	}, 1000, "linear", bar);
}

var bar = function(s,r){
	console.log("this also works");
	myHeart1.animate({
		transform: "S 1.5 R -90"
	}, 1000, "linear", foo);
}

foo()

//============================================================
// create other hearts starting from transforming the path for the first one
// give it some attributes

let transformString = "S 2, 2 T 100, 100";

var heart2 = Raphael.transformPath(mybigheart, transformString);
var myHeart2 = paper.path(heart2)
myHeart2.attr({
	"stroke-width": 2,
	"fill": "#ffd1dc",
	"opacity": .7
})
myHeart2.transform("S .1 T 30, -100")

var heart3 = Raphael.transformPath(mybigheart, transformString);
var myHeart3 = paper.path(heart3)
myHeart3.attr({
	"stroke-width": 2,
	"fill": "#77dd77",
})
myHeart3.transform("S .1 T 30, -200")


//============================================================
// animate them, too 

var foo2 = function(s, r){
	myHeart2.animate({
	transform: "S 0.3 R 10"
	}, 1000, "bounce", bar2);
}

var bar2 = function(s,r){
	myHeart2.animate({
		transform: "S 1.5 R -50"
	}, 1000, "linear", foo2);
}

foo2()

var foo3 = function(s, r){
	myHeart3.animate({
	transform: "S 0.1 R 10"
	}, 1000, "bounce", bar3);
}

var bar3 = function(s,r){
	myHeart3.animate({
		transform: "S 0.2 R -50"
	}, 1000, "linear", foo3);
}

foo3()

//============================================================
// use the mouse location to control the animation through the transformation strings 

