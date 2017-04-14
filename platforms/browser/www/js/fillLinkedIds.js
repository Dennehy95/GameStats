function fillListOfGames(UserId, Username, System){
	$("#" + System + UserId).html("");
	//Check if User has recorded availability for each game
	db = openDatabase(shortName, version, displayName,maxSize);
	db.transaction(function(transaction){
		transaction.executeSql('SELECT PlayerName FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.length == 1){
				console.log('found');
				$('#' + System + UserId).prepend(
					"<li>" +
						"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displayRocketLeague(\"" + Username + "\",\"" + System + "\")'>Rocket League</a>" +
					"</li>"
				).children().last().trigger("create");
			}
		},errorHandler);
	},errorHandler,nullHandler);
	
	$('#' + System + UserId).append(
		"<li>" +
			"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='updateListOfGames(\"" + UserId + "\",\"" + Username +"\",\"" + System + "\")'>Search For More Games</a>" +
		"</li>"
	).children().last().trigger("create");	
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
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/checkGames.py",
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
		if(newStr == 'Available'){	//So add game
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
						transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Active)VALUES (?,?,?)',[Username, System, 0],nullHandler,errorHandler);
					}
				},errorHandler);
			},errorHandler,nullHandler);
		}
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
					$("#linkedPSN").append(
						"<div data-theme='b' data-role='collapsible'>" +
							"<h3>" +
								"<div>No Linked Ids</div>" +
							"</h3>" +
						"</div>"
					);
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
					
						var row = result.rows.item(i);
						$("#linkedPSN").append(
							"<div data-theme='b' data-role='collapsible' >" +
								"<h3>" +
									"<div>" + row.Username + "</div>" +
								"</h3>" +
								"<ul id='psn" + row.UserId + "'data-role='listview'>"
						);
						fillListOfGames(row.UserId, row.Username, "psn");					
						$("#linkedPSN").append(
								"</ul>" +
							"</div>"
						);
						$("#linkedPSN").trigger("create");
					}
				}
			}
			else{
				("#linkedPSN").append(
					"<h3>" +
						"<div>No Linked Ids</div>" +
					"</h3>"
				);
			}
		},errorHandler);
			
		transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "steam";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				if(result.rows.length == 0){
					$("#linkedSteam").append(
						"<div data-theme='b' data-role='collapsible'>" +
							"<h3>" +
								"<div>No Linked Ids</div>" +
							"</h3>" +
						"</div>"
					);
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						$("#linkedSteam").append(
							"<div data-theme='b' data-role='collapsible' >" +
								"<h3>" +
									"<div>" + row.Username + "</div>" +
								"</h3>" +
								"<ul id='steam" + row.UserId + "'data-role='listview'>"
						);
						fillListOfGames(row.UserId, row.Username, "steam");						
						$("#linkedSteam").append(
								"</ul>" +
							"</div>"
						);
						$("#linkedSteam").trigger("create");
					}
				}
			}
		},errorHandler);
			
		transaction.executeSql('SELECT UserId,Username FROM Users WHERE System = "xbox";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				if(result.rows.length == 0){
					$("#linkedXbox").append(
						"<div data-theme='b' data-role='collapsible'>" +
							"<h3>" +
								"<div>No Linked Ids</div>" +
							"</h3>" +
						"</div>"
					);
				}
				else{
					for (var i = 0; i < result.rows.length; i++) {
						var row = result.rows.item(i);
						$("#linkedXbox").append(
							"<div data-theme='b' data-role='collapsible' >" +
								"<h3>" +
									"<div>" + row.Username + "</div>" +
								"</h3>" +
								"<ul id='xbox" + row.UserId + "'data-role='listview'>"
						);
						fillListOfGames(row.UserId, row.Username, "xbox");
						$("#linkedXbox").append(
								"</ul>" +
							"</div>"
						);
						$("#linkedXbox").trigger("create");
					}
				}
			}
			else{
				("#linkedXbox").append(
					"<h3>" +
						"<div>No Linked Ids</div>" +
					"</h3>"
				);
			}
		},errorHandler);
	},errorHandler,nullHandler);
}
				

