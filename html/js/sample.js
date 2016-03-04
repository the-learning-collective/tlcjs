draw(circle(10, "black"));
draw(circle(30, "red"));
print("Hello world!");
print("Calculating (1 + 2 - 3): " + (1 + 2 - 3));

print("SMASH THE STATE");
draw(rectangle(125, 75, "black"));

var eye = overlay(circle(10, "black"), circle(30, "purple"));

draw(eye);

draw(overlay(eye, rectangle(75,50,"white")));

var eyes = overlay(overlay(rectangle(60,60,"green"), overlay(rectangle(70,60,"pink"), rectangle(160,50,"red"))), rectangle(170, 60, "pink"));

var mouth = overlay(rectangle(50, 120, "green"), rectangle(50,140, "red"));

draw(overlay(eyes, overlay(mouth, circle(100, "green"))));

function lookAround(n) {
  var xPos = Math.floor(Math.sin(n/20) * 15 + 15);
  var yPos = Math.floor(Math.cos(n/10) * 5 + 70);
  return placeImage(eyes, overlay(mouth, circle(100, "green")), xPos, yPos);
}

animate(lookAround);

var collage = placeImage(circle(10,"black"),circle(20,"white"), 0, 0);
draw(placeImage(collage, circle(30, "red"), 0, 0));

function sinWiggle(n) {
  var xPosition = Math.sin(n/20) * 90 + 90;
  return placeImage(circle(10, "black"), emptyScene(200, 30), xPosition, 5);
}

function cosWiggle(n) {
  var xPosition = Math.cos(n/20) * 90 + 90;
  return placeImage(circle(10, "black"), emptyScene(200, 30), xPosition, 5);
}

function tanWiggle(n) {
  var xPosition = Math.tan(n/20) * 90 + 90;
  return placeImage(circle(10, "black"), emptyScene(200, 30), xPosition, 5);
}


animate(sinWiggle);
animate(cosWiggle);
animate(tanWiggle);

draw(text('hi there', 20));
draw(overlay(text('hello world', 16), emptyScene(200,200)));

function grow(number) {
  // center a red circle that changes radius based on the number
  var red_circle = overlay(circle(number, "red"),
                           rectangle(198, 198, "white"));

  var label = text("Press a number key.", 16);
  var bg = placeImage(label,
                      emptyScene(200, 220),
                      // center the label horizontally
                      (200 - width(label)) / 2,
                      212)

  // offset the circle just 1 pixel (to show the border of the scene).
  return placeImage(red_circle, bg, 1, 1);
}

function inc1(n) {
    if (n < 100) {
        return n + 1;
    } else {
        return n;
    }
}

function startAgain (world, initialSize) {
  var num = parseInt(initialSize.slice(5), 10);  // eek
  if (num >= 0 && num < 10) {
    return (10 * num);
  } else {
    return world;
  }
}

bigBang(0, grow, inc1, startAgain);

bigBang(0, function(n) { return text(n.toString(), 16);}, function(n) { return n + 1; }, function(n, key) { return n - 10; });

shouldEqual(1+1, 2);

shouldEqual(1+2, 2);

shouldEqual(width(circle(20, "red")), 40);
shouldEqual(height(overlay(circle(20, "red"), emptyScene(200, 200))), 200);
shouldEqual(stringLength("hello world"), 11);
