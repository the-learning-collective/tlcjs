//a function to call up Stevie's face, including his ear and earlobes

var Face = function() {
	var LEarlobe = placeImage(circle(30, "orange"), circle(100,"orange"), 0 , 0);
	var REarlobe = placeImage(circle(30, "orange"), LEarlobe, 140, 0);
	var LEar = placeImage(circle(15, "pink"), REarlobe, 13, 10);
	var REar = placeImage(circle(15, "pink"), LEar, 160, 10);
	return REar;
};

//a function for my eyes that shifts horizontally

var Eye = function(Img, XPos) {
	var Eyeball = placeImage(circle(13, "white"), Img, XPos, 55);
	var Iris = placeImage(circle(10, "blue"), Eyeball, XPos + 3, 57);
	var Pupil = placeImage(circle(5, "black"), Iris, XPos + 7, 62); 
	return Pupil;
};

//a function for my mouth that takes a base image as an input

var Mouth = function(Img) {
	var LCheek = placeImage(circle(17, "white"), Img, 68, 115);
	var RCheek = placeImage(circle(17, "white"), LCheek, 103, 115);
	//var LWhisker1 = placeImage(line(110, 120, 90, 100), RCheek, 110, 120);
	var Nose = placeImage(circle(15, "pink"), RCheek, 87, 97);
	return Nose;
};

//a function to put my face, eyes, and mouth together into a head

var Head = function() {
	var LEye = Eye(Face(), 50);
	var REye = Eye(LEye, 125);
	var Head = Mouth(REye);
	return Head;
};

//a function to create my belly and feet

var Belly = function () {
	var Belly = overlay(circle(70, "white"), circle(125, "orange"));
	var RFoot = placeImage(circle(25, "orange"), Belly, 40, 200);
	var RFootSole = placeImage(circle(15, "white"), RFoot, 50, 210);
	var LFoot = placeImage(circle(25, "orange"), RFootSole, 158, 200);
	var LFootSole = placeImage(circle(15, "white"), LFoot, 170, 210);
	return LFootSole;
};

//a function for my paws that shifts horizontally

var Paw = function (Img, Xpos) {
	var Leg = placeImage(circle(25, "white"), Img, Xpos, 85);
	var Paw1 = placeImage(circle(5, "pink"), Leg, Xpos + 18, 91);
	var Paw2 = placeImage(circle(5, "pink"), Paw1, Xpos + 8, 95);
	var Paw3 = placeImage(circle(5, "pink"), Paw2, Xpos + 30, 96);
	var Paw = placeImage(circle(9, "pink"), Paw3, Xpos + 13, 105);
	return Paw
};

//a function to draw my body with paws 

var Body = function() {
	var LPaw = Paw(Belly(), 27);
	var RPaw = Paw(LPaw, 170);
	var Scene = emptyScene(260, 400);
	var Body = placeImage(RPaw, Scene, 0, 150);
	return Body;
};

// this variable puts head and body together for a whole fat kitty!

var Stevie = placeImage(Head(), Body(), 27, 30);

//this function defines my eyelids

var Eyelids = function(image, XPos1, XPos2, YPos) {
	var LEyelid = placeImage(circle(20, "orange"), image, XPos1, YPos);
	var REyelid = placeImage(circle(20, "orange"), LEyelid, XPos2, YPos);
	return REyelid
};

//this is a reusable blink function using mod 
	
// var Wink = function(XPos1, XPos2) {
// 	return function(time) {
// 		var remainder = (time % 100); 
// 		if (remainder < 30) {
// 			var result = Eyelids(Stevie, XPos1, XPos2, remainder + 40);
// 		} else if (remainder < 55) {
// 			var result = Eyelids(Stevie, XPos1, XPos2, 75);
// 		} else {
// 			var result = Eyelids(Stevie, XPos1, XPos2, 40);
// 		}
// 		return result; 
// 	};	
// }

//these variables define where my eyelids are positioned horizontally
var XPos1 = 70;
var XPos2 = 145;

//this function is a blink function using mod

//var Blink = function(time) {
	//var remainder = (time % 100); 
	//if (remainder < 30) {
		//var result = Eyelids(Stevie, XPos1, XPos2, remainder + 40);
// 	} else if (remainder < 55) {
// 		var result = Eyelids(Stevie, XPos1, XPos2, 75);
// 	} else {
// 		var result = Eyelids(Stevie, XPos1, XPos2, 40);
// 	}
// 	return result; 
// }

//this is a blink function using math.sin

var Blink = function(time) { 
		var result = Eyelids(Stevie, XPos1, XPos2, 80 + (40 * -Math.abs(Math.sin(time/50))));
	return result; 
}

animate(Blink);
