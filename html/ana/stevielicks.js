function face() {
	var ear = placeImage(circle(30, "orange"), circle(100,"orange"), 0 , 0);
	var face = placeImage(circle(30, "orange"), ear, 140, 0);
	var lEarlobe = placeImage(circle(15, "pink"), face, 13, 10);
	var rEarlobe = placeImage(circle(15, "pink"), lEarlobe, 160, 10);
	return rEarlobe;
}	

function eye(img, xpos) {
	var eyeball = placeImage(circle(16, "white"), img, xpos, 55);
	var iris = placeImage(circle(13, "blue"), eyeball, xpos + 3, 57);
	var pupil = placeImage(circle(7, "black"), iris, xpos + 7, 63); 
	return pupil;
}

function head() {
	var lEye = eye(face(), 50);
	var rEye = eye(lEye, 125);
	var chin = circle(125, "orange");
	var head = placeImage(rEye, chin, 40, 0);
	var EmptyScene = emptyScene(300, 300);
	var scene = overlay(head, EmptyScene);
	return scene;
};

//{ lick_position : number } --> image
function drawWorld(world) {
	var tongue = placeImage(circle(15, "pink"), head(), 151, world.lick_position);
	var lCheek = placeImage(circle(17, "white"), tongue, 133, 142);
	var rCheek = placeImage(circle(17, "white"), lCheek, 165, 142);
	var mouth = placeImage(circle(15, "pink"), rCheek, 150, 125);
	return mouth
};


//{ lick_position : number
//	lick_direction : string} --> { lick_position : number 
//									lick_direction : string}
//If lick_position is 145 nothing happens.
//If lick_position its between 146 and 161 and the lick_direction is down
//then you increase by 1 px
//If lick_position  is 162 lick_direction becomes up and you decrease by 1 px
//If lick_position is between 161 and 146 and the lick_direction is up
//then you decrease by 1 px 

function onTick(world) {
	if (world.lick_position === 145) {
		return world;
	}
	if (world.lick_position === 162) {
		return {lick_position: (world.lick_position - 1),
				lick_direction : "up"};
	}
	if (world.lick_direction === "up") {
		return {lick_position: (world.lick_position - 1),
				lick_direction : "up"};
	} else if (world.lick_direction === "down") {
		return {lick_position: (world.lick_position + 1),
				lick_direction : "down"};
	}	
}

// shouldEqual(onTick({lick_position : 145,
// 			 lick_direction : "up"}),
// 			{lick_position : 145,
// 			 lick_direction : "up"});

// shouldEqual(onTick({lick_position : 148,
// 			 lick_direction : "down"}),
// 			{lick_position : 149,
// 			 lick_direction : "down"});

// shouldEqual(onTick({lick_position : 162,
// 			 lick_direction : "down"}),
// 			{lick_position : 161,
// 			 lick_direction : "up"});

// shouldEqual(onTick({lick_position : 148,
// 			 lick_direction : "up"}),
// 			{lick_position : 147,
// 			 lick_direction : "up"});


//{ lick_position : number
//	lick_direction : string}, string --> { lick_position : number 
//										   lick_direction : string}
//If "Space" is the second argument, and we aren't already licking, 
//lick_position increases by 1 and it turns my lick_direction to down. 
//If we are licking we return the same world. 


function onKey(world, key) {
	if ((key === "Space") && (world.lick_position === 145)) {
		return {lick_position : world.lick_position + 1,
				lick_direction : "down"};
	} else {
		return world;
	}
	
}

// shouldEqual(onKey({ lick_position : 145,                  
// 					lick_direction : "down"	}, "Space"), 
// 				  { lick_position : 146, 
// 					lick_direction : "down"});

// shouldEqual(onKey({ lick_position : 145,                  
// 					lick_direction : "down"	}, "Enter"), 
// 				  { lick_position : 145, 
// 					lick_direction : "down"});

// shouldEqual(onKey({ lick_position : 145,                  
// 					lick_direction : "up"	}, "Space"), 
// 				  { lick_position : 146, 
// 					lick_direction : "down"});

// shouldEqual(onKey({ lick_position : 148,                  
// 					lick_direction : "up"	}, "Space"), 
// 				  { lick_position : 148, 
// 					lick_direction : "up"});

// shouldEqual(onKey({ lick_position : 151,                  
// 					lick_direction : "down"	}, "Space"), 
// 				  { lick_position : 151, 
// 					lick_direction : "down"});


//number, number, number --> boolean
//Given a number and two other numbers, I want to know (a boolean) if the first number is between 
//the two. 
function between(number, less, greater) {
	return (number <= greater) && (less <= number);
}



// shouldEqual(between(5, 3, 7), true);
// shouldEqual(between(5, 1, 3), false);
// shouldEqual(between(5, 5, 5), true);
// shouldEqual(between(5, 10, 1), false);
// shouldEqual(between(5, 10, 10), false);


bigBang({lick_position : 145,
	     lick_direction : "up"},
	     drawWorld,
	     onTick,
	     onKey
	)




