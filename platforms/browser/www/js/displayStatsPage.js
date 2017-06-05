function displayBasics(Username, System, Game, activeSystemPage, pageId){

	if(System == 'psn'){
		if(Game == '' || Game == 'Profile'){
			toAppend = Username + ' - PSN';
		}
		else{
			if(Game == 'Rocket_League'){
				toAppend = 'Rocket League';
				console.log('Lea');
			}
			else if(Game == 'Siege'){
				console.log('Siege');
				toAppend = 'R6 Siege';
			}
			else{
				console.log('else');
				toAppend = Game;
			}
		}
		
		$("#statsPageHeader" + pageId).append(
			"<h1 class='statsPageUserInfo psn'>" +
				"<div class='ui-grid-a'>" +
					"<div class='statsHeaderLeft ui-block-a'>" +
						"<a onclick='goPSN(\"" + 'pop' + "\",\"" + activeSystemPage + "\")'>" +
							"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve' width='8.6vh' height='8.6vh' transform=' scale(-1, 1)'>" +
								"<path d='M148.5,0C66.485,0,0,66.485,0,148.5S66.485,297,148.5,297S297,230.515,297,148.5S230.515,0,148.5,0z M159.083,231.5H90.75 l74.25-84l-74.25-81h68.333l71.917,81L159.083,231.5z'/>" +
							"</svg>" +
						"</a>" +
					"</div>" +
					"<div class='statsHeaderRight ui-block-b'>" +
						"<div class='usernameTitle'>" + toAppend + "</div>" +
					"</div>" +
				"<div>" +
			"</h1>"
		);
	}
	else if(System == 'steam'){
		str = Username
		Id = str.substring(0,str.indexOf("/"));
		Username = str.substring(str.indexOf("/")+1,str.length);
		
		if(Game == '' || Game == 'Profile'){
			toAppend = Username + ' - Steam';
		}
		else{
			if(Game == 'Rocket_League'){
				toAppend = 'Rocket League';
			}
			else if(Game == 'Siege'){
				toAppend = 'R6 Siege';
			}
			else{
				toAppend = Game;
			}
		}
		
		$("#statsPageHeader" + pageId).append(
			"<h1 class='statsPageUserInfo steam'>" +
				"<div class='ui-grid-a'>" +
					"<div class='statsHeaderLeft ui-block-a'>" +
						"<a onclick='goSteam(\"" + 'pop' + "\",\"" + activeSystemPage + "\")>" +
							"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve' width='8.6vh' height='8.6vh' transform=' scale(-1, 1)'>" +
								"<path d='M148.5,0C66.485,0,0,66.485,0,148.5S66.485,297,148.5,297S297,230.515,297,148.5S230.515,0,148.5,0z M159.083,231.5H90.75 l74.25-84l-74.25-81h68.333l71.917,81L159.083,231.5z'/>" +
							"</svg>" +
						"</a>" +
					"</div>" +
					"<div class='statsHeaderRight ui-block-b'>" +
						"<div class='usernameTitle'>" + toAppend + "</div>" +
					"</div>" +
				"<div>" +
			"</h1>"
		);
	}
	else if(System == 'xbox'){
		if(Game == '' || Game == 'Profile'){
			toAppend = Username + ' - Xbox Live';
		}
		else{
			if(Game == 'Rocket_League'){
				toAppend = 'Rocket League';
			}
			else if(Game == 'Siege'){
				toAppend = 'Rainbow Six Siege';
			}
			else{
				toAppend = Game;
			}
		}
		
		$("#statsPageHeader" + pageId).append(
			"<h1 class='statsPageUserInfo xbox'>" +
				"<div class='ui-grid-a'>" +
					"<div class='statsHeaderLeft ui-block-a'>" +
						"<a onclick='goXbox(\"" + 'pop' + "\",\"" + activeSystemPage + "\")'>" +
							"<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 297 297' style='enable-background:new 0 0 297 297;' xml:space='preserve' width='8.6vh' height='8.6vh' transform=' scale(-1, 1)'>" +
								"<path d='M148.5,0C66.485,0,0,66.485,0,148.5S66.485,297,148.5,297S297,230.515,297,148.5S230.515,0,148.5,0z M159.083,231.5H90.75 l74.25-84l-74.25-81h68.333l71.917,81L159.083,231.5z'/>" +
							"</svg>" +
						"</a>" +
					"</div>" +
					"<div class='statsHeaderRight ui-block-b'>" +
						"<div class='usernameTitle'>" + toAppend + "</div>" +
					"</div>" +
				"<div>" +
			"</h1>"
		);
	}
}

function navigationSetup(position, Username, System, pageId, Destination){
	//$("#" + System + UserId).html("");
	console.log('clearing nav');
	$("#statsPageNavigation" + pageId).html("");
	//Check if User has recorded availability for each game
	db = openDatabase(shortName, version, displayName,maxSize);
	var usersGameList = [];
	
	db.transaction(function(transaction){
		for(i=0; i<gamesList.length;i++){
			transaction.executeSql('SELECT Active FROM "' + gamesList[i] + '" WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
			function(transaction, result) {
				if(result.rows.length == 1){
					/*$('#' + System + UserId).prepend(
						"<li>" +
							"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displayRocketLeague(\"" + Username + "\",\"" + System + "\")'>Rocket League</a>" +
						"</li>"
					).children().last().trigger("create");*/
					checkGameList(position, usersGameList, '1', Username, System, pageId, Destination);
				}
				else{
					checkGameList(position, usersGameList, '0', Username, System, pageId, Destination);
				}
			},errorHandler);
		}
	},errorHandler,nullHandler);
}
function checkGameList(position, usersGameList, gameFound, Username, System, pageId, Destination){
	usersGameList.push(gameFound);
	if(usersGameList.length == gamesList.length){
		$("#Page" + pageId).unbind('swipeleft');
		$("#Page" + pageId).unbind('swiperight');
		if(usersGameList.every(allZero)){
			console.log('all zero');
		}
		else{
			var usersGameListFinal = [];
			for(i=0; i<gamesList.length;i++){
				if(usersGameList[i] == 1){
					usersGameListFinal.push(gamesList[i]);
				}
			}
			var size = usersGameListFinal.length;
			
			if(size == 1){
				if(position == 0){
					$("#Page" + pageId).swipeleft(function() {
						gameNavigation(usersGameListFinal[0],'left','single',Username, System, position, size, activeSystemPage, pageId);
					});
					$("#Page" + pageId).swiperight(function() {
						gameNavigation(usersGameListFinal[0],'right','single', Username, System, position, size, activeSystemPage, pageId);
					});
					gameTitleOnClick = 'gameNavigation("' + usersGameListFinal[0] + '","' + 'left' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"' + pageId + '")';
					navTitle = usersGameListFinal[0]
				}
				else if(position == 1){
					$("#Page" + pageId).swipeleft(function() {
						gameNavigation('Profile','left','single', Username, System, position, size, activeSystemPage, pageId);
					});
					$("#Page" + pageId).swiperight(function() {
						gameNavigation('Profile','right','single', Username, System, position, size, activeSystemPage, pageId);
					});
					gameTitleOnClick = 'gameNavigation("' + 'Profile' + '","' + 'right' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"'  + pageId + '")';
					navTitle = 'Profile';
				}
				if(navTitle == 'Rocket_League'){
					navTitle = 'Rocket League';
				}
				
				$("#statsPageNavigation" + pageId).append(
					"<div class='ui-grid-b statsPageNavigationSingle' onclick='" + gameTitleOnClick + "'>" +
						"<div class='ui-block-a' style='width: 0%;margin-left: -1vh;text-align: center'>" +
							"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute' transform='scale(-1, 1)'>" +
								"<path stroke='#67e2bc' stroke-width='50' fill='none' stroke-opacity='0.6' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
							"</svg>" +
						"</div>" +
						"<div class='ui-block-b' style='width: 70%;margin-left: 15%;text-align: center'>" +
							"<h1 class='gameTitle'>" +
								"<div class='navText games'>" + navTitle + "</div>" +
							"</h1>" +
						"</div>" +
						"<div class='ui-block-c' style='width: 10%;text-align: center;'>" +
							"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute'>" +
								"<path stroke='#67e2bc' stroke-width='50' fill='none' stroke-opacity='0.6' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
							"</svg>" +
						"</div>" +
					"</div>"
				);
			}
			else if(size > 1){
				if(position == 0){
					$("#Page" + pageId).swipeleft(function() {
						gameNavigation(usersGameListFinal[0],'left','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					$("#Page" + pageId).swiperight(function() {
						gameNavigation(usersGameListFinal[size-1],'right','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					
					gameTitleRightOnClick = 'gameNavigation("' + usersGameListFinal[0] + '","' + 'left' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"' + pageId + '")';
					gameTitleLeftOnClick = 'gameNavigation("' + usersGameListFinal[size-1] + '","' + 'right' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"' + pageId + '")';
					navTitleRight = usersGameListFinal[0]
					navTitleLeft = usersGameListFinal[size-1];
				}
				else if(position == 1){
					$("#Page" + pageId).swipeleft(function() {
						gameNavigation(usersGameListFinal[1],'left','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					$("#Page" + pageId).swiperight(function() {
						gameNavigation('Profile','right','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					
					gameTitleRightOnClick = 'gameNavigation("' + usersGameListFinal[1] + '","' + 'left' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"' + pageId + '")';
					gameTitleLeftOnClick = 'gameNavigation("' + 'Profile' + '","' + 'right' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',"'  + pageId + '")';
					navTitleRight = usersGameListFinal[1]
					navTitleLeft = 'Profile';
				}
				else if(position == size){
					$("#Page" + pageId).swipeleft(function() {
						gameNavigation('Profile','left','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					$("#Page" + pageId).swiperight(function() {
						gameNavigation(usersGameListFinal[size-2],'right','multi', Username, System, position, size, activeSystemPage, pageId);
					});
					
					gameTitleRightOnClick = 'gameNavigation("' + 'Profile' + '","' + 'left' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ','  + pageId + ')';
					gameTitleLeftOnClick = 'gameNavigation("' + usersGameListFinal[size-2] + '","' + 'right' + '","' + 'multi' + '","' + Username + '","' + System + '",' + position + ',' + size + ',' + activeSystemPage + ',' + pageId + ')';
					navTitleRight = 'Profile';
					navTitleLeft = usersGameListFinal[size-2];
				}
				if(navTitleLeft == 'Rocket_League'){
					navTitleLeft = 'Rocket League';
				}
				if(navTitleRight == 'Rocket_League'){
					navTitleRight = 'Rocket League';
				}
				$("#statsPageNavigation" + pageId).append(
					"<div class='ui-grid-a statsPageNavigationMulti'>" +
						"<div class='ui-block-a'>" +
							"<h1 class='gameTitle left' onclick='" + gameTitleLeftOnClick + "'>" +
								"<div class='ui-grid-a'>" +
									"<div class='ui-block-a' style='width: 0%;margin-left: -1vh;text-align: center;'>" +
										"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute' transform='scale(-1, 1)'>" +
										 "<path stroke='#67e2bc' stroke-width='50' fill='none' stroke-opacity='0.8' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
										"</svg>" +
									"</div>" +
									"<div class='ui-block-a' onclick='' style='margin-left: 20%;text-align: center;width: 80%;'>" +
										"<div class='navText games'>" + navTitleLeft +"</div>" +
									"</div>" +
								"</div>" +
							"</h1>" +
						"</div>" +
						"<div class='ui-block-b'>" +
							"<h1 class='gameTitle right' onclick='" + gameTitleRightOnClick + "'>" +
								"<div class='ui-grid-a'>" +
									"<div class='ui-block-a' style='width: 80%;text-align: center;'>" +
										"<div class='navText games'>" + navTitleRight + "</div>" +
									"</div>" +
									"<div class='ui-block-b' onclick='' style='width: 0%;text-align: center;'>" +
										"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute'>" +
											"<path stroke='#67e2bc' stroke-width='50' fill='none' stroke-opacity='0.8' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
										"</svg>" +
									"</div>" +
								"</div>" +
							"</h1>" +
						"</div>" +
					"</div>"
				);
			}
		}

		updateGamesList(position, Username, System, Destination, pageId, usersGameList)
	}
}

function allZero(arr) {
    return arr == 0;
}

function updateGamesList(position, Username, System, Destination, pageId, usersGameList){
	console.log(usersGameList);
	$("#statsPageContent" + pageId).html("");
	if(position == 0){
		$("#statsPageUpdateGames" + pageId).append(
			"<div class='statsPageUpdateGames'>" +
				"<button id='updateGamesButton" + pageId +"' class='ui-btn updateGamesButton' onclick='updateListOfGames(\"" + Username + "\",\"" + System + "\",\"" + pageId + "\",\"" + Destination + "\")'>Update Games" +
					/*"<svg width='7vh' height='7vh' viewBox='0 0 487.23 487.23' style='enable-background:new 0 0 487.23 487.23; position: absolute'>" +
						"<path d='M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61    c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512    c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205    c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332    c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06    c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z' fill='#91DC5A'/>" +
						"<path d='M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854    c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369    c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089    c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943 c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805  c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059 C473.197,326.043,471.903,312.157,464.635,301.184z' fill='#91DC5A'/>" +
					"</svg>" +*/
				"</button>" +
			"</div>"
		);
	}
	else{
		if(Destination == 'Rocket_League'){
			onclickAppend = 'sourceRocketLeague("' + Username + '","' + System + '","' + pageId + '")';
		}
		else if(Destination == 'Siege'){
			onclickAppend = 'sourceSiege("' + Username + '","' + System + '","' + pageId + '")';
		}
		
		$("#statsPageUpdateGames" + pageId).append(
			"<div class='statsPageUpdateGames'>" +
				"<button id='updateGamesStatsButton" + pageId +"' class='ui-btn updateGamesButton' onclick='" + onclickAppend + "'>" +
					"<div class='updateButtonTextTop'>" +
						"Update Stats" +
					"</div>" +
					"<div class='updateButtonTextBottom'>" +
						
					"</div>" +
					/*"<svg width='7vh' height='7vh' viewBox='0 0 487.23 487.23' style='enable-background:new 0 0 487.23 487.23; position: absolute'>" +
						"<path d='M55.323,203.641c15.664,0,29.813-9.405,35.872-23.854c25.017-59.604,83.842-101.61,152.42-101.61    c37.797,0,72.449,12.955,100.23,34.442l-21.775,3.371c-7.438,1.153-13.224,7.054-14.232,14.512    c-1.01,7.454,3.008,14.686,9.867,17.768l119.746,53.872c5.249,2.357,11.33,1.904,16.168-1.205    c4.83-3.114,7.764-8.458,7.796-14.208l0.621-131.943c0.042-7.506-4.851-14.144-12.024-16.332    c-7.185-2.188-14.947,0.589-19.104,6.837l-16.505,24.805C370.398,26.778,310.1,0,243.615,0C142.806,0,56.133,61.562,19.167,149.06    c-5.134,12.128-3.84,26.015,3.429,36.987C29.865,197.023,42.152,203.641,55.323,203.641z' fill='#91DC5A'/>" +
						"<path d='M464.635,301.184c-7.27-10.977-19.558-17.594-32.728-17.594c-15.664,0-29.813,9.405-35.872,23.854    c-25.018,59.604-83.843,101.61-152.42,101.61c-37.798,0-72.45-12.955-100.232-34.442l21.776-3.369    c7.437-1.153,13.223-7.055,14.233-14.514c1.009-7.453-3.008-14.686-9.867-17.768L49.779,285.089    c-5.25-2.356-11.33-1.905-16.169,1.205c-4.829,3.114-7.764,8.458-7.795,14.207l-0.622,131.943 c-0.042,7.506,4.85,14.144,12.024,16.332c7.185,2.188,14.948-0.59,19.104-6.839l16.505-24.805  c44.004,43.32,104.303,70.098,170.788,70.098c100.811,0,187.481-61.561,224.446-149.059 C473.197,326.043,471.903,312.157,464.635,301.184z' fill='#91DC5A'/>" +
					"</svg>" +*/
				"</button>" +
			"</div>"
		);
	}
	if($.trim($("#statsPageNavigation3a").html())==''){
		console.log('#updateGamesButton' + pageId)
		$('#updateGamesButton' + pageId).css('margin', '3vh 0 0 20%');
	}
}

function displayStats(system, Username, activeSystemPage){
	$("#statsPageHeader3a").html("");
	$("#statsPageNavigation3a").html("");
	$("#statsPageUpdateGames3a").html("");
	$("#statsPageContent3a").html("");
	
	$.mobile.pageContainer.pagecontainer('change', '#Page3a', {
		reverse: false,
		transition: 'pop',
		reload    : false
	});
	
	if(system == 'psn'){
		activeSystem = 'InPSN';
	}
	else if(system == 'steam'){
		activeSystem = 'InSteam';
	}
	if(system == 'xbox'){
		activeSystem = 'InXbox';
	}
	
	displayBasics(Username, system, "", activeSystemPage, '3a');
	navigationSetup(0, Username, system, '3a', '');
	//updateGamesList(0, Username, system,"",'3a', []);
}