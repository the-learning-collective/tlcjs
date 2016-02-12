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
var scene = emptyScene(300, 405);
var belly = overlay(circle(70, "white"), circle(125, "orange"));
var rightPaw = placeImage(circle(25, "white"), belly, 175, 85);
var Rpaw1 = placeImage(circle(5, "pink"), rightPaw, 185, 95);
var Rpaw2 = placeImage(circle(5, "pink"), Rpaw1, 197, 90);
var Rpaw3 = placeImage(circle(5, "pink"), Rpaw2, 209, 95);
var Rpaw = placeImage(circle(9, "pink"), Rpaw3, 193, 107);
var leftPaw = placeImage(circle(25, "white"), Rpaw, 27, 85);
var Lpaw1 = placeImage(circle(5, "pink"), leftPaw, 45, 91);
var Lpaw2 = placeImage(circle(5, "pink"), Lpaw1, 32, 95);
var Lpaw3 = placeImage(circle(5, "pink"), Lpaw2, 57, 96);
var Lpaw = placeImage(circle(9, "pink"), Lpaw3, 40, 105);
var Rfoot = placeImage(circle(25, "orange"), Lpaw, 40, 200);
var Rfootsole = placeImage(circle(15, "white"), Rfoot, 50, 210);
var Lfoot = placeImage(circle(25, "orange"), Rfootsole, 158, 200);
var Lfootsole = placeImage(circle(15, "white"), Lfoot, 170, 210);
var bodyscene =placeImage(Lfootsole, scene, 0, 150);


draw(placeImage(head, bodyscene, 27, 30));

