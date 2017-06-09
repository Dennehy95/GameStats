function updateListOfGames(/*UserId,*/ Username, System, pageId, Destination, usersGameList){
	db = openDatabase(shortName, version, displayName,maxSize);
	
	/*$.get("http://www.dennehyobutternug.eu/gameStatsPython/checkGames.py", function(data) {
		//$("#ajax_results").text(data);
		console.log(data);
	})*/
	
	/*$.ajax({
		type: "POST",
		url: 'http://www.dennehyobutternug.eu/gameStatsPython/checkGames.py',
		data: {
			Username : Username,
			System : System
		},
		function(data, status){
			console.log("Data: " + data + "\nStatus: " + status);
		}
	});*/
	usersGameListJSON = JSON.stringify(usersGameList)
	//$(urlfetch )
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/checkGames.py",
		type: "post",
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		complete: function(){
			console.log('complete');
			$('.ajax-loader').css("visibility", "hidden");
		},
		data: {
			Username: Username,
			System: System,
			usersGameListJSON: usersGameListJSON
		}
	});

	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		
		str = response;
		//str = str.replace(/(\r\n|\n|\r)/gm,"");
		//str = str.replace(/\s\s+/g, '#');
		console.log(str);
		
		var availability = str.split(',');
		console.log(availability);
		
		console.log('updateListOfGames');
		// Log a message to the console
		var halovAvailable = availability[0];
		var rocketLeagueAvailable = availability[1];
		var siegeAvailable = availability[2];
		siegeAvailable = siegeAvailable.substring(0, siegeAvailable.length-1);
		
		db.transaction(function(transaction){
			if(halovAvailable == 'Available'){
				transaction.executeSql('SELECT PlayerName FROM Halo_V WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Halo_V(PlayerName, System, Active, TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills, TotalArenaGroundPoundKills, TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '0', 0,'Not Updated Yet'],nullHandler,errorHandler);
					}
				},errorHandler);
			}
			
			if(rocketLeagueAvailable == 'Available'){ //So add game
				transaction.executeSql('SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Active, Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio, DuelRank, DuelDivision, DuelRating, DuelGames, DuelStreak, DoublesRank, DoublesDivision, DoublesRating, DoublesGames, DoublesStreak, StandardRank, StandardDivision, StandardRating, StandardGames ,StandardStreak, SoloStandardRank, SoloStandardDivision, SoloStandardRating, SoloStandardGames, SoloStandardStreak, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0.0, 0, 0, 0, 0, 0, 0, 0.0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Not Updated Yet'],nullHandler,errorHandler);
					}
				},errorHandler);
			}
			
			if(siegeAvailable == 'Available'){
				transaction.executeSql('SELECT PlayerName FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						transaction.executeSql('INSERT INTO Siege(PlayerName, System, Active, KillsCasual, DeathsCasual, kdCasual, PlaytimeCasual, WinsCasual, LossesCasual, WinPercentCasual, levelCasual, KillsRanked, DeathsRanked, kdRanked, PlaytimeRanked, WinsRanked, LossesRanked, WinPercentRanked, levelRanked, Revives, Suicides, MeleeKills, AccuracyPercent, HeadshotPercent, Assist, PenetrationKills, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0, 0, 0.0, '0.0H',0, 0, 0.0, 0, 0, 0, 0.0, '0.0H', 0, 0, 0.0, 0, 0, 0, 0, '0.0', '0.0', 0, 0,'Not Updated Yet'],nullHandler,errorHandler);
					}
				},errorHandler);
			}
			
			//PlayerName, System, Active, TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills, TotalArenaGroundPoundKills, TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Time
			
			console.log('recalling nav');
			$("#statsPageUpdateGames" + pageId).html("");
			navigationSetup(0, Username, System, pageId, Destination);
			//navigationSetup(position, Username, System, toChangePageId, Destination);
		},errorHandler,nullHandler);
		console.log('done?');
		//fillListOfGames(UserId, Username, System);
		
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error(
			"The following error occurred: "+
			textStatus, errorThrown
		);
	});
}