// main.js

console.log(`yo`);

let paper = new Raphael(document.getElementById("mySVGCanvas"));
let pWidth = paper.width;
let pHeight = paper.height;

//----------------------------------create rect ----------------

let rect1 = paper.rect(0, 0, pWidth, pHeight);
rect1.attr({
	"fill": "black"
});

//-------------------------------- create circle ---------------

let disk = paper.circle(pWidth/2, pHeight/2, 20);

disk.attr({
	"fill": "#5ce600"
});

disk.xpos = pWidth/2;
disk.ypos = pHeight/2;

disk.xrate = 10;
disk.yrate = 10;

//-------------------------------- draw function ---------------

let x = 0

var draw = function(){

	var nd = paper.circle(pWidth/2, pHeight/2, 20)

	nd.attr({
		"fill": "white"
	})

	nd.xpos = pWidth/2;
	nd.ypos = pHeight/2;

	nd.xrate = 10;
	nd.yrate = 10;

	x++
	console.log("you have called me " + x + " time(s).")

	disk.xpos = disk.xpos + disk.xrate;
	disk.ypos = disk.ypos + disk.yrate;
	console.log(`the new xpos is ${disk.xpos}, and the new ypos is ${disk.ypos}`)

	nd.attr({
		"cx": disk.xpos,
		"cy": disk.ypos
	})

	nd.animate({
		"fill": "#e600cf"
	}, 1000, "linear", function(){
		nd.remove()
	})

	if (disk.ypos >= pHeight - 20){
		disk.yrate = -10;
	}

	if (disk.xpos >= pWidth - 20){
		disk.xrate = -10;
	}

	if (disk.ypos <= 20){
		disk.yrate = 10;
	}

	if (disk.xpos <= 20){
		disk.xrate = 10;
	}

}

let timer = setInterval(draw, 50);


// think: hmmm... change direction of ball once it is positioned at the edge of the div. use if statement.

