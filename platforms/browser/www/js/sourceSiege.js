function sourceSiege(Username, System, pageId){
	
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
		
		var statsArray = str.split(' , ');
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
			
			//KillsCasual, DeathsCasual, kdCasual, PlaytimeCasual, WinsCasual, LossesCasual, WinPercentCasual, levelCasual, KillsRanked, DeathsRanked, kdRanked, PlaytimeRanked, WinsRanked, LossesRanked, WinPercentRanked, levelRanked, Revives, Suicides, MeleeKills, AccuracyPercent, HeadshotPercent, Assist, PenetrationKills, Time
			transaction.executeSql('UPDATE Siege SET Active = ?, KillsCasual = ?, DeathsCasual = ?, kdCasual = ?, PlaytimeCasual = ?, WinsCasual = ?, LossesCasual = ?, WinPercentCasual = ?, levelCasual = ?, KillsRanked = ?, DeathsRanked = ?, kdRanked = ?, PlaytimeRanked = ?, WinsRanked = ?, LossesRanked = ?, WinPercentRanked = ?, levelRanked = ?,Revives = ?, Suicides = ?, MeleeKills = ?, AccuracyPercent = ?, Headshots = ?, HeadshotPercent = ?, Assists = ?, PenetrationKills = ?,Time =? WHERE PlayerName = ? AND System = ?',[1, statsArray[0], statsArray[1], statsArray[2], statsArray[3], statsArray[4], statsArray[5], statsArray[6], statsArray[7], statsArray[8], statsArray[9], statsArray[10], statsArray[11], statsArray[12], statsArray[13], statsArray[14], statsArray[15], statsArray[16], statsArray[17], statsArray[18], statsArray[19], statsArray[20], statsArray[21], statsArray[22], statsArray[23],time, Username, System],nullHandler,errorHandler);
		},errorHandler,nullHandler);
		
		displayStatsSiege(Username, System, pageId)//re draw stats page
	});
	
	//killsCasual,',',deathsCasual,',',kdCasual,',',playtimeCasual,',',winsCasual,',',lossesCasual,',',winPercentCasual,',',levelCasual,',',killsRanked,',',deathsRanked,',',kdRanked,',',playtimeRanked,',',winsRanked,',',lossesRanked,',',winPercentRanked,',',levelRanked,',',revives,',',suicides,',',meleeKills,',',accuracyPercent,',',headshots,',',headshotPercent,',',assists,',',penetrationKills
	
	// Callback handler that will be called on failure
	request.fail(function (jqXHR, textStatus, errorThrown){
		// Log the error to the console
		console.error(
			"The following error occurred: "+
			textStatus, errorThrown
		);
	});
}