var faceEar = placeImage(circle(30, "orange"), circle(100,"orange"), 0 , 0);
var face = placeImage(circle(30, "orange"), faceEar, 140, 0);
var LeftEye = placeImage(circle(15, "white"), face, 45, 55);
var WithEyes = placeImage(circle(15, "white"), LeftEye, 125, 55);
var LpinkEar = placeImage(circle(15, "pink"), WithEyes, 13, 10);
var RpinkEar = placeImage(circle(15, "pink"), LpinkEar, 160, 10);
var LEyeball = placeImage(circle(7, "black"), RpinkEar, 53, 63);
var REyeball = placeImage(circle(7, "black"), LEyeball, 133, 63);
var LCheek = placeImage(circle(17, "white"), REyeball, 68, 115);
var RCheek = placeImage(circle(17, "white"), LCheek, 103, 115);
var head = placeImage(circle(15, "pink"), RCheek, 87, 97);
var belly = overlay(circle(70, "yellow"), circle(125, "orange"));

draw(placeImage(head, belly, 40, 0));
