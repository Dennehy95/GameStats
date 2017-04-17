function sourceRocketLeague(Username, System){
	
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/sourceRocketLeague.py",
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
						DuelRank = rankingArray[2];
						DuelDiv = rankingArray[3];
						DuelRating = rankingArray[4];
						DuelGames = rankingArray[5].replace(/ *\([^)]*\) */g, "");
						//DuelGames = DuelGames.substring(0, DuelGames.length-1);
						DuelStreak = 0;
						if(rankingArray.length == 7){
							DuelStreak = rankingArray[6];
							DuelStreak = DuelStreak.replace(/([a-z])([A-Z])/g, '$1 $2');
							DuelStreak = DuelStreak.replace(/:/g, ' ');
						}
						transaction.executeSql('UPDATE Rocket_League SET DuelRank = ?, DuelDivision = ?,DuelRating = ?,DuelGames = ?, DuelStreak = ? WHERE PlayerName = ? AND System = ?',[DuelRank, DuelDiv, DuelRating, DuelGames, DuelStreak, Username, System],nullHandler,errorHandler);
					}
					else if(rankingArray[1] == 'Ranked Doubles 2v2'){
						DoublesRank = rankingArray[2];
						DoublesDiv = rankingArray[3];
						DoublesRating = rankingArray[4];
						DoublesGames = rankingArray[5].replace(/ *\([^)]*\) */g, "");
						//DoublesGames = DoublesGames.substring(0, DoublesGames.length-1);
						DoublesStreak = 0;
						if(rankingArray.length == 7){
							DoublesStreak = rankingArray[6];
							DoublesStreak = DoublesStreak.replace(/([a-z])([A-Z])/g, '$1 $2');
							DoublesStreak = DoublesStreak.replace(/:/g, ' ');
						}
						transaction.executeSql('UPDATE Rocket_League SET DoublesRank = ?, DoublesDivision = ?,DoublesRating = ?,DoublesGames = ?, DoublesStreak = ? WHERE PlayerName = ? AND System = ?',[DoublesRank, DoublesDiv, DoublesRating, DoublesGames, DoublesStreak, Username, System],nullHandler,errorHandler);
					}
					else if(rankingArray[1] == 'Ranked Standard 3v3'){
						StandardRank = rankingArray[2];
						StandardDiv = rankingArray[3];
						StandardRating = rankingArray[4];
						StandardGames = rankingArray[5].replace(/ *\([^)]*\) */g, "");
						//StandardGames = StandardGames.substring(0, StandardGames.length-1);
						StandardStreak = 0;
						if(rankingArray.length == 7){
							StandardStreak = rankingArray[6];
							StandardStreak = StandardStreak.replace(/([a-z])([A-Z])/g, '$1 $2');
							StandardStreak = StandardStreak.replace(/:/g, ' ');
						}
						transaction.executeSql('UPDATE Rocket_League SET StandardRank = ?, StandardDivision = ?,StandardRating = ?,StandardGames = ?, StandardStreak = ? WHERE PlayerName = ? AND System = ?',[StandardRank, StandardDiv, StandardRating, StandardGames, StandardStreak, Username, System],nullHandler,errorHandler);
					}
					else if(rankingArray[1] == 'Ranked Solo Standard 3v3'){
						SoloStandardRank = rankingArray[2];
						SoloStandardDiv = rankingArray[3];
						SoloStandardRating = rankingArray[4];
						SoloStandardGames = rankingArray[5].replace(/ *\([^)]*\) */g, "");
						//SoloStandardGames = SoloStandardGames.substring(0, SoloStandardGames.length-1);
						SoloStandardStreak = 0;
						if(rankingArray.length == 7){
							SoloStandardStreak = rankingArray[6];
							SoloStandardStreak = SoloStandardStreak.replace(/([a-z])([A-Z])/g, '$1 $2');
							SoloStandardStreak = SoloStandardStreak.replace(/:/g, ' ');
						}
						transaction.executeSql('UPDATE Rocket_League SET SoloStandardRank = ?, SoloStandardDivision = ?,SoloStandardRating = ?,SoloStandardGames = ?, SoloStandardStreak = ? WHERE PlayerName = ? AND System = ?',[SoloStandardRank, SoloStandardDiv, SoloStandardRating, SoloStandardGames, SoloStandardStreak, Username, System],nullHandler,errorHandler);
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