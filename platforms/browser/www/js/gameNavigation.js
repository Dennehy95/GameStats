function gameNavigation(Destination, Direction, Outlay, Username, System, position, size){
	console.log(Destination);
	console.log(Direction);
	console.log(Outlay);
	console.log(size + "=Size");
	
	if(Outlay == 'single'){
		if(position == 1){
			position = 0;
		}
		else{
			position = 1;
		}
	}
	else if(Outlay == 'multi'){
		if(Direction == 'left'){
			if(Destination !== 'Profile' && position !== size){
				position = position +1
			}
			else{
				position = 0;
			}
		}
		else if(Direction == 'right'){
			if(position == 0){
				position = size;
			}
			else{
				position = position -1
			}
		}
	}
	
	$("#statsPageHeader").html("");
	$("#statsPageNavigation").html("");
	$("#statsPageUpdateGames").html("");
	
	displayBasics(Username, System, Destination);
	navigationSetup(position, Username, System);
	updateGamesList(position);
}