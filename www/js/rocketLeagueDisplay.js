function displayRocketLeague(Username, System, Active){
	$("#statsPage").html("");
	$("#statsPageTitle").html("");
	$.mobile.pageContainer.pagecontainer('change', '#Page2', {
		transition: 'slide',
		reload    : false
	});
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
	
	if(Active == 0){
		$("#statsPage").append(
			"<div class='getStats'>" +
				"<a class='getStatsButton ui-btn ui-corner-all' onclick='sourceRocketLeague(\"" + Username + "\",\"" + System + "\")'>Get Stats</a>" +
			"</div>"
		);
	}

	else if(Active == 1){
		displayStatsRocketLeague(Username, System);
	}
	$("#statsPageTitle").trigger("create");
	$("#statsPage").trigger("create");
}

function displayStatsRocketLeague(Username, System){
	console.log('MOO!');
	//db = openDatabase(shortName, version, displayName,maxSize);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Score, Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			$("#statsPage").append(
				"<div class='performance'>" +
					"<h1>Score</h1> " +
					"<h3>" + result.rows.item(0).Score + "</h3>"+
				"</div>"
			);
		},errorHandler);
	});
	//$("#statsPage").trigger("create");
}