function displayStatsHalo5(Username, System, pageId){
	//db = openDatabase(shortName, version, displayName,maxSize);
	//$("#statsPage").html("");
	//$("#statsPageTitle").html("");
	$(".updateButtonTextBottom").html("");
	$("#statsPageContent" + pageId).html("");
	//displayBasics(Username, System, "Rocket League");
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills,TotalArenaGroundPoundKills,TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Time FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
			/*
			$("#statsPageContent" + pageId).append(
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
			);*/
		},errorHandler,nullHandler);
	},errorHandler);
}
	//$("#statsPage").trigger("create");