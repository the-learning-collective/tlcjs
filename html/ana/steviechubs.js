//this is building stevies chubby face by placing several circles over each other
var faceEar = placeImage(circle(30, "orange"), circle(100,"orange"), 0 , 0);
var face = placeImage(circle(30, "orange"), faceEar, 140, 0);
var LeftEye = placeImage(circle(15, "white"), face, 45, 55);
var WithEyes = placeImage(circle(15, "white"), LeftEye, 125, 55);
var LpinkEar = placeImage(circle(15, "pink"), WithEyes, 13, 10);
var RpinkEar = placeImage(circle(15, "pink"), LpinkEar, 160, 10);
var LEyeball = placeImage(circle(7, "black"), RpinkEar, 53, 63);
var REyeball = placeImage(circle(7, "black"), LEyeball, 133, 63);
var belly = circle(125, "orange");
var scene = emptyScene(300, 300);
var chubbyhead = placeImage(REyeball, belly, 40, 0);
var chubbyscene = overlay(chubbyhead, scene);


//with animate, my input will always be time, and the output will always be an image
// time -> image
//we are going to try to have stevie give us a licky-kiss
var lick = function(time) {
	var remainder = (time % 40);
	if (remainder < 10) {
		var tongue = placeImage(circle(15, "pink"), chubbyscene, 151, remainder + 153);
	} else  {
		var tongue = placeImage(circle(15, "pink"), chubbyscene, 151, 153);			
	}
	var LCheek = placeImage(circle(17, "white"), tongue, 133, 142);
	var RCheek = placeImage(circle(17, "white"), LCheek, 165, 142);
	var head = placeImage(circle(15, "pink"), RCheek, 150, 125);
	return head
};

animate(lick);





