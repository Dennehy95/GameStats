function displayStatsHalo5(Username, System, pageId){
	$("#statsPageContent" + pageId).html("");
	console.log(pageId);
	//var activeMode = 'Arena'
	
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT ActiveMode FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			activeMode = result.rows.item(0).ActiveMode;
			console.log(activeMode);
			$("#halo5ActiveMode").append(
				activeMode 
			);
			displayActiveModeStatsHalo5(Username, System, pageId, activeMode);
			
			$("#halo5ActiveModeLeft").attr("onclick","halo5ActiveModeChange('" + Username +"','" + System +"','" + pageId +"','left','" + activeMode +"')");
			$("#halo5ActiveModeRight").attr("onclick","halo5ActiveModeChange('" + Username +"','" + System +"','" + pageId +"','right','" + activeMode +"')");
		},errorHandler,nullHandler);
	},errorHandler);
	
	$("#statsPageContent" + pageId).append(
		"<div class='halo5ModeSelect'>" +
			"<div class='ui-grid-b'>" +
				"<div id='halo5ActiveModeLeft' class='ui-block-a halo5ModesNavLeft'>" +
					"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 52.502 52.502' style='enable-background:new 0 0 52.502 52.502;' xml:space='preserve' width='8vh' height='8vh' transform='translate(5) scale(1, -1)'>" +
					"<path style='fill:#4ac331;' d='M21.524,16.094V4.046L1.416,23.998l20.108,20.143V32.094c0,0,17.598-4.355,29.712,16 c0,0,3.02-15.536-10.51-26.794C40.727,21.299,34.735,15.696,21.524,16.094z'/>" +
					"<path style='fill:#4ac331;' d='M51.718,50.857l-1.341-2.252C40.163,31.441,25.976,32.402,22.524,32.925v13.634L0,23.995 L22.524,1.644v13.431c12.728-0.103,18.644,5.268,18.886,5.494c13.781,11.465,10.839,27.554,10.808,27.715L51.718,50.857z M25.645,30.702c5.761,0,16.344,1.938,24.854,14.376c0.128-4.873-0.896-15.094-10.41-23.01c-0.099-0.088-5.982-5.373-18.533-4.975 l-1.03,0.03V6.447L2.832,24.001l17.692,17.724V31.311l0.76-0.188C21.354,31.105,23.014,30.702,25.645,30.702z'/>" +
				"</div>" +
				"<div class='ui-block-b halo5ModesActive'>" +
					"<div id='halo5ActiveMode' class='halo5ActiveMode' ></div>" +
				"</div>" +
				"<div id='halo5ActiveModeRight' class='ui-block-c halo5ModesNavRight'>" +
					"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 52.502 52.502' style='enable-background:new 0 0 52.502 52.502;' xml:space='preserve' width='8vh' height='8vh' transform='translate(-5) scale(-1, -1)'>" +
					"<path style='fill:#4ac331;' d='M21.524,16.094V4.046L1.416,23.998l20.108,20.143V32.094c0,0,17.598-4.355,29.712,16 c0,0,3.02-15.536-10.51-26.794C40.727,21.299,34.735,15.696,21.524,16.094z'/>" +
					"<path style='fill:#4ac331;' d='M51.718,50.857l-1.341-2.252C40.163,31.441,25.976,32.402,22.524,32.925v13.634L0,23.995 L22.524,1.644v13.431c12.728-0.103,18.644,5.268,18.886,5.494c13.781,11.465,10.839,27.554,10.808,27.715L51.718,50.857z M25.645,30.702c5.761,0,16.344,1.938,24.854,14.376c0.128-4.873-0.896-15.094-10.41-23.01c-0.099-0.088-5.982-5.373-18.533-4.975 l-1.03,0.03V6.447L2.832,24.001l17.692,17.724V31.311l0.76-0.188C21.354,31.105,23.014,30.702,25.645,30.702z'/>" +
				"</div>" +
			"</div>" +
		"</div>"
	).children().last().trigger("create");
	
	
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills,TotalArenaGroundPoundKills,TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Time FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
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

function displayStatsHalo5WithTime(Username, System, pageId){
	$(".updateButtonTextBottom").html("");
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Time FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
		},errorHandler,nullHandler);
	},errorHandler);
	displayStatsHalo5(Username, System, pageId);

}
function displayActiveModeStatsHalo5(Username, System, pageId, activeMode){
	if(activeMode == 'Arena'){
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills,TotalArenaGroundPoundKills,TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Emblem, SpartanImage FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
			function(transaction, result) {
				console.log(result.rows.item(0));
				timePlayedNoFormat = result.rows.item(0).TotalArenaTimePlayed;
				Days = timePlayedNoFormat.substring(timePlayedNoFormat.lastIndexOf("P")+1,timePlayedNoFormat.lastIndexOf("D"));
				if(Days == 'P'){
					Days = ''
				}
				Hours = timePlayedNoFormat.substring(timePlayedNoFormat.lastIndexOf("T")+1,timePlayedNoFormat.lastIndexOf("H"));
				if(Hours == 'T'){
					Hours = ''
				}
				Minutes = timePlayedNoFormat.substring(timePlayedNoFormat.lastIndexOf("H")+1,timePlayedNoFormat.lastIndexOf("M"));
				if(Minutes == 'H'){
					Minutes = ''
				}
				if(Days == ''){
					if(Hours == ''){
						if(Minutes == ''){
							timePlayedFormatted = 'Not Even a Minute Played';
						}
						else{
							timePlayedFormatted = Minutes +' Minutes Played';
						}
					}
					else{
						timePlayedFormatted = Hours + ' Hours ' + Minutes +' Minutes Played';
					}
				}
				else{
					timePlayedFormatted = Days + ' Days ' + Hours + ' Hours ' + Minutes +' Minutes Played';
				}
				/*halo5GamesCompleted*/
				TotalGames = result.rows.item(0).TotalArenaGamesCompleted;
				Wins = result.rows.item(0).TotalArenaGamesWon;
				Losses = result.rows.item(0).TotalArenaGamesLost;
				Ties = result.rows.item(0).TotalArenaGamesTied;
				WinRatio = Wins/TotalGames *100;
				WinRatio = Math.round(WinRatio * 100) / 100;
				
				/*halo5KillsDeaths*/
				Kills = result.rows.item(0).TotalArenaKills;
				Deaths = result.rows.item(0).TotalArenaDeaths;
				Assists = result.rows.item(0).TotalArenaAssists;
				Assassinations = result.rows.item(0).TotalArenaAssassinations;
				KD = Kills/Deaths;
				KD = Math.round(KD * 100) / 100;
				KG = Kills/TotalGames;
				KG = Math.round(KG * 100) / 100;
				
				/*halo5KillTypes*/
				Grenade = result.rows.item(0).TotalArenaGrenadeKills;
				Headshots = result.rows.item(0).TotalArenaHeadshots;
				PowerWeapon = result.rows.item(0).TotalArenaPowerWeaponKills;
				Melee = result.rows.item(0).TotalArenaMeleeKills;
				ShoulderBash = result.rows.item(0).TotalArenaGroundPoundKills;
				GroundPound = result.rows.item(0).TotalArenaShoulderBashKills;
				
				/*halo5Accruacy*/
				Fired = result.rows.item(0).TotalArenaShotsFired;
				Landed = result.rows.item(0).TotalArenaShotsLanded;
				Accuracy = Fired/Landed;
				Accuracy = Math.round(Accuracy * 100) / 100;
				
				if(result.rows.item(0).SpartanImage !== 'None'){
					$("#statsPageContent" + pageId).prepend(
						"<div class='halo5BackgroundImage'>" +
						"</div>"
					);
					$(".halo5BackgroundImage").css('background-image', 'url("' + result.rows.item(0).SpartanImage + '")');
				}
				
				$("#statsPageContent" + pageId).append(
					"<div class='Halo5Stats'>" +
						"<h1 class='halo5TimePlayed Arena'>" + timePlayedFormatted + "</h1>" +
						"<div class='halo5GamesCompleted Arena ui-grid-a'>" +
							"<div class='ui-block-a '>Games Played<br>" + TotalGames + "</div>" +
							"<div class='ui-block-b '>Win Ratio<br>" + WinRatio + "%</div>" +
						"</div>" +
						"<div class='halo5GamesCompleted Arena ui-grid-b'>" +
							"<div class='ui-block-a '>Wins<br>" + Wins + "</div>" +
							"<div class='ui-block-b '>Ties<br>" + Ties + "</div>" +
							"<div class='ui-block-c '>Losses<br>" + Losses + "</div>" +
						"</div>" +
						"<div class='halo5KillsDeaths Arena ui-grid-b'>" +
							"<div class='ui-block-a '>Kills<br>" + Kills + "</div>" +
							"<div class='ui-block-b '>Deaths<br>" + Deaths + "</div>" +
							"<div class='ui-block-c '>Assists<br>" + Assists + "</div>" +
						"</div>" +
						"<div class='halo5KillsDeaths Arena ui-grid-a'>" +
							"<div class='ui-block-a '>K/D<br>" + KD + "</div>" +
							"<div class='ui-block-b '>Kills/Game<br>" + KG + "</div>" +
						"</div>" +
						"<div class='halo5KillTypes Arena ui-grid-b'>" +
							"<div class='ui-block-a '>Grenade Kills<br>" + Grenade + "</div>" +
							"<div class='ui-block-b '>Headshot Kills<br>" + Headshots + "</div>" +
							"<div class='ui-block-c '>Power Weapon Kills<br>" + PowerWeapon + "</div>" +
						"</div>" +
						"<div class='halo5KillTypes Arena ui-grid-b'>" +
							"<div class='ui-block-a '>Melee Kills<br>" + Melee + "</div>" +
							"<div class='ui-block-b '>Ground Pound Kills<br>" + ShoulderBash + "</div>" +
							"<div class='ui-block-c '>Shoulder Bash Kills<br>" + GroundPound + "</div>" +
						"</div>" +
						"<div class='halo5Accuracy Arena ui-grid-b'>" +
							"<div class='ui-block-a '>Shots Fired<br>" + Fired + "</div>" +
							"<div class='ui-block-b '>Shots Landed<br>" + Landed + "</div>" +
							"<div class='ui-block-c '>Accuracy<br>" + Accuracy + "</div>" +
						"</div>" +
						"<h1 class='halo5Rank Arena'>Spartan Rank - " + result.rows.item(0).SpartanRank + "</h1>" +
					"</div>"
				);
				
			},errorHandler,nullHandler);
		},errorHandler);
	}
	else if(activeMode == 'Campaign'){
		
	}
	else if(activeMode == 'Customs'){
		
	}
	else if(activeMode == 'Warzone'){
		
	}
}

function halo5ActiveModeChange(Username, System, pageId, Direction, activeMode){
	console.log('happening2');
	if(Direction == 'left'){
		if(activeMode == 'Arena'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Warzone', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else if(activeMode == 'Campaign'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Arena', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else if(activeMode == 'Customs'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Campaign', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else{
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Customs', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
	}
	else{
		console.log('here we go');
		if(activeMode == 'Arena'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Campaign', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else if(activeMode == 'Campaign'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Customs', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else if(activeMode == 'Customs'){
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Warzone', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
		else{
			db.transaction(function(transaction){
				transaction.executeSql('UPDATE Halo_V SET ActiveMode = ? WHERE PlayerName = ? AND System = ?',['Arena', Username, System],nullHandler,errorHandler);
				displayStatsHalo5(Username, System, pageId);
			},errorHandler,nullHandler);
		}
	}
}

/* Currently usused but possibly handy radio stuff
"<form>" +
				"<fieldset class='ui-grid-c' data-role='controlgroup' data-theme='b' data-type='horizontal' style='display: flex; width: 100%;'>" +
					"<div class='ui-block-a halo5Modes'>" +
						"<input type='radio' name='radio-choice-t-6' id='radio-choice-t-6a' value='Arena' checked='checked'>" +
						"<label for='radio-choice-t-6a' class='halo5Modes'>Arena</label>" +
					"</div>" +
					"<div class='ui-block-b halo5Modes'>" +
						"<input type='radio' name='radio-choice-t-6' id='radio-choice-t-6b' value='Campaign'>" +
						"<label for='radio-choice-t-6b' class='halo5Modes'>Campaign</label>" +
					"</div>" +
					"<div class='ui-block-c halo5Modes'>" +
						"<input type='radio' name='radio-choice-t-6' id='radio-choice-t-6c' value='Customs'>" +
						"<label for='radio-choice-t-6c' class='halo5Modes'>Customs</label>" +
					"</div>" +
					"<div class='ui-block-d halo5Modes'>" +
						"<input type='radio' name='radio-choice-t-6' id='radio-choice-t-6d' value='Warzone'>" +
						"<label for='radio-choice-t-6d' class='halo5Modes'>Warzone</label>" +
					"</div>" +
				"</fieldset>" +
			"</form>" +

*/