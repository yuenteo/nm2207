
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);
//---------------------------------------------------------------------

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "black"});

// A disk for us to play with
var disk = paper.circle(pWidth/2, pHeight/2, 20);
disk.attr({"fill": "green"});

// Add some properties to disk just to keep track of it's "state"
disk.xpos=pWidth/2;
disk.ypos=pHeight/2;
// Add properties to keep track of the rate the disk is moving
disk.xrate=5;
disk.yrate=5;

// our drawing routine, will use as a callback for the interval timer
var draw = function(){

    //console.log("disk pos is ["+disk.xpos + "," + disk.ypos + "]");

    // Update the position where we want our disk to be
    disk.xpos += disk.xrate;
    disk.ypos += disk.yrate;

    // Now actually move the disk using our 'state' variables
    disk.attr({'cx': disk.xpos, 'cy': disk.ypos});

    // keep the object on the paper
    if (disk.xpos > pWidth) {disk.xrate = -disk.xrate;}
    if (disk.ypos > pHeight) {disk.yrate = - disk.yrate};
    if (disk.xpos < 0) {disk.xrate = -disk.xrate;}
    if (disk.ypos < 0) (disk.yrate = - disk.yrate);
}

// Call draw() periodically
// We startthe animation last thing as the module loads
setInterval(draw, 20);

// -------------------------------------- randInt --------------------

var randInt = function(m, n){
    var range = n - m;
    var scale = Math.random() * range;
    return Math.floor(scale) + m;
}

// --------------------------------- distance function ----------------

var distance = function(x1, y1, x2, y2){
    let a = x2 - x1;
    let b = y2 - y1;
    return Math.sqrt(a*a + b*b);
};

// ---------------------------- track mouse state --------------------

let tr = paper.rect(0, 0, pWidth, pHeight);

tr.attr({
    "fill": "white",
    "fill-opacity": 0
});

var mouseState = {
    "pushed": "unpushed",
    "x": "x",
    "y": "y"
};

mouseState.pushed = "unpushed";

tr.node.addEventListener("mouseup", function(ev){
            mouseState.pushed = "unpushed";
            console.log("UP")
        })

tr.node.addEventListener("mousedown", function(ev){
    mouseState.pushed = "pushed";
    mouseState.x = ev.offsetX;
    mouseState.y = ev.offsetY;
    console.log(`the mouse state is ${mouseState.pushed}, and its coordinates are (${mouseState.x}, ${mouseState.y})`);
});

// -------------------------------------- create 50 ------------------

var balls = [];
var counter = 0;
var number = 50;

while (counter < number){
    balls[counter] = paper.circle(pWidth/2, pHeight/2, 20);

    balls[counter].hslString = `hsl(${randInt(0, 360)}, ${randInt(20, 100)}, ${randInt(40, 90)})`
    //console.log("the hsl string is " + balls[counter].hslString)
    balls[counter].attr({"fill": balls[counter].hslString})

    balls[counter].xpos = pWidth/2;
    balls[counter].ypos = pHeight/2;
    balls[counter].xrate = randInt(1,15);
    balls[counter].yrate = randInt(1,15);

    counter++;
}

var draw2 = function(){
    counter = 0;
    while (counter < number){
        balls[counter].xpos += balls[counter].xrate;
        balls[counter].ypos += balls[counter].yrate;

        balls[counter].attr({'cx': balls[counter].xpos, 'cy': balls[counter].ypos});

        if (balls[counter].xpos > pWidth) {balls[counter].xrate = - balls[counter].xrate;}
        if (balls[counter].ypos > pHeight) {balls[counter].yrate = - balls[counter].yrate};
        if (balls[counter].xpos < 0) {balls[counter].xrate = - balls[counter].xrate;}
        if (balls[counter].ypos < 0) {balls[counter].yrate = - balls[counter].yrate};

        if (mouseState.pushed === "pushed" && distance(balls[counter].xpos, balls[counter].ypos, mouseState.x, mouseState.y) <= 100){
            balls[counter].attr({"fill": "white"})
        } else {
            balls[counter].attr({"fill": balls[counter].hslString});
        };

        //console.log(distance(balls[1].xpos, balls[1].ypos, mouseState.x, mouseState.y))
        counter++;
    };
};

setInterval(draw2, 20);

