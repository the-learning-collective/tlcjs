// world : { characterVertical : number(0, 400),
//           obstacle : obstacle,
//           score : number
//         } OR { lostWithScore : number }
// obstacle : { fromTop : number, fromBottom : number,
//              left: number(0, 600)
//            }

var eye = circle(5, "white");

var mouth = placeImage(circle(10, "rebeccapurple"), circle(10, "white"), 0, -5);

var character = placeImage(mouth, placeImage(eye, rectangle(50, 50, "rebeccapurple"), 30, 10), 40, 20);

var ground = placeImage(rectangle(600, 10, "brown"), emptyScene(600, 400), 0, 390);;

function drawWorld(world) {
  if (world.lostWithScore) {
    return overlay(text("You lost...", 50),
                   placeImage(text("Score: " + String(world.lostWithScore), 20),
                              placeImage(character, ground,
                                         250, 300),
                              330, 330));
  } else {
    var withChar = placeImage(character,
                              ground,
                              150,
                              world.characterVertical);

    var withObstacle =
        placeImage(rectangle(50, world.obstacle.fromBottom, "green"), placeImage(rectangle(50, world.obstacle.fromTop, "green"), withChar, world.obstacle.left, 0), world.obstacle.left, 400 - world.obstacle.fromBottom);

    return withObstacle;
  }
}

function colliding(w) {
  if (w.obstacle.left >= 200 || w.obstacle.left <= 100) {
    return false;
  } else {
    return w.characterVertical < w.obstacle.fromTop ||
           w.characterVertical + 50 > 400 - w.obstacle.fromBottom;
  }
}

shouldEqual(colliding({ characterVertical: 0,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 150
                                  },
                        score: 0
                      }), true);

shouldEqual(colliding({ characterVertical: 0,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 199
                                  },
                        score: 0
                      }), true);

shouldEqual(colliding({ characterVertical: 0,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 200
                                  },
                        score: 0
                      }), false);

shouldEqual(colliding({ characterVertical: 0,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 250
                                  },
                        score: 0
                      }), false);

shouldEqual(colliding({ characterVertical: 100,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 150
                                  },
                        score: 0
                      }), false);

shouldEqual(colliding({ characterVertical: 300,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 150
                                  },
                        score: 0
                      }), true);

shouldEqual(colliding({ characterVertical: 250,
                        obstacle: { fromTop: 100,
                                    fromBottom: 100,
                                    left: 150
                                  },
                        score: 0
                      }), false);

function tick(w) {
  if (w.lostWithScore) {
    return w;
  } else if (colliding(w)) {
    return { lostWithScore: w.score };
  } else {

    var newVertical = Math.min(w.characterVertical + 1, 340);

    if (w.obstacle.left < 0) {
      var gap = Math.floor(100 + Math.random()*100);
      var fromTop = Math.floor(Math.random()*(400-gap));
      var fromBottom = 400 - fromTop - gap;

      return { characterVertical: newVertical,
               obstacle: { fromTop: fromTop,
                           fromBottom: fromBottom,
                           left: 600
                         },
               score: w.score + 1
             };
    } else {
      return { characterVertical: newVertical,
               obstacle: { fromTop: w.obstacle.fromTop,
                           fromBottom: w.obstacle.fromBottom,
                           left: w.obstacle.left - 2
                         },
               score: w.score
             };
    }
  }
}

shouldEqual(tick({ characterVertical: 340,
                   obstacle: { fromTop: 0,
                               fromBottom: 0,
                               left: 300},
                   score: 0}),
            { characterVertical: 340,
              obstacle: { fromTop: 0,
                          fromBottom: 0,
                          left: 298},
              score: 0});

function onkey(w, key) {
  if (key === " ") {
    return { characterVertical: w.characterVertical - 20,
             obstacle: { fromTop: w.obstacle.fromTop,
                         fromBottom: w.obstacle.fromBottom,
                         left: w.obstacle.left
                       },
             score: w.score
           };
  } else {
    return w;
  }
}

var startingWorld = { score: 0,
                      characterVertical: 50,
                      obstacle: { fromTop: 50,
                                  fromBottom: 100,
                                  left: 300}
                    };

bigBang(startingWorld, drawWorld, tick, onkey);
