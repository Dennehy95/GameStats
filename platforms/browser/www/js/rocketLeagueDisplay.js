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
	$("#statsPage").html("");
	displayBasics(Username, System);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio, Time FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			$("#statsPage").append(
				"<div class='update'>" +
					"<h1 class='statsPageUpdate'>" +
						"<div class='statsPageUpdateText'>Last Updated: " + result.rows.item(0).Time + "</dic>" +
						"<a class='getUpdatedStats ui-btn ui-btn-right ui-corner-all' onclick='sourceRocketLeague(\"" + Username + "\",\"" + System + "\")'>Update</a>" +
					"</h1>" +
				"</div>" +
				/*"<div data-role='header'>" +
					"<h1 class='statsPageUpdate'>Accurate as of: </h1>" +
					"<a data-role='button' data-icon='refresh' data-iconshadow='false' onclick='' class='ui-btn-right'>Update</a>" +
				"</div>" +*/
				"<div class='performance'>" +
					"<div class='performanceRatings ui-grid-b'>" +
						"<div class='offenseStats ui-grid-b '>" +
							"<div class='ui-block-a statsText'>Goals -<br>Shots -</div>" +
							"<div class='ui-block-b statsText statsValue'>" +result.rows.item(0).Shots + "<br>" + result.rows.item(0).Goals + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Ratio<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).Ratio +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='winStats ui-grid-b'>" +
							"<div class='ui-block-a statsText'>Wins -<br>MVPs -</div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).Wins + "<br>" +result.rows.item(0).Mvps + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Ratio<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).Mvpratio +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='supportStats ui-grid-a'>"+
							"<div class='ui-block-a statsText'>Saves - <br>Assists - <br></div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).Saves + "<br>" + result.rows.item(0).Assists + "</div>" +
						"</div>" +
					"</div>" +
				"</div>"
			);
			
			$("#statsPage").append(
				"<div class='rankings'>" +
					
				"</div>"
				);
		},errorHandler);
	});
	//$("#statsPage").trigger("create");
}