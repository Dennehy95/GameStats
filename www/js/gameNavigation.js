function gameNavigation(Destination, Direction, Outlay, Username, System, position, size, activeSystemPage, pageId){
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
	if(pageId == '3a'){
		toChangePageId = '3b';
	}
	else{
		toChangePageId = '3a';
	}
	$("#statsPageHeader" + toChangePageId).html("");
	$("#statsPageNavigation" + toChangePageId).html("");
	$("#statsPageUpdateGames" + toChangePageId).html("");
	$("#statsPageContent" + toChangePageId).html("");
	
	displayBasics(Username, System, Destination,activeSystemPage, toChangePageId);
	navigationSetup(position, Username, System, toChangePageId, Destination);
	//updateGamesList(position, Username, System, Destination, toChangePageId);
	
	if(Destination == 'Rocket_League'){
		displayStatsRocketLeague(Username, System, toChangePageId)
	}
	else if(Destination == 'Siege'){
		displayStatsSiege(Username, System, toChangePageId)
	}
	
	if(Direction == 'right'){
		$.mobile.pageContainer.pagecontainer('change', '#Page' + toChangePageId, {
			reverse: true,
			transition: 'slide',
			reload    : false
		});
	}
	else{
		$.mobile.pageContainer.pagecontainer('change', '#Page' + toChangePageId, {
			reverse: false,
			transition: 'slide',
			reload    : false
		});
	}
}