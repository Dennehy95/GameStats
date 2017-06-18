function displayStatsSiege(Username, System, pageId){
	$(".updateButtonTextBottom").html("");
	$("#statsPageContent" + pageId).html("");
	console.log('getting stats');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT KillsCasual, DeathsCasual, kdCasual, PlaytimeCasual, WinsCasual, LossesCasual, WinPercentCasual, levelCasual, KillsRanked, DeathsRanked, kdRanked, PlaytimeRanked, WinsRanked, LossesRanked, WinPercentRanked, levelRanked, Revives, Suicides, MeleeKills, AccuracyPercent, Headshots, HeadshotPercent, Assists, PenetrationKills, Time FROM Siege WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
			
			KillsCasual = result.rows.item(0).KillsCasual;
			DeathsCasual = result.rows.item(0).DeathsCasual;
			kdCasual = result.rows.item(0).kdCasual;
			PlaytimeCasual = result.rows.item(0).PlaytimeCasual;
			PlaytimeCasualFormatted = timePlayedFormatter(parseInt(PlaytimeCasual));
			WinsCasual = result.rows.item(0).WinsCasual;
			LossesCasual = result.rows.item(0).LossesCasual;
			WinPercentCasual = result.rows.item(0).WinPercentCasual;
			
			KillsRanked = result.rows.item(0).KillsRanked;
			DeathsRanked = result.rows.item(0).DeathsRanked;
			kdRanked = result.rows.item(0).kdRanked;
			PlaytimeRanked = result.rows.item(0).PlaytimeRanked;
			PlaytimeRankedFormatted = timePlayedFormatter(parseInt(PlaytimeRanked));
			WinsRanked = result.rows.item(0).WinsRanked;
			LossesRanked = result.rows.item(0).LossesRanked;
			WinPercentRanked = result.rows.item(0).WinPercentRanked;
			levelRanked = result.rows.item(0).levelRanked;
			
			Revives = result.rows.item(0).Revives;
			Suicides = result.rows.item(0).Suicides;
			MeleeKills = result.rows.item(0).MeleeKills;
			AccuracyPercent = result.rows.item(0).AccuracyPercent;
			Headshots = result.rows.item(0).Headshots;
			HeadshotPercent = result.rows.item(0).HeadshotPercent;
			Assists = result.rows.item(0).Assists;
			PenetrationKills = result.rows.item(0).PenetrationKills;
						
			$("#statsPageContent" + pageId).append(
				"<div class='SiegeStats'>" +
					"<div class = 'siegeStatsModeHeaderText'>Ranked<br></div>" +
					"<div class='siegeStatsRanked'>" +
						"<div class = 'siegeStatsHeaderText'>Time Played<br></div>" +
						"<div class = 'halo5StatsInnerText'>" + PlaytimeRankedFormatted + "<br></div>" +
						"<div class='winsLossesSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Wins<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + WinsRanked + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Losses<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + LossesRanked + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>Win Percent<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + WinPercentRanked + "<br></div>" + 
							"</div>" +
						"</div>" +
						"<div class='siegeStatsRanked killsDeathsSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Kills<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + KillsRanked + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Deaths<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + DeathsRanked + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>K/D<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + kdRanked + "<br></div>" + 
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class = 'siegeStatsModeHeaderText'>Casual<br></div>" +
					"<div class='siegeStatsCasual'>" +
						"<div class = 'siegeStatsHeaderText'>Time Played<br></div>" +
						"<div class = 'halo5StatsInnerText'>" + PlaytimeCasualFormatted + "<br></div>" +
						"<div class='winsLossesSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Wins<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + WinsCasual + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Losses<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + LossesCasual + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>Win Percent<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + WinPercentCasual + "<br></div>" + 
							"</div>" +
						"</div>" +
						"<div class='siegeStatsCasual killsDeathsSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Kills<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + KillsCasual + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Deaths<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + DeathsCasual + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>K/D<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + kdCasual + "<br></div>" + 
							"</div>" +
						"</div>" +
					"</div>" + 
					"<div class = 'siegeStatsModeHeaderText'>General<br></div>" +
					"<div class='siegeStatsGeneral'>" +
						"<div class = 'siegeStatsHeaderText'>Clearance Level<br></div>" +
						"<div class = 'halo5StatsInnerText'>" + levelRanked + "<br></div>" +
						"<div class='supportSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Revives<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + Revives + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Assists<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + Assists + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>Suicides<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + Suicides + "<br></div>" + 
							"</div>" +
						"</div>" +
						"<div class='supportSiege ui-grid-b'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Melee Kills<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + MeleeKills + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Penetration Kills<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + PenetrationKills + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-c'>" + 
								"<div class = 'siegeStatsHeaderText'>Accuracy<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + AccuracyPercent + "<br></div>" + 
							"</div>" +
						"</div>" +
						"<div class='siegeStatsGeneral headshotsSiege ui-grid-a'>" +
							"<div class='statColumns ui-block-a'>" + 
								"<div class = 'siegeStatsHeaderText'>Headshots<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + Headshots + "<br></div>" + 
							"</div>" +
							"<div class='statColumns ui-block-b'>" + 
								"<div class = 'siegeStatsHeaderText'>Headshot Percent<br></div>" +
								"<div class = 'halo5StatsInnerText'>" + HeadshotPercent + "<br></div>" + 
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>"
			);
		},errorHandler,nullHandler);
	},errorHandler);
}