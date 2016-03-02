var background = rectangle(420, 420, "orange");
var scene = placeImage(background, emptyScene(420, 420), 0, 0);
var body = circle(140, "white");
var leftOutterear = circle(26, "white");
var rightOutterear = circle(26, "white");
var leftEar = circle(20, "pink");
var rightEar = circle(20, "pink");
var head = circle(90, "white")
var eye = circle(10, "green");
var nose = circle(13, "pink");
var nose = circle(15, "pink");
var spot1 = circle(25, "black");
var spot2 = circle(25, "black");
var spot3 = circle(25, "black");

var body1 = (overlay(body, scene));
var outterEar1 = (placeImage(leftOutterear, body1, 265, 3));
var outterEar2 = (placeImage(rightOutterear, outterEar1, 324, 3));
var ear1 = (placeImage(leftEar, outterEar2, 270,5));
var ear2 = (placeImage(rightEar, ear1, 330, 5));
var head1 = (placeImage(head, ear2, 225, 25));
var eye1 = (placeImage(eye, head1, 287, 58));
var nose1 = (placeImage(nose, eye1, 310, 92));
var spot11 = (placeImage(spot1, nose1, 102, 132));
var spot22 = (placeImage(spot2, spot11, 155, 100));

print(placeImage(spot3, spot22, 210, 130));
