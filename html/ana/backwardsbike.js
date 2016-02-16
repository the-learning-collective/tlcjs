var draw_bike = function(position) {
  if (position < 400) {
    return placeImage(bike, emptyScene(400, 100), position, 30);
  } else {
    return placeImage(bike, emptyScene(400, 100), (800 - position), 30)
  };
};

animate(draw_bike);

