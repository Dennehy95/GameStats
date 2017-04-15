function scrapeRocketLeague(Username, System){
	
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/sourceRocketLeague.py",
		type: "post",
		data: {
			Username : Username,
			System : System
		}
	});
	
	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		// Log a message to the console
		console.log(response);
		console.log(jqXHR);
		//var newStr = response
		//#var newStr = newStr.substring(0, newStr.length-1); //Due to having an extra character appended
		/*if(newStr == 'Available'){	//So add game
		/*	$('#' + System + UserId).append(
				"<li>" +
					"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''>Rocket League</a>" +
				"</li>").children().last().trigger("create");
		}
		*
			db.transaction(function(transaction){
				transaction.executeSql('SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Active)VALUES (?,?,?)',[Username, System, 0],nullHandler,errorHandler);
					}
				},errorHandler);
			},errorHandler,nullHandler);
		}
		fillListOfGames(UserId, Username, System);*/
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