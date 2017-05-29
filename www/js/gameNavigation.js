function gameNavigation(Destination, Direction, Outlay, Username, System, position, size){
	console.log(Destination);
	
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
	$("#statsPageContent").html("");
	
	displayBasics(Username, System, Destination);
	navigationSetup(position, Username, System);
	updateGamesList(position, Username, System, Destination);
	
	if(Destination == 'Rocket_League'){
		displayStatsRocketLeague(Username, System)
	}
	else if(Destination == 'Siege'){
		console.log('display siege');
	}
}