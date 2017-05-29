function displayStatsRocketLeague(Username, System){
	//db = openDatabase(shortName, version, displayName,maxSize);
	//$("#statsPage").html("");
	//$("#statsPageTitle").html("");
	$(".updateButtonTextBottom").html("");
	$("#statsPageContent").html("");
	//displayBasics(Username, System, "Rocket League");
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Ratio, Wins, Goals, Saves, Shots, Mvps, Assists, Mvpratio, Time FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
			$("#statsPageContent").append(
				/*"<div class='update'>" +
					"<h1 class='statsPageUpdate'>" +
						"<div class='statsPageUpdateText'>Last Updated: " + result.rows.item(0).Time + "</dic>" +
						"<a class='getUpdatedStats ui-btn ui-btn-right ui-corner-all' onclick='sourceRocketLeague(\"" + Username + "\",\"" + System + "\")'>Update</a>" +
					"</h1>" +
				"</div>" +*/
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
		},errorHandler,nullHandler);
		
		transaction.executeSql('SELECT DuelRank, DuelDivision, DuelRating, DuelGames, DuelStreak, DoublesRank, DoublesDivision, DoublesRating, DoublesGames, DoublesStreak, StandardRank, StandardDivision, StandardRating, StandardGames ,StandardStreak, SoloStandardRank, SoloStandardDivision, SoloStandardRating, SoloStandardGames, SoloStandardStreak FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			if(result.rows.item(0).DuelStreak != 0){
				DuelStreak = result.rows.item(0).DuelStreak
				if(DuelStreak.includes("Losing")){
					DuelStreakAppend = "<div class='RanksRedTextRL'>"+ DuelStreak + "</div>"
				}
				else{
					DuelStreakAppend = "<div class='RanksGreenTextRL'>"+ DuelStreak + "</div>"
				}
			}
			else{
				DuelStreak = '';
				DuelStreakAppend = "<div>"+ DuelStreak + "</div>"
			}
			if(result.rows.item(0).DoublesStreak != 0){
				DoublesStreak = result.rows.item(0).DoublesStreak
				if(DoublesStreak.includes("Losing")){
					DoublesStreakAppend = "<div class='RanksRedTextRL'>"+ DoublesStreak + "</div>"
				}
				else{
					DoublesStreakAppend = "<div class='RanksGreenTextRL'>"+ DoublesStreak + "</div>"
				}
			}
			else{
				DoublesStreak = '';
				DoublesStreakAppend = "<div>"+ DoublesStreak + "</div>"
			}
			if(result.rows.item(0).StandardStreak != 0){
				StandardStreak = result.rows.item(0).StandardStreak
				if(StandardStreak.includes("Losing")){
					StandardStreakAppend = "<div class='RanksRedTextRL'>"+ StandardStreak + "</div>"
				}
				else{
					StandardStreakAppend = "<div class='RanksGreenTextRL'>"+ StandardStreak + "</div>"
				}
			}
			else{
				StandardStreak = '';
				StandardStreakAppend = "<div>"+ StandardStreak + "</div>"
			}
			if(result.rows.item(0).SoloStandardStreak != 0){
				SoloStandardStreak = result.rows.item(0).SoloStandardStreak
				if(SoloStandardStreak.includes("Losing")){
					SoloStandardStreakAppend = "<div class='RanksRedTextRL'>"+ SoloStandardStreak + "</div>"
				}
				else{
					SoloStandardStreakAppend = "<div class='RanksGreenTextRL'>"+ SoloStandardStreak + "</div>"
				}
			}
			else{
				SoloStandardStreak = '';
				SoloStandardStreakAppend = "<div>"+ SoloStandardStreak + "</div>"
			}
			$("#statsPageContent").append(
				"<div class='rankings'>" +
					"<div class='RanksRL ui-grid-c'>" +
						"<div class='ui-block-a statsText'><img class='RankImageRL' src='img/" + result.rows.item(0).DuelRank +".png'</img></div>" +
						"<div class='ui-block-b statsText'>"+ 
							"<div class='RanksGoldTextRL'>Duel<br></div>" +
							"<div class='RanksBlueTextRL'>" + result.rows.item(0).DuelRank +"<br></div>" +
							"<div class='RanksWhiteTextRL'>" + result.rows.item(0).DuelDivision +"<br></div>" +
						"</div>" +
						"<div class='ui-block-c statsText'>" +
							"<div class='RanksBlueTextRL'>Rating<br></div>" +
							"<div>" + result.rows.item(0).DuelRating +"<br></div>" +
						"</div>" +
						"<div class='ui-block-d statsText'>" + 
							"<div class='RanksBlueTextRL'>Games<br></div>" +
							"<div>" + result.rows.item(0).DuelGames +"<br></div>" +
							DuelStreakAppend +
						"</div>" +
					"</div>" +
					"<div class='RanksRL ui-grid-c'>" +
						"<div class='ui-block-a statsText'><img class='RankImageRL' src='img/" + result.rows.item(0).DoublesRank +".png'</img></div>" +
						"<div class='ui-block-b statsText'>"+ 
							"<div class='RanksGoldTextRL'>Doubles<br></div>" +
							"<div class='RanksBlueTextRL'>" + result.rows.item(0).DoublesRank +"<br></div>" +
							"<div class='RanksWhiteTextRL'>" + result.rows.item(0).DoublesDivision +"<br></div>" +
						"</div>" +
						"<div class='ui-block-c statsText'>" +
							"<div class='RanksBlueTextRL'>Rating<br></div>" +
							"<div>" + result.rows.item(0).DoublesRating +"<br></div>" +
						"</div>" +
						"<div class='ui-block-d statsText'>" +
							"<div class='RanksBlueTextRL'>Games<br></div>" +
							"<div>" + result.rows.item(0).DoublesGames +"<br></div>" +
							DoublesStreakAppend +
						"</div>" +
						//result.rows.item(0).DoublesGames + "<br>" + DoublesStreak +"</div>" +
					"</div>" +
					"<div class='RanksRL ui-grid-c'>" +
						"<div class='ui-block-a statsText'><img class='RankImageRL' src='img/" + result.rows.item(0).StandardRank +".png'</img></div>" +
						"<div class='ui-block-b statsText'>"+ 
							"<div class='RanksGoldTextRL'>Standard<br></div>" +
							"<div class='RanksBlueTextRL'>" + result.rows.item(0).StandardRank +"<br></div>" +
							"<div class='RanksWhiteTextRL'>" + result.rows.item(0).StandardDivision +"<br></div>" +
						"</div>" +
						"<div class='ui-block-c statsText'>" +
							"<div class='RanksBlueTextRL'>Rating<br></div>" +
							"<div>" + result.rows.item(0).StandardRating +"<br></div>" +
						"</div>" +
						"<div class='ui-block-d statsText'>" +
							"<div class='RanksBlueTextRL'>Games<br></div>" +
							"<div>" + result.rows.item(0).StandardGames +"<br></div>" +
							StandardStreakAppend +
						"</div>" +
					"</div>" +
					"<div class='RanksRL ui-grid-c'>" +
						"<div class='ui-block-a statsText'><img class='RankImageRL' src='img/" + result.rows.item(0).SoloStandardRank +".png'</img></div>" +
						"<div class='ui-block-b statsText'>"+ 
							"<div class='RanksGoldTextRL'>Solo Standard<br></div>" +
							"<div class='RanksBlueTextRL'>" + result.rows.item(0).SoloStandardRank +"<br></div>" +
							"<div class='RanksWhiteTextRL'>" + result.rows.item(0).SoloStandardDivision +"<br></div>" +
						"</div>" +
						"<div class='ui-block-c statsText'>" +
							"<div class='RanksBlueTextRL'>Rating<br></div>" +
							"<div>" + result.rows.item(0).SoloStandardRating +"<br></div>" +
						"</div>" +
						"<div class='ui-block-d statsText'>" +
							"<div class='RanksBlueTextRL'>Games<br></div>" +
							"<div>" + result.rows.item(0).SoloStandardGames +"<br></div>" +
							SoloStandardStreakAppend +
						"</div>" +
					"</div>" +
				"</div>"
			);
		},errorHandler,nullHandler);
	},errorHandler);
}
	//$("#statsPage").trigger("create");