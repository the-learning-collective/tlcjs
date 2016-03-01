var background = rectangle(400, 400, "orange");
var body = circle(140, "white");
var scene = placeImage(background, emptyScene(401, 401), 0, 0);
var head = circle(90, "white")
var eye = circle(10, "green");
var leftEar = circle(20, "pink");
var rightEar = circle(20, "pink");
var nose = circle(13, "pink");
var nose = circle(15, "pink");
var spot1 = circle(25, "black");
var spot2 = circle(25, "black");
var spot3 = circle(25, "black");
var body1 = (overlay(body, scene));
var head1 = (placeImage(head, body1, 225, 25));
var eye1 = (placeImage(eye, head1, 287, 58));
var ear1 = (placeImage(leftEar, eye1, 270, 5));
var ear2 = (placeImage(rightEar, ear1, 330, 5));
var nose1 = (placeImage(nose, ear2, 310, 92));
var spot11 = (placeImage(spot1, nose1, 102, 132));
var spot22 = (placeImage(spot2, spot11, 155, 100));

print(placeImage(spot3, spot22, 210, 130));
