function updateListOfGames(/*UserId,*/ Username, System){
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
	console.log('Updating ghames');
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
			Username : Username,
			System : System
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
		var rocketLeagueAvailable = availability[0];
		var siegeAvailable = availability[1];
		var siegeAvailable = siegeAvailable.substring(0, siegeAvailable.length-1); //Due to having an extra character appended
		
		db.transaction(function(transaction){
			if(rocketLeagueAvailable == 'Available'){ //So add game
				transaction.executeSql('SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Active, Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio, DuelRank, DuelDivision, DuelRating, DuelGames, DuelStreak, DoublesRank, DoublesDivision, DoublesRating, DoublesGames, DoublesStreak, StandardRank, StandardDivision, StandardRating, StandardGames ,StandardStreak, SoloStandardRank, SoloStandardDivision, SoloStandardRating, SoloStandardGames, SoloStandardStreak, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0.0, 0, 0, 0, 0, 0, 0, 0.0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'0000/00/00 00:00'],nullHandler,errorHandler);
					}
				},errorHandler);
			}
			
			if(siegeAvailable == 'Available'){
				transaction.executeSql('SELECT PlayerName FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Siege(PlayerName, System, Active, KillsCasual, DeathsCasual, kdCasual, PlaytimeCasual, WinsCasual, LossesCasual, WinPercentCasual, levelCasual, KillsRanked, DeathsRanked, kdRanked, PlaytimeRanked, WinsRanked, LossesRanked, WinPercentRanked, levelRanked, Revives, Suicides, MeleeKills, AccuracyPercent, HeadshotPercent, Assist, PenetrationKills, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0, 0, 0.0, '0.0H',0, 0, 0.0, 0, 0, 0, 0.0, '0.0H', 0, 0, 0.0, 0, 0, 0, 0, '0.0', '0.0', 0, 0,'0000/00/00 00:00'],nullHandler,errorHandler);
					}
				},errorHandler);
			}
			else{
				console.log('nosiege');
			}
			console.log('recalling nav');
			navigationSetup(0, Username, System, '3a');
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
	
	/*var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/checkSiege.py",
		type: "post",
		data: {
			Username : Username,
			System : System
		}
	});

	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		// Log a message to the console
		var newStr = response
		var newStr = newStr.substring(0, newStr.length-1); //Due to having an extra character appended
		console.log(newStr)
		//console.log(response === 'Available')
		if(newStr == 'Available'){	//So add game
			console.log('l8r')
		}
	});

	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error(
			"The following error occurred: "+
			textStatus, errorThrown
		);
	});*/
	
	
	/*//var sql = 'SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '"';
	//transaction.executeSql('IF EXISTS (SELECT * FROM Rocket_League WHERE PlayerName = Username AND System = System)');
	//console.log(transaction.executeSql('IF EXISTS (SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '");', [],))
	//transaction.executeSql(sql, [],
	function(transaction, result) {
		if(result.rows.length === 1){
			$('#xbox' + UserId).append(
				"<li>" +
					"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''>Rocket League</a>" +
				"</li>").children().last().trigger("create");
		}
	},errorHandler);
},errorHandler,nullHandler);*/
}