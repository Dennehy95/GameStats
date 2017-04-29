function sourceSiege(Username, System){
	
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/sourceSiege.py",
		type: "post",
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		},
		data: {
			Username : Username,
			System : System
		}
	});
	
	// Callback handler that will be called on success
	request.done(function (response, textStatus, jqXHR){
		// Log a message to the console
		//console.log(response);
		//console.log(jqXHR);
		
		str = response;
		//str = str.replace(/(\r\n|\n|\r)/gm,"");
		//str = str.replace(/\s\s+/g, '#');
		//console.log(str);
		
		var statsArray = str.split(',');
		console.log(statsArray);
		/*Response Structure
		*Up to 5 comma separated lines returned
		*First will be performance params which can be further separated to be
		*Score, goal/shot,wins, goals,saves,shots,mvps,assists,mvps/wins
		*
		*Next lines are the different ranking. So may not be there hence max 4. They are hash separated *and split accordingly
		*/
		//displaySiege(Username, System, 1)//re draw stats page
	});
	
	// DuelRank = ?, DuelDivision = ?,DuelRating = ?,DuelGames = ?, DuelStreak = ?,DoublesRank = ?, DoublesDivision = ?,DoublesRating = ?,DoublesGames = ?, DoublesStreak = ?,StandardRank = ?, StandardDivision = ?,StandardRating = ?,StandardGames = ?, StandardStreak = ?,SoloStandardRank = ?, SoloStandardDivision = ?,SoloStandardRating = ?,SoloStandardGames = ?, SoloStandardStreak = ?, 
	
	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error(
			"The following error occurred: "+
			textStatus, errorThrown
		);
	});
}