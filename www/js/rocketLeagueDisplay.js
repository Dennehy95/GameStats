function displayBasics(Username, System){
	$("#statsPageTitle").append(
		"<h1 id='gameTitle' class='headerTitle ui-title' role='heading'>Rocket League</h1>"
	);
	if(System == 'psn'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo psn'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'steam'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo steam'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'xbox'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo xbox'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
}

function displayRocketLeague(Username, System){
	$("#statsPage").html("");
	$("#statsPageTitle").html("");
	$.mobile.pageContainer.pagecontainer('change', '#Page2', {
		transition: 'slide',
		reload    : false
	});
	
	displayBasics(Username, System);
	
	db.transaction(function(transaction){
		transaction.executeSql('SELECT Active FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.item(0).Active == 0){
				$("#statsPage").append(
					"<div class='getStats'>" +
						"<a class='getStatsButton ui-btn ui-corner-all' onclick='sourceRocketLeague(\"" + Username + "\",\"" + System + "\")'>Get Stats</a>" +
					"</div>"
				);
			}
			else if(result.rows.item(0).Active == 1){
				displayStatsRocketLeague(Username, System);
			}
		});
	},errorHandler,nullHandler);
	$("#statsPageTitle").trigger("create");
	$("#statsPage").trigger("create");
}

function displayStatsRocketLeague(Username, System){
	//db = openDatabase(shortName, version, displayName,maxSize);
	console.log('here2');
	$("#statsPage").html("");
	displayBasics(Username, System);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			$("#statsPage").append(
				"<div class='performance'>" +
					"<div class='ui-grid-b'>" +
						"<div class='offenseStats ui-block-a'>" +
							"<p class='statsText'>Goals: " + result.rows.item(0).Goals + "</p>" +
							"<p class='statsText'>Shots: " + result.rows.item(0).Shots + "</p>" +
							"<p class='statsText'>Ratio: " + result.rows.item(0).Ratio + "%</p>" +
						"</div>" +
						"<div class='winStats ui-block-b'>" +
						
						"</div>" +
						"<div class='supportStats ui-block-c'>"+
							
						"</div>" +
					"</div>" +
				"</div>" +
				"<div class='rankings'>" +
					"<h1>Rank</h1> " +
				"</div>"
			);
		},errorHandler);
	});
	//$("#statsPage").trigger("create");
}