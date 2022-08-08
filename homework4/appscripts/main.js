// main.js

console.log(`yo`);

/* assign3: font family for article in JavaScript */
var art=document.getElementById("articleid").style.fontFamily = "cursive,Charcoal,sans-serif";

/* assign3: center header text using javascript */
var art=document.getElementById("headerid").style.textAlign = "center";

// --------------------------------------------------------------------------

var hslString = function (hue, saturation, lightness){
	var hslColor = "hsl(" + hue + ", " + saturation + ", " + lightness + ")";
	console.log("Your hsl color string is " + hslColor);
	return hslColor;
}

// test by calling the function above:
hslString(20,"40%","70%");

// --------------------------------------------------------------------------

var sliderH = document.getElementById("sliderH");
var sliderS = document.getElementById("sliderS");
var sliderL = document.getElementById("sliderL");
var sliderO = document.getElementById("sliderO");

[sliderH, sliderS, sliderL].forEach(function(element){
	element.addEventListener("change", function(ev){
	console.log("hey the slider moved");
	let hValue = sliderH.value;
	let sValue = sliderS.value;
	let lValue = sliderL.value;
	var aside = document.getElementById("aside");
	aside.style.backgroundColor = hslString(hValue, sValue + "%", lValue + "%");
	})
});


sliderO.addEventListener("mousedown", function(ev){
	console.log("you pressed DOWN");
	aside.style.opacity = 1;
})

sliderO.addEventListener("mouseup", function(ev){
	let oValue = sliderO.value;
	aside.style.opacity = oValue;
})




