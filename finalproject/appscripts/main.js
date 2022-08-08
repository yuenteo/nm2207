
// grab the article element from our grid ----------
var centerDiv = document.getElementById("centerDiv");

// raphael things ----------
var paper = new Raphael(centerDiv)

// variables to store the height and width of the paper ----------

var pheight = paper.height;
var pwidth = paper.width;

// create our base rectangle "game field" on the paper + some attributes so it's not so boring ----------

var field = paper.rect(0, 0, pwidth, pheight);

field.attr({
	"stroke-width": 10,
	"stroke": "grey",
	"fill": "white"
})

// extra design stuff for the field so it looks nice idk ----------

var centerline = paper.path(`M ${pwidth/2}, 5 L ${pwidth/2}, ${pheight-5}`)

centerline.attr({
	"stroke-width": 3,
	"stroke": "grey",
	"opacity": .5
})

var centercircle = paper.circle(pwidth/2, pheight/2, 70);

centercircle.attr({
	"stroke-width": 3,
	"stroke": "grey",
	"opacity": .5
})

// define STUFF ----------

let fieldstroke = field.attr("stroke-width");
let paddleAllowance = 10;

// paddle properties ----------

let paddle1x = 10;
let paddle1y = 10;

let paddle2x = pwidth-40;
let paddle2y = 10;

let paddlewidth = 30;
let paddleheight = 200;

// create two paddles, one for player (left) and one for the pc (right) ----------

var paddle1 = paper.rect(paddle1x, paddle1y, paddlewidth, paddleheight);

paddle1.attr({
	"stroke-width": 2,
	"stroke": "tomato",
	"fill": "tomato"
})

var paddle2 = paper.rect(paddle2x, paddle2y, paddlewidth, paddleheight);

paddle2.attr({
	"stroke-width": 2,
	"stroke": "turquoise",
	"fill": "turquoise"
})

// create the ball ball ----------

var ball = paper.circle(pwidth/2, pheight/2, 20)

ball.attr({
	"stroke-width": 2,
	"stroke": "#ffa347",
	"fill": "#ffa347"
})

let radius = ball.attr("r")

// ---------- OK ACTUAL FUNCTIONS AND STUFF NOW ----------

// making the player's paddle moveable (only need mousemove; to move along Y AXIS ONLY) ----------

paddle1.node.addEventListener("mousemove", function(ev){
	paddle1.attr({"y": ev.clientY - paddleheight})
});

field.node.addEventListener("mousemove", function(ev){
	paddle1.attr({"y": ev.clientY - paddleheight})
});

// move pc paddle ----------

let paddle2time = 15; // can adjust this speed for difficulty idk

/*
var moveup = function(){
	paddle2.animate({
	"y": 0 + fieldstroke
	}, paddle2time, "linear", movedown)
}

var movedown = function(){
	paddle2.animate({
	"y": pheight - paddleheight - fieldstroke
	}, paddle2time, "linear", moveup)
}

movedown()
*/

// RNGESUS ----------

var rng = function(m, n){
	var range = n - m;
	var frand = Math.random() * range;
	return m + frand; // Math.floor() or nah...?
}

// ball properties ----------

ball.xpos = pwidth/2
ball.ypos = pheight/2
ball.xrate = -2
ball.yrate = -2 // "speed" can be controlled here or with setInterval. but here uh... it's already kind of fixed :-(

// start button ----------

let startbutton = document.getElementById("startbutton");
var startinterval;
var ghostinterval;

startbutton.addEventListener("click", function(ev){
	startinterval = setInterval(startgame, 5)
	ghostinterval = setInterval(startghosts, 5)
	console.log("clicked start")
});

var startgame = function(){
	ball.xpos += ball.xrate
	ball.ypos += ball.yrate
	ball.attr({"cx": ball.xpos, "cy": ball.ypos})

	// move PC paddle -----------
	// a smarter AI as opposed to the functions above that follows ball position; adjust timing of PC paddle above

	var movedown = function(){
		paddle2.animate({
		"y": ball.ypos
		}, paddle2time, "linear")
	}

	movedown()

	// bounce off top and bottom wall ----------

	if (ball.ypos < radius){
		ball.yrate = -ball.yrate
	};

	if (ball.ypos > pheight - radius) {
		ball.yrate = -ball.yrate
	};

	// bounce off paddles ----------

	if (ball.xpos < paddle1x + paddlewidth && ball.ypos > paddle1.attr("y") - paddleAllowance && ball.ypos < paddle1.attr("y") + paddleheight + paddleAllowance){
		ball.xrate = -ball.xrate
	};

	if (ball.xpos > paddle2x && ball.ypos > paddle2.attr("y") - paddleAllowance && ball.ypos < paddle2.attr("y") + paddleheight + paddleAllowance){
		ball.xrate = -ball.xrate
	}; 

	// scoring stuff here ----------
	victory()

	// endgame stuff here ----------
	if (point1 === winpoint){
		alert("YOU WIN! :-)")
		endgame()
		resetghosts()
	};

	if (point2 === winpoint){
		alert("PC WINS! :-(")
		endgame()
		resetghosts()
	};
};

// softreset ball function ----------

let softreset = function(){
	ball.xpos = pwidth/2
	ball.ypos = pheight/2
	ball.xrate = rng(-2, 2)
	ball.yrate = rng(-2, 2)
};

// awarding one point ---------- award one point, throw ball out randomly from a random point

let point1 = 0;
let point2 = 0;

let myFooter = document.getElementById("myFooter");

myFooter.innerHTML = `PLAYER: ${point1} VS PC: ${point2}`;

let victory = function(){
	if (ball.xpos > pwidth){
	point1 ++;
	myFooter.innerHTML = `PLAYER: ${point1} VS PC: ${point2}`;
	softreset()
	};

	if (ball.xpos < 0){
	point2 ++;
	myFooter.innerHTML = `PLAYER: ${point1} VS PC: ${point2}`;
	softreset()
	};
};

// endgame function ----------

let winpoint = 3;

let endgame = function(){
	console.log("endgame, point is currently " + point2)
	clearInterval(startinterval);
	point1 = 0;
	point2 = 0;
	myFooter.innerHTML = `PLAYER: ${point1} VS PC: ${point2}`;
	ball.attr({"cx": ball.xpos, "cy": ball.ypos});
};

// ---------- DIFFICULTY LEVEL OPTIONS ----------
// ghost balls creation to confuse you ----------

let ghosts = [];
let counter = 0;
let ghostcount = 3;

while (counter < ghostcount){
	console.log("counter is counting " + counter)
	ghosts[counter] = paper.circle(pwidth/2, pheight/2, 20)

	ghosts[counter].attr({
		"stroke-width": 2,
		"stroke": "#ffa347",
		"fill": "#ffa347"
	})

	ghosts[counter].xpos = pwidth/2;
	ghosts[counter].ypos = pheight/2;
	ghosts[counter].xrate = rng(-2, 2);
	ghosts[counter].yrate = rng(-2, 2);
	console.log("reset")
	counter++;
}

var startghosts = function(){

	counter = 0;

	while (counter < ghostcount){
		ghosts[counter].xpos += ghosts[counter].xrate
		ghosts[counter].ypos += ghosts[counter].yrate
		ghosts[counter].attr({"cx": ghosts[counter].xpos, "cy": ghosts[counter].ypos})

        if (ghosts[counter].xpos > pwidth) {ghosts[counter].xrate = - ghosts[counter].xrate;}
        if (ghosts[counter].ypos > pheight) {ghosts[counter].yrate = - ghosts[counter].yrate};
        if (ghosts[counter].xpos < 0) {ghosts[counter].xrate = - ghosts[counter].xrate;}
        if (ghosts[counter].ypos < 0) {ghosts[counter].yrate = - ghosts[counter].yrate};

		counter ++;
	};
};

// reset ghost balls also ----------

let resetghosts = function(){
	counter = 0;
	while (counter < ghostcount){
		clearInterval(ghostinterval);
		ghosts[counter].attr({"cx": pwidth/2, "cy": pheight/2});
		counter++;
	}
};

// off ghosts option ----------

let offghosts = document.getElementById("offghosts");

offghosts.addEventListener("change", function(){
	counter = 0;
	while (counter < ghostcount){
		ghosts[counter].remove()
		counter++;
	};
});

let onghosts = document.getElementById("onghosts")

onghosts.addEventListener("change", function(){
	counter = 0;
	while (counter < ghostcount){
		console.log("counter is counting " + counter)
		ghosts[counter] = paper.circle(pwidth/2, pheight/2, 20)

		ghosts[counter].attr({
			"stroke-width": 2,
			"stroke": "#ffa347",
			"fill": "#ffa347"
		})

		ghosts[counter].xpos = pwidth/2;
		ghosts[counter].ypos = pheight/2;
		ghosts[counter].xrate = rng(-2, 2);
		ghosts[counter].yrate = rng(-2, 2);

		counter++;
	};
});

