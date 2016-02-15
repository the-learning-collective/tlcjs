console.log("TLC is starting up...");

/* OUTPUT AND INFRASTRUCTURE */

// NOTE(dbp 2016-02-15): These two functions are for tests _within_
// tlc.js. We should probably replace these with mocha or something
// better, as we don't need to have them be super simple.
function test(desc, expected, given) {
  function err(r) {
    console.error("TEST FAILED: " + desc + ". Got " + r + ", but expected " + expected);
  }
  try {
    var res = given();
    if (expected !== res) {
      err(res);
    }
  } catch (e) {
    err("exception");
  }
}

function testRaises(desc, given) {
  try {
    console.error("TEST FAILED: " + desc + ". Expected exception, but got value: " + given());
  } catch (e) {}
}

// NOTE(dbp 2016-02-15): On the other hand, _this_ function is for use
// by TLC.js students.
var testResults = { run: 0, passed: 0, failures: [] };
function updateTestUi() {
  var output = document.getElementById("tlc-test-results");
  if (output === null) {
    var output = document.createElement("pre");
    output.id = "tlc-test-results";
    _addOutput(output);
  }

  output.textContent = "Tests: " + String(testResults.passed) + "/" + String(testResults.run) + " passed.";
  if (testResults.failures.length !== 0) {
    output.textContent += "\n\nFailures:\n";
  }
  testResults.failures.forEach(function (f) {
    output.textContent += "  " + f + "\n";
  });
}
function shouldEqual(given, expected) {
  testResults.run++;
  if (given === expected) {
    testResults.passed++;
  } else {
    // NOTE(dbp 2016-02-15): This is a hack to find out where the
    // assertion was called from. Eeek!
    var s = (new Error()).stack.split("\n")[1];
    var loc = s.slice(s.lastIndexOf("/")+1, s.length - 2);
    testResults.failures.push(loc + " - expected " + String(expected) + ", but got " + String(given) + ".");
  }
  updateTestUi();
}


/* These constants are provided for convenience, so that you don't
 * accidentally write "nmber" in a call to _type. If you write TNmber,
 * you'll get an error, whereas if you write the wrong string, it
 * won't be until the _use_ of the resulting function that bizarre
 * things will happen. */
var tNumber = "number";
var tString = "string";
var tObject = "object";
var tBoolean = "boolean";
var tFunction = "function";
var tAny = "anything";
var tNothing = "undefined";

var tArrow = function(args, ret) {
  return { tag: "arrow", args: args, ret: ret };
};

/* This checks a value against a type, or in the case of a function,
 * wraps the function so that when it is used, the proper check
 * occurs. The type can be a flat type, like `tNumber`, or it can be
 * an arrow type, like `tArrow([tNumber], tNumber)`. The latter allows
 * us to ensure that arguments passed to, for example, `animate`, are
 * indeed functions of the right type.
 */
function __type(ty, err, val) {
  // NOTE(dbp 2016-02-13): String types are flat checks.
  if (typeof ty === "string") {
    if (ty === tAny) {
      if (typeof val === "undefined") {
        throw new TypeError(err);
      } else {
        return val;
      }
    } else if (typeof val !== ty) {
      throw new TypeError(err);
    } else {
      return val;
    }
  } else {
    if (ty.tag === "arrow") {
      if (val.length !== ty.args.length) {
        throw new TypeError(err);
      }
      return function () {
        // First, check arity.
        if (arguments.length !== ty.args.length) {
          throw new TypeError(err);
        }

        // Next, check/wrap arguments.
        var args = _.map(_.zip(arguments, ty.args), function(x) {
          var arg_ty = x[1];
          var arg = x[0];
          return __type(arg_ty, err, arg);
        });

        // Finally, call function and check return value.
        var res = val.apply(this, arguments);
        return __type(ty.ret, err, res);
      };
    }
  }
}

test("__type numbers", 10, function () { return __type(tNumber, "", 10); });
test("__type strings", "foo", function () { return __type(tString, "", "foo"); });
testRaises("__type numbers", function () { return __type(tNumber, "", "hello"); });
testRaises("__type tAny doesn't match undefined", function () { return __type(tAny, "", undefined); });
testRaises("__type higher order arity", function () {
  return __type(tArrow([tNumber], tAny), "", function () {})();
});
testRaises("__type higher order arg type", function () {
  return __type(tArrow([tNumber], tAny), "", function (x) {})("foo");
});
testRaises("__type higher order return type", function () {
  return __type(tArrow([], tNumber), "", function () { return "foo";})();
});


/* This function helps make errors better by asserting that the
 * arguments to the function `f` have the number and type specified by
 * `arg_types`. If they don't, the message `err` is raised. */
function _type(arg_types, ret, err, f) {
  return __type(tArrow(arg_types, ret), err, f);
}

var body = document.getElementById("tlc-body");
if (body === null) {
  console.log("TLC: not creating output, no body.");
} else {
  var output = document.createElement("div");
  output.id = "output";

  var source = document.createElement("div");
  source.id = "source";

  body.appendChild(source);
  body.appendChild(output);

  var style = document.createElement("style");

  style.textContent = "#output { width: 45%; float: left; } #source { width: 45%; float: left; } .output { border-bottom: 1px solid #ccc; padding: 10px 0; } #images { width: 45%; float: right; } ";

  body.appendChild(style);

  output.style.margin = "10px";
  output.style.padding = "10px";
  output.style.background = "#eee";
  output.style.border = "1px solid #ccc";
}

function _addOutput(content) {
  var output = document.getElementById("output");
  if (output !== null) {
    var container = document.createElement("div");
    container.className = "output";
    container.appendChild(content);
    output.appendChild(container);
    return container;
  }
}

var show_source_usage = "show_source(): Requires one arguments, a url, which should be a string. For example: show_source('some-file.js')";
var show_source = _type([tString], tNothing, show_source_usage, function (url) {
  var source = document.getElementById("source");
  if (source !== null) {
    var client = new XMLHttpRequest();
    client.open('GET', url);
    var pre = document.createElement("pre");
    source.appendChild(pre);
    client.onreadystatechange = function() {
      pre.textContent = client.responseText;
    }
    client.send();
  }
});


/* LIBRARY FOR DRAWING ETC */

/* print :: anything -> nothing */
var print_usage = "print(): Requires one argument, which can be anything. For example: print(10).";
var print = _type([tAny], tNothing, print_usage, function(value) {

  if (typeof value === "object" && value.hasOwnProperty("tlc_dt")) {
    draw(value);
  } else {
    var pre = document.createElement("pre");
    pre.textContent = String(value);

    _addOutput(pre);
  }
});

/* circle :: number -> color -> shape */
var circle_usage = "circle(): Requires two arguments, a radius and a color, which should be a number and a string. For example: circle(100, 'red').";
var circle = _type([tNumber, tString], tObject, circle_usage, function(radius, color) {

  var circ = { tlc_dt: "circle",
               radius: radius,
               color: color,
               x: 0,
               y: 0 };

  return { tlc_dt: "image",
           elements: [circ],
           width: radius * 2,
           height: radius * 2 };
});

/* rectangle :: number -> number -> color -> shape */
var rectangle_usage = "rectangle(): Requires three arguments, a width, a height, and a color. The first two should be numbers, the last a string. For example: rectangle(100, 50, 'black').";
var rectangle = _type([tNumber, tNumber, tString], tObject, rectangle_usage, function(width, height, color) {

  var rect = { tlc_dt: "rectangle",
               width: width,
               height: height,
               color: color,
               x: 0,
               y: 0 };

  return { tlc_dt: "image",
           elements: [rect],
           width: width,
           height: height };
});

var line_usage = "line(): Requires four arguments, all numbers --  StartX, StartY, EndX, EndY. Line draws a line from one point to another. The first two arguments are the X,Y coordinates of the starting point. The last two arguments are the X,Y coordinates of the ending point. For example: line(0,0, 100, 200)";
var line = _type([tNumber,tNumber,tNumber,tNumber], tObject, line_usage, function(startX, startY, endX, endY) {

  var line = { tlc_dt: "line",
               startX: startX,
               startY: startY,
               endX: endX,
               endY: endY,
               x:0,
               y:0
             };

  return { tlc_dt: "line",
           elements: [line],
           width: endX,
           height: endY
         };

});


var text_usage = "text(): Requires two arguments, text to place in the graphic and a number, the size of the text in pixele. Example: text('Hello', 20).";
// input: string (text to print), number (size of font in pixels); output: image
var text = _type([tString, tNumber], tObject, text_usage, function(words, fontSize){

  var txt = { tlc_dt: "text",
              text: words,
              fontSize: fontSize,
              x: 0,
              y: 0
            };

  return { elements: [txt],
           // ziggy: I'm not sure this is the "proper" way to determine the width
           // of a text phrase...but it seems to work okay.
           width: words.length * fontSize,
           height: fontSize
         };

});

/* image :: url -> shape */
var image_usage = "image(): Requires one argument, a url, which should be a string. For example, image('cat.jpg').";
var image = _type([tString], tObject, image_usage, function(location) {
  var img = new Image()
  //img.src = location;
  //img.style.visibility = "hidden"

  // append the node, get the dimensions, and remove it again
  //document.body.appendChild(img);
  //var imgClone = img.cloneNode();
  //document.body.removeChild(img);

  var imgShape = { tlc_dt: "image",
                   img: img,
                   locaton: location
                 };

  img.onload = function() {
    imgShape.width = img.width;
    imgShape.height = img.height;
  };

  img.src = location;

  return [imgShape];
});

function _drawInternal(cont, image, givenCanvas) {
  if (givenCanvas) {
    var canvas = givenCanvas;
  } else {
    var canvas = document.createElement("canvas");
  }

  var ctx = canvas.getContext("2d");

  canvas.width = image.width;
  canvas.height = image.height;

  for (var i = 0; i < image.elements.length; i++) {
    var shape = image.elements[i];
    switch (shape.tlc_dt) {
    case "rectangle":
      ctx.fillStyle = shape.color;
      ctx.fillRect(shape.x,
                   shape.y,
                   shape.width,
                   shape.height);
      break;
    case "circle":
      ctx.beginPath();
      ctx.fillStyle = shape.color;
      ctx.arc(shape.x + shape.radius,
              shape.y + shape.radius,
              shape.radius, 0, 2 * Math.PI);
      ctx.fill();
      break;
    case "image":
      shape.img.onload = function() {
        ctx.drawImage(shape.img,
                      shape.x,
                      shape.y);
      };
      break;
    case "text":
      ctx.font = '' +  shape.fontSize + "px serif";
      ctx.fillText(shape.text, shape.x, fontSizeHelper(shape.y, shape.fontSize));
      break;
    case "line":
      ctx.beginPath();
      ctx.moveTo(shape.startX,shape.startY);
      ctx.lineTo(shape.endX,shape.endY);
      ctx.stroke();
      break;
    default:
      break;
    }
  }

  if (!givenCanvas) {
    cont(canvas);
  }
}


/* draw :: image -> nothing */
var draw_usage = "draw(): Requires one argument, a image. For example, draw(circle(10, 'red')).";
var draw = _type([tObject], tNothing, draw_usage, function(image) {
  return _drawInternal(_addOutput, image);
});

// text/fontsize helper function
// ensures the y value for fill text is, at minimum, equal to the fontsize.
// input: number (shape.y), number (shape.fontSize)
// output: number
function fontSizeHelper(y, fontSize) {
  if (y >= fontSize) {
    return y;
  } else {
    return fontSize;
  }
}

/* emptyScene :: number -> number -> image */
var emptyScene_usage = "emptyScene(): Requires two arguments, a width and a height, both numbers. For example: emptyScene(300, 200).";
var emptyScene = _type([tNumber, tNumber], tObject, emptyScene_usage, function(width, height) {
  return overlay(rectangle(width-2, height-2, "white"),
                 rectangle(width, height, "black"));
});

/* overlay :: image -> image -> image */
var overlay_usage = "overlay(): Requires two arguments, a foreground and a background image. For example, overlay(circle(10, 'red'), emptyScene(100, 100)).";
var overlay = _type([tObject, tObject], tObject, overlay_usage, function(foreground, background) {
  var newX = background.width/2
             - foreground.width/2;
  var newY = background.height/2
             - foreground.height/2;

  return placeImage(foreground, background, newX, newY);
});

/* placeImage :: image -> image -> x -> y -> image  */
var placeImage_usage = "placeImage(): Requires four arguments: a forgeground image, a background image, and the x and y coordinates for the top left of the foreground to be placed on the background (both numbers). For example, placeImage(rectangle(10,10,'red'), rectangle(100,100,'black'), 40, 40).";
var placeImage = _type([tObject, tObject, tNumber, tNumber], tObject, placeImage_usage, function(foreground, background, x, y) {
  var centeredElements =
      _.map(foreground.elements, function(e) {
        var newE = _.clone(e);
        newE.x = e.x + x;
        newE.y = e.y + y;
        return newE;
      });

  var image = _.clone(background);

  image.elements =
    image.elements.concat(centeredElements);

  return image;
});

function _animateInternal(withCanvas, tickToImage) {

  var canvas = document.createElement("canvas");
  withCanvas(canvas);

  var ticks = 0;
  function step() {
    _drawInternal(withCanvas, tickToImage(ticks), canvas);
    ticks = ticks + 1;
    window.requestAnimationFrame(step);
  }

  step();
}

/* animate :: (tick -> image) -> nothing */
var animate_usage = "animate(): Requires one argument, a function that takes a number and produces a image. For example: animate(function(n) { return overlay(circle(n, 'red'), emptyScene(100,100));}).";
var animate = _type([tArrow([tNumber], tObject)], tNothing, animate_usage, function(tickToImage) {
  return _animateInternal(_addOutput, tickToImage);
});


/* Incorporating into EJS sandbox */
function sandbox_draw(win, image) {
  _drawInternal(function (canvas) {
      var div = document.createElement("div");
      div.appendChild(canvas);
      win.output.div.appendChild(div);
  }, image);
}
function tlc_sandbox_functions(win) {
  return {
    print: _type([tAny], tNothing, print_usage, function(value) {
      if (typeof value === "object" && value.hasOwnProperty("tlc_dt")) {
        sandbox_draw(win, value);
      } else {
        win.out("log", arguments);
      }
    }),
    bike: circle(30, "red"),
    circle: circle,
    rectangle: rectangle,
    text: text,
    overlay: overlay,
    line: line,
    placeImage: placeImage,
    emptyScene: emptyScene,
    animate: _type([tArrow([tNumber], tObject)], tNothing, animate_usage, function(tick) {
      _animateInternal(function (canvas) {
        var div = document.createElement("div");
        div.appendChild(canvas);
        win.output.div.appendChild(div);
      }, tick);
    }),
    draw: _type([tObject], tNothing, draw_usage, function(image) {
      sandbox_draw(win, image);
    })
  };
}
