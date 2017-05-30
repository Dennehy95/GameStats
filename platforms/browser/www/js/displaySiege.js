function displayStatsSiege(Username, System, pageId){
	$(".updateButtonTextBottom").html("");
	$("#statsPageContent" + pageId).html("");
	console.log('getting stats');
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT KillsCasual, DeathsCasual, kdCasual, PlaytimeCasual, WinsCasual, LossesCasual, WinPercentCasual, levelCasual, KillsRanked, DeathsRanked, kdRanked, PlaytimeRanked, WinsRanked, LossesRanked, WinPercentRanked, levelRanked, Revives, Suicides, MeleeKills, AccuracyPercent, HeadshotPercent, Assist, PenetrationKills, Time FROM Siege WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
			$("#statsPageContent" + pageId).append(
				"<div class='Ranked'>" +
					"<div class='performanceRatings'>" +
						"<div class='offenseStats ui-grid-b '>" +
							"<div class='ui-block-a statsText'>Kills -<br>Deaths -</div>" +
							"<div class='ui-block-b statsText statsValue'>" +result.rows.item(0).KillsRanked + "<br>" + result.rows.item(0).DeathsRanked + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>KD<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).kdRanked +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='winStats ui-grid-b'>" +
							"<div class='ui-block-a statsText'>Wins -<br>Losses -</div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).WinsRanked + "<br>" +result.rows.item(0).LossesRanked + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Ratio<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).WinPercentRanked +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='supportStats ui-grid-a'>"+
							"<div class='ui-block-a statsText'>Time Played - <br></div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).PlaytimeRanked +"ours</div>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div class='Casual'>" +
					"<div class='performanceRatings'>" +
						"<div class='offenseStats ui-grid-b '>" +
							"<div class='ui-block-a statsText'>Kills -<br>Deaths -</div>" +
							"<div class='ui-block-b statsText statsValue'>" +result.rows.item(0).KillsCasual + "<br>" + result.rows.item(0).DeathsCasual + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>KD<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).kdCasual +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='winStats ui-grid-b'>" +
							"<div class='ui-block-a statsText'>Wins -<br>Losses -</div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).WinsCasual + "<br>" +result.rows.item(0).LossesCasual + "</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Ratio<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).WinPercentCasual +"%</div>"+
							"</div>" +
						"</div>" +
						"<div class='supportStats ui-grid-a'>"+
							"<div class='ui-block-a statsText'>Time Played - <br></div>" +
							"<div class='ui-block-b statsText statsValue'>" + result.rows.item(0).PlaytimeCasual +"ours</div>" +
						"</div>" +
					"</div>" +
				"</div>" + 
				"<div class='General'>" +
					"<div class='performanceRatings'>" +
						"<div class='offenseStats ui-grid-b '>" +
							"<div class='ui-block-a'>" +
								"<div class='statsText'>Revives<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).Revives +"</div>"+
							"</div>" +
							"<div class='ui-block-b'>" +
								"<div class='statsText'>Assists<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).Assist +"</div>"+
							"</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Melee Kills<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).MeleeKills +"</div>"+
							"</div>" +
						"</div>" +
						"<div class='offenseStats ui-grid-b '>" +
							"<div class='ui-block-a'>" +
								"<div class='statsText'>Penetration Kills<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).PenetrationKills +"</div>"+
							"</div>" +
							"<div class='ui-block-b'>" +
								"<div class='statsText'>Suicides<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).Suicides +"</div>"+
							"</div>" +
							"<div class='ui-block-c'>" +
								"<div class='statsText'>Headshots<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).HeadshotPercent +"</div>"+
							"</div>" +
						"</div>" +
						"<div class='offenseStats ui-grid-a '>" +
							"<div class='ui-block-a'>" +
								"<div class='statsText'>Accuracy<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).AccuracyPercent +"</div>"+
							"</div>" +
							"<div class='ui-block-b'>" +
								"<div class='statsText'>Clearance Level<br></div>" +
								"<div class='statsText statsValue'>" + result.rows.item(0).levelRanked +"</div>"+
							"</div>" +
						"</div>" +
					"</div>" +
				"</div>"
			);
		},errorHandler,nullHandler);
	},errorHandler);
}