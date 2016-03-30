print("Hello world");

var eyelid = circle(12, "white");
var odinObject = {
    background: rectangle(400, 400, "grey"),
    body: circle(140, "white"),
    ear: {
        outterEar: circle(26, "white"),
        innerEar: circle(20, "pink")
    },
    head: (circle(90, "white")),
    eye: circle(10, "green"),
    nose: circle(13, "pink"),
    spot: circle(25, "black")
};

function catPic (odinObject) {
    return placeImage(
      odinObject.eye,
      placeImage(
        odinObject.nose,
        placeImage(
          odinObject.head,
          placeImage(
            odinObject.ear.innerEar,
            placeImage(
              odinObject.ear.innerEar,
              placeImage(
                odinObject.ear.outterEar,
                placeImage(
                  odinObject.ear.outterEar,
                  placeImage(
                    odinObject.spot,
                    placeImage(
                      odinObject.spot,
                      placeImage(
                        odinObject.spot,
                        placeImage(
                          odinObject.body,
                          odinObject.background,
                          33,
                          140),
                        180,
                        200),
                      110,
                      170),
                    55,
                    220),
                  210,
                  20),
                270,
                20),
              215,
              25),
            275,
            25),
          180,
          40),
        250,
        110),
      225,
      75);
}

function drawCat(cat) {
    return placeImage(text(String(cat.cuddles), 12),
                      placeImage(eyelid,
                                 catPic(odinObject),
                                 223, cat.blink_position),
                      0, 10);
}

// Cat blinks when he's awake
function makeBlink(cat) {
   return {blink_position: cat.blink_position + 22};
}

// { blink_position: number,
//   cuddles: percentage }, key -> world
// If player presses "c", cuddle the cat
// Cuddle decrease neediness
// If cuddlemeter is full, Odin sleeps
function cuddle(cat, key) {
  if (key === "c") {
    if (cat.cuddles >= 99) {
        return { sleeping: true,
                 blink_timer: 0,
                 blink_position: 69,
                 cuddles: 100};
    } else {
      return { sleeping: cat.sleeping,
               blink_timer: cat.blink_timer,
               blink_position: cat.blink_position,
               cuddles: cat.cuddles + 1};
    }
  } else {
      return cat; /*starting world state of blink_position: 50*/
  }
}

/*
shouldEqual(cuddle({blink_position: 0, cuddles: 0}, "c"),
                   {blink_position: 0, cuddles: 1});
shouldEqual(cuddle({blink_position: 0, cuddles: 100}, "c"),
                   {blink_position:69, cuddles: 100, sleeping: false, blink_timer: 0 });
shouldEqual(cuddle({blink_position: 0, cuddles: 0}, "v"),
                   {blink_position: 0, cuddles: 0});*/

// Odin blinks unless he's asleep
function onTick(cat) {
  if (cat.sleeping === true) {
    if (cat.cuddles > 50) {
      return { sleeping: true,
               blink_timer: cat.blink_timer,
               blink_position: cat.blink_position,
               cuddles: cat.cuddles - 1};
    } else {
        return { sleeping: false,
                 blink_timer: cat.blink_timer,
                 blink_position: 50,
                 cuddles: cat.cuddles};
    }
  } else {
    if (cat.blink_timer === 0) {
      return {sleeping: false,
              blink_timer: 0,
              blink_position: cat.blink_position + 22,
              cuddles: cat.cuddles - 1};
    } else {
      if (cat.blink_position === 50) {
        return {sleeping: false, blink_timer: 0, blink_position: 50, cuddles: cat.cuddles - 1};
      } else {
        return {sleeping: false,
                blink_timer: 0,
                blink_position: cat.blink_position - 1,
                cuddles: cat.cuddles};
      }
    }
  }
}

shouldEqual(onTick({sleeping: false,
        blink_timer: 0,
        blink_position: 50,
        cuddles: 50}),
        {sleeping: false,
          blink_timer: 0,
          blink_position: 72,
          cuddles: 49});

// world { blink_position: number,
//         cuddles: percent /* representing needy -> asleep */,
//          }

bigBang({sleeping: false, blink_timer: 0, blink_position: 50, cuddles: 25}, drawCat, onTick, cuddle);
