
console.log("Yo, I am alive!");

// Grab the div where we will put our Raphael paper
var centerDiv = document.getElementById("centerDiv");

// Create the Raphael paper that we will use for drawing and creating graphical objects
var paper = new Raphael(centerDiv);

// put the width and heigth of the canvas into variables for our own convenience
var pWidth = paper.width;
var pHeight = paper.height;
console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

// Just create a nice black background
var bgRect = paper.rect(0,0,pWidth, pHeight);
bgRect.attr({"fill": "black"});

// A dot for us to play with
var dot = paper.circle(pWidth/2, pHeight/2, 20);
dot.attr({"fill": "green"});

//-------------------
// load time
//-------------------
var loadTime=Date.now()
console.log("load time is " + loadTime/1000);

//HTML5 audio elements
var myFooter=document.getElementById("myFooter");

//HTML5 audio element
var aBackgroundSnd = new Audio ("resources/342566__inspectorj__sewer-soundscape-a.wav");


var aBumpSnd = new Audio ("resources/67408__noisecollector__vibrabonk.wav");



//-------------------




// Add some properties to dot just to keep track of it's "state"
dot.xpos=pWidth/2;
dot.ypos=pHeight/2;
dot.xrate=1;
dot.yrate=1;

// our drawing routine, will use as a callback for the interval timer
var draw = function(){
    myFooter.innerHTML="Time: " + (Date.now()-loadTime)/1000

    // Update the position where we want our dot to be
    dot.xpos += dot.xrate;
    dot.ypos += dot.yrate;

    // Now actually move the dot using our 'state' variables
    dot.attr({'cx': dot.xpos, 'cy': dot.ypos});

    //---------------------------------------------
    // Set sound parameters based on the position of the moving dots



    // When dots hit the wall, reverse direction 
    if (dot.xpos > pWidth) {
        dot.xrate = -dot.xrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    }
    if (dot.ypos > pHeight) {
        dot.yrate = - dot.yrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    };
    if (dot.xpos < 0) {
        dot.xrate = -dot.xrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    }
    if (dot.ypos < 0) {
        dot.yrate = - dot.yrate;
        aBumpSnd.pause();
        aBumpSnd.currentTime=0;
        aBumpSnd.play();
    };
}

// call draw() periodically
// Start the timer with a button (instead of as program loads) so that sound models have time to load before we try play or set their parameters in the draw() function.
var toggle="off";
var timer;
document.getElementById("startButtonID").addEventListener('click', function(ev){
    if (toggle=="off"){
        timer=setInterval(draw, 20);
        toggle="on";

        aBackgroundSnd.play();
        aBackgroundSnd.volume=.2;
        aBackgroundSnd.loop=true;

    } else {
        clearInterval(timer);
        toggle="off"
        aBackgroundSnd.pause();
    }
})

// 1. create the necessary variables -- start button, counter for clicks

var startButton = document.getElementById("startButtonID");
let counter;
let timenow;
const timelimit = 5;
var timer2;

// 2. function that runs when game starts (start timer - duration needed, start counter)

let startGame = function(){

    console.log("game START")
    timenow = Date.now();
    console.log("the time now is " + timenow);
    counter = 0;
    timer2 = setInterval(tracktime, 2000);
}

// 3. when time limit is up

let tracktime = function(){
    let duration = (Date.now() - timenow)/1000;
    console.log("the duration is " + duration)

    if (duration >= timelimit){
        endGame()
    };
} 

// 4. listen for clicks on ball

dot.node.addEventListener("click", function(ev){
    counter++;
    console.log("no. of clicks is " + counter) //rmb to start game for counter to start working
});

// 5. reset function

let reset = function(){
    timenow = Date.now();
    console.log("the new time is " + timenow)
    draw();
    counter = 0;
}

// 6. what happens when startButton is clicked?

let buttonState = "toggle";

startButton.addEventListener("click", function(ev){
    if (buttonState === "toggle"){
        startButtonID.value = "RESET";
        startGame();
        buttonState = "reset";
    } else {
        startButtonID.value = "TOGGLE"
        reset();
        buttonState = "toggle"};
})

// 7. when the game ends (stop draw function, alert box pops out, reset game)

let endGame = function(){
    console.log("game OVER");
    confirm("you clicked the ball " + counter + " times! :-)");
    dot.xpos = pWidth/2;
    dot.ypos = pHeight/2;
    dot.attr({'cx': dot.xpos, 'cy': dot.ypos});
    clearInterval(timer);
    clearInterval(timer2);
};

// 8 . ADJUSTING DIFFICULTY

let speed1 = document.getElementById("speed1button");
speed1.addEventListener("change", function(ev){
    console.log("speed1 is selected")
    dot.xrate=1;
    dot.yrate=1;
});

let speed2 = document.getElementById("speed2button");
speed2.addEventListener("change", function(ev){
    console.log("speed2 is selected")
    dot.xrate=2;
    dot.yrate=2;
});



