var draw_bike = function(position) {
	if (position < 80) {
		return placeImage(bike, emptyScene(400, 100), position, 30);
	} else if (position < 160) {
		return placeImage(bike, emptyScene(400, 100), position, 10);
	} else if (position < 320){
		return placeImage(bike, emptyScene(400, 100), position, 30);
	} else {
		return placeImage(bike, emptyScene(400, 100), 320, 30);
	}
};

animate(draw_bike);
