function sourceRocketLeague(Username, System){
	
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
		//console.log(response);
		//console.log(jqXHR);
		
		str = response;
		//str = str.replace(/(\r\n|\n|\r)/gm,"");
		str = str.replace(/\s\s+/g, '#');
		console.log(str);
		
		var statsArray = str.split(',');
		console.log(statsArray);
		/*Response Structure
		*Up to 5 comma separated lines returned
		*First will be performance params which can be further separated to be
		*Score, goal/shot,wins, goals,saves,shots,mvps,assists,mvps/wins
		*
		*Next lines are the different ranking. So may not be there hence max 4. They are hash separated *and split accordingly
		*/
		
		db.transaction(function(transaction){
			var date = new Date();
			var mins = ('0'+date.getMinutes()).slice(-2);
			var time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + mins;
			for(i = 0;i < statsArray.length;i++){
				if(i == 0){
					var performanceArray = statsArray[0].split(' ');
					console.log(performanceArray);
					
					transaction.executeSql('UPDATE Rocket_League SET Active = ?, Ratio = ?, Wins = ?, Goals = ?, Saves = ?, Shots = ?, Mvps = ?, Assists = ?, Mvpratio = ?,Time =? WHERE PlayerName = ? AND System = ?',[1, performanceArray[0], performanceArray[1], performanceArray[2], performanceArray[3], performanceArray[4], performanceArray[5], performanceArray[6], performanceArray[7],time, Username, System],nullHandler,errorHandler);
				}
				else{
					var rankingArray = statsArray[i].split('#');
					console.log(rankingArray);
					if(rankingArray[1] == 'Ranked Duel 1v1'){
						console.log('Duel');
					}
					/*transaction.executeSql('UPDATE Rocket_League SET DuelRank = ?, DuelDivision = ?,DuelRating = ?,DuelGames = ?, DuelStreak = ?,DoublesRank = ?, DoublesDivision = ?,DoublesRating = ?,DoublesGames = ?, DoublesStreak = ?,StandardRank = ?, StandardDivision = ?,StandardRating = ?,StandardGames = ?, StandardStreak = ?,SoloStandardRank = ?, SoloStandardDivision = ?,SoloStandardRating = ?,SoloStandardGames = ?, SoloStandardStreak = ? WHERE PlayerName = ? AND System = ?',[performanceArray[0], performanceArray[1], performanceArray[2], performanceArray[3], performanceArray[4], performanceArray[5], performanceArray[6], performanceArray[7],time, Username, System],nullHandler,errorHandler);*/
				}
			}
		//var newStr = response
		//#var newStr = newStr.substring(0, newStr.length-1); //Due to having an extra character appended
	
		/*db.transaction(function(transaction){
			transaction.executeSql('UPDATE Rocket_League SET Active = ?, Ratio = ?, Wins = ?, Goals = ?, Saves = ?, Shots = ?, Mvps = ?, Assists = ?, Mvpratio = ?,Time =? WHERE PlayerName = ? AND System = ?',[1, performanceArray[0], performanceArray[1], performanceArray[2], performanceArray[3], performanceArray[4], performanceArray[5], performanceArray[6], performanceArray[7],time, Username, System],nullHandler,errorHandler);*/
			
			
			/*transaction.executeSql('UPDATE Rocket_League SET DuelRank = ?, DuelDivision = ?,DuelRating = ?,DuelGames = ?, DuelStreak = ?,DoublesRank = ?, DoublesDivision = ?,DoublesRating = ?,DoublesGames = ?, DoublesStreak = ?,StandardRank = ?, StandardDivision = ?,StandardRating = ?,StandardGames = ?, StandardStreak = ?,SoloStandardRank = ?, SoloStandardDivision = ?,SoloStandardRating = ?,SoloStandardGames = ?, SoloStandardStreak = ? WHERE PlayerName = ? AND System = ?',[performanceArray[0], performanceArray[1], performanceArray[2], performanceArray[3], performanceArray[4], performanceArray[5], performanceArray[6], performanceArray[7],time, Username, System],nullHandler,errorHandler);*/
		},errorHandler,nullHandler);
		displayRocketLeague(Username, System, 1)//re draw stats page
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