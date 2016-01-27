console.log("TLC is starting up...");

/* OUTPUT AND INFRASTRUCTURE */

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


/* This function helps make errors better by asserting that the
 * arguments to the function `f` have the number and type specified by
 * `args`. If they don't, the message `err` is raised. */
function _type(args, err, f) {
  return function() {
    if (arguments.length !== args.length
        || !_.every(_.zip(arguments, args), function(x) {
          return x[1] === tAny || typeof x[0] === x[1];
        })) {
      throw new TypeError(err);
    } else {
      return f.apply(this, arguments);
    }
  };
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
var show_source = _type([tString], show_source_usage, function (url) {
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
var print = _type([tAny], print_usage, function(value) {

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
var circle = _type([tNumber, tString], circle_usage, function(radius, color) {

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
var rectangle = _type([tNumber, tNumber, tString], rectangle_usage, function(width, height, color) {

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

/* image :: url -> shape */
var image_usage = "image(): Requires one argument, a url, which should be a string. For example, image('cat.jpg').";
var image = _type([tString], image_usage, function(location) {
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
      }
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
var draw = _type([tObject], draw_usage, function(image) {
  return _drawInternal(_addOutput, image);
});

/* emptyScene :: number -> number -> image */
var emptyScene_usage = "emptyScene(): Requires two arguments, a width and a height, both numbers. For example: emptyScene(300, 200).";
var emptyScene = _type([tNumber, tNumber], emptyScene_usage, function(width, height) {
  return { tlc_dt: "image",
           elements: [],
           width: width,
           height: height };
});

/* overlay :: image -> image -> image */
var overlay_usage = "overlay(): Requires two arguments, a foreground and a background image. For example, overlay(circle(10, 'red'), emptyScene(100, 100)).";
var overlay = _type([tObject, tObject], overlay_usage, function(foreground, background) {
  var newX = background.width/2
             - foreground.width/2;
  var newY = background.height/2
             - foreground.height/2;

  return placeImage(foreground, background, newX, newY);
});

/* placeImage :: image -> image -> x -> y -> image  */
var placeImage_usage = "placeImage(): Requires four arguments: a forgeground image, a background image, and the x and y coordinates for the top left of the foreground to be placed on the background (both numbers). For example, placeImage(rectangle(10,10,'red'), rectangle(100,100,'black'), 40, 40).";
var placeImage = _type([tObject, tObject, tNumber, tNumber], placeImage_usage, function(foreground, background, x, y) {
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
var animate = _type([tFunction], animate_usage, function(tickToImage) {
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
    print: _type([tAny], print_usage, function(value) {
      if (typeof value === "object" && value.hasOwnProperty("tlc_dt")) {
        sandbox_draw(win, value);
      } else {
        win.out("log", value);
      }
    }),
    circle: circle,
    rectangle: rectangle,
    overlay: overlay,
    placeImage: placeImage,
    emptyScene: emptyScene,
    animate: _type([tFunction], animate_usage, function(tick) {
      _animateInternal(function (canvas) {
        var div = document.createElement("div");
        div.appendChild(canvas);
        win.output.div.appendChild(div);
      }, tick);
    }),
    draw: _type([tObject], draw_usage, function(image) {
      sandbox_draw(win, image);
    })
  };
}
