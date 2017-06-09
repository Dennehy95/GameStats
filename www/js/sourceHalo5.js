function sourceHalo5(Username, System, pageId){
	/*var request;
	if (request) {
		request.abort();
	}*/
	//halo5Emblem(Username);
	halo5PSRArena(Username,System,pageId,'Arena');
	//halo5PSRCampaign(Username);
}

function halo5Emblem(Username){
	var request;
	if (request) {
		request.abort();
	}
	
	//request.done(function (response, textStatus, jqXHR){
	request.done(function(data) {
		alert("success");
		//console.log(data.Results.Id);
		//console.log(data.Results.Result);
	})
	request.fail(function() {
		alert("error");
	});
}

function halo5PSRArena(Username,System,pageId,Mode){
	var t0 = performance.now();
	
	var request;
	if (request) {
		request.abort();
	}
	console.log('all good');
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/sourceHalo5.py",
		type: "post",
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		},
		data: {
			Username : Username,
			Mode: Mode
		}
	});
	console.log('all good2');
	request.done(function (response, textStatus, jqXHR){
	//request.done(function(data) {
		//newData = jQuery.parseJSON(data)
		//console.log(data)
		console.log("success");
		str = response;
		var statsArray = str.split(' , ');
		console.log(statsArray);
		
		var date = new Date();
		var mins = ('0'+date.getMinutes()).slice(-2);
		var time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + mins;
		
		db.transaction(function(transaction){
			var date = new Date();
			var mins = ('0'+date.getMinutes()).slice(-2);
			var time = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " +  date.getHours() + ":" + mins;
			
			transaction.executeSql('UPDATE Halo_V SET Active = ?, TotalArenaAssassinations = ?, TotalArenaAssists = ?, TotalArenaDeaths = ?, TotalArenaGamesCompleted = ?, TotalArenaGamesLost = ?, TotalArenaGamesTied = ?, TotalArenaGamesWon = ?, TotalArenaGrenadeKills = ?,TotalArenaGroundPoundKills =?,TotalArenaHeadshots = ?, TotalArenaKills = ?, TotalArenaMeleeKills = ?, TotalArenaPowerWeaponKills = ?, TotalArenaShotsFired = ?, TotalArenaShotsLanded = ?, TotalArenaShoulderBashKills = ?, TotalArenaTimePlayed = ?, SpartanRank = ?, Time = ? WHERE PlayerName = ? AND System = ?',[1, statsArray[0], statsArray[1], statsArray[2], statsArray[3], statsArray[4], statsArray[5], statsArray[6], statsArray[7], statsArray[8], statsArray[9], statsArray[10], statsArray[11], statsArray[12], statsArray[13], statsArray[14], statsArray[15], statsArray[16], statsArray[17],time, Username, System],nullHandler,errorHandler);
			
		},errorHandler,nullHandler);
		displayStatsHalo5(Username, System, pageId)//re draw stats page
	})
	request.fail(function() {
		alert("error");
	});
}

function halo5PSRCampaign(Username){
	var request;
	if (request) {
		request.abort();
	}
	
	//request.done(function (response, textStatus, jqXHR){
	request.done(function(data) {
		console.log("success");
		console.log(data.Results[0].Id);
		console.log(data.Results[0].Result);
	})
	request.fail(function() {
		alert("error");
	});
}