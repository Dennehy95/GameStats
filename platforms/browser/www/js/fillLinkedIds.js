function fillListOfGames(UserId, Username, System){
	/*$("#" + System + UserId).html("");
	//Check if User has recorded availability for each game
	db = openDatabase(shortName, version, displayName,maxSize);
	db.transaction(function(transaction){
		transaction.executeSql('SELECT Active FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.length == 1){
				$('#' + System + UserId).prepend(
					"<li>" +
						"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displayRocketLeague(\"" + Username + "\",\"" + System + "\")'>Rocket League</a>" +
					"</li>"
				).children().last().trigger("create");
			}
			console.log('done.');
		},errorHandler);
		
		transaction.executeSql('SELECT Active FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.length == 1){
				$('#' + System + UserId).prepend(
					"<li>" +
						"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displaySiege(\"" + Username + "\",\"" + System + "\")'>Rainbow Six Siege</a>" +
					"</li>"
				).children().last().trigger("create");
			}
		},errorHandler);
		var count = $("#" + System + UserId +" li").length;
		if(count == 0){
			$('#' + System + UserId).append(
				"<li>" +
					"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='updateListOfGames(\"" + UserId + "\",\"" + Username +"\",\"" + System + "\")'>Search For Games</a>" +
				"</li>"
			).children().last().trigger("create");
		}
		else{
			$('#' + System + UserId).append(
				"<li>" +
					"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='updateListOfGames(\"" + UserId + "\",\"" + Username +"\",\"" + System + "\")'>Search For More Games</a>" +
				"</li>"
			).children().last().trigger("create");
		}
		
	},errorHandler,nullHandler);*/
}

function updateListOfGames(UserId, Username, System){
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
		var rocketLeagueAvailable = availability[0]
		var siegeAvailable = availability[1]
		var siegeAvailable = siegeAvailable.substring(0, siegeAvailable.length-1); //Due to having an extra character appended
		if(rocketLeagueAvailable == 'Available'){	//So add game
		/*	$('#' + System + UserId).append(
				"<li>" +
					"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''>Rocket League</a>" +
				"</li>").children().last().trigger("create");
		}
		*/
			db.transaction(function(transaction){
				transaction.executeSql('SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Active, Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio, DuelRank, DuelDivision, DuelRating, DuelGames, DuelStreak, DoublesRank, DoublesDivision, DoublesRating, DoublesGames, DoublesStreak, StandardRank, StandardDivision, StandardRating, StandardGames ,StandardStreak, SoloStandardRank, SoloStandardDivision, SoloStandardRating, SoloStandardGames, SoloStandardStreak, Time)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[Username, System, 0, 0.0, 0, 0, 0, 0, 0, 0, 0.0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'Unranked','No Division',0,0,0,'0000/00/00 00:00'],nullHandler,errorHandler);
					}
				},errorHandler);
			},errorHandler,nullHandler);
		}
		if(siegeAvailable == 'Available'){
			db.transaction(function(transaction){
				transaction.executeSql('SELECT PlayerName FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
				function(transaction, result) {
					if(result.rows.length == 0){
						console.log('adding');
						transaction.executeSql('INSERT INTO Siege(PlayerName, System, Active, Time)VALUES (?,?,?,?)',[Username, System, 0,'0000/00/00 00:00'],nullHandler,errorHandler);
					}
				},errorHandler);
			},errorHandler,nullHandler);
		}
		else{
			console.log('nosiege');
		}
		console.log('done?');
		fillListOfGames(UserId, Username, System);
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

function getLinkedIds() {
	db = openDatabase(shortName, version, displayName,maxSize);
	$("#linkedPSN").html("");
	$("#linkedSteam").html("");
	$("#linkedXbox").html("");
	db.transaction(function(transaction){
		transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "psn";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				if(result.rows.length == 0){
					/*$("#linkedPSN").append(
						"<h3 class='noIdsTitle'>" +
							"<div>No Linked Ids</div>" +
						"</h3>"
					);*/
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
					
						var row = result.rows.item(i);
						$("#linkedPSN").append(
							"<h3 class='usernameListTitle psn'>" +
								"<div class='usernameList' onclick='displayStats(\"" + 'psn' + "\",\"" + row.Username + "\")'>" + row.Username + "</div>" +
							"</h3>"
							//"<ul id='psn" + row.UserId + "'data-role='listview' class='gamelistview'>"
						);
						//fillListOfGames(row.UserId, row.Username, "psn");					
						//$("#linkedPSN").append(
							//"</ul>"
						//);
						$("#linkedPSN").trigger("create");
					}
				}
			}
			else{
				/*("#linkedPSN").append(
					"<div data-theme='b' data-role='collapsible' >" +
						"<h3 class='noIdsTitle'>" +
							"<div></div>" +
						"</h3>" +
					"</div>"
				);*/
			}
		},errorHandler);
			
		transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "steam";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				if(result.rows.length == 0){
					/*$("#linkedSteam").append(
						"<h3 class='noIdsTitle'>" +
							"<div>No Linked Ids</div>" +
						"</h3>"
					);*/
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						str = row.Username
						Id = str.substring(0,str.indexOf("/"));
						Username = str.substring(str.indexOf("/")+1,str.length);
						$("#linkedSteam").append(
							"<h3 class='usernameListTitle steam'>" +
								"<div class='usernameList' onclick='displayStats(\"" + 'steam' + "\",\"" + row.Username + "\")'>" + Username + "</div>" +
							"</h3>"
						);
						$("#linkedSteam").trigger("create");
					}
				}
			}
			else{
				/*("#linkedSteam").append(
					"<h3 class='noIdsTitle'>" +
						"<div></div>" +
					"</h3>"
				);*/
			}
		},errorHandler);
			
		transaction.executeSql('SELECT UserId,Username FROM Users WHERE System = "xbox";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				if(result.rows.length == 0){
					/*$("#linkedXbox").append(
						"<h1 class='noIdsTitle'></h1>"
					);*/
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						$("#linkedXbox").append(
							"<h3 class='usernameListTitle xbox'>" +
								"<div class='usernameList' onclick='displayStats(\"" + 'xbox' + "\",\"" + row.Username + "\")'>" + row.Username + "</div>" +
							"</h3>" +
							"<ul id='xbox" + row.UserId + "'data-role='listview' class='gamelistview'>"
						);
						//fillListOfGames(row.UserId, row.Username, "xbox");
						$("#linkedXbox").append(
							"</ul>"
						);
						$("#linkedXbox").trigger("create");
					}
				}
			}
			else{
				/*("#linkedXbox").append(
					"<h3 class='noIdsTitle'>" +
						"<div></div>" +
					"</h3>"
				);*/
			}
		},errorHandler);
	},errorHandler,nullHandler);
}
				

