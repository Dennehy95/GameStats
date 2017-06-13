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
			console.log('happening');
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
function displayArenaStatsHalo5(Username, System, pageId){
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT TotalArenaAssassinations, TotalArenaAssists, TotalArenaDeaths, TotalArenaGamesCompleted, TotalArenaGamesLost, TotalArenaGamesTied, TotalArenaGamesWon, TotalArenaGrenadeKills,TotalArenaGroundPoundKills,TotalArenaHeadshots, TotalArenaKills, TotalArenaMeleeKills, TotalArenaPowerWeaponKills, TotalArenaShotsFired, TotalArenaShotsLanded, TotalArenaShoulderBashKills, TotalArenaTimePlayed, SpartanRank, Time FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + System +'";', [],
		function(transaction, result) {
			console.log(result.rows.item(0));
			$(".updateButtonTextBottom").append(
				"Updated: " + result.rows.item(0).Time + ""
			);
		},errorHandler,nullHandler);
	},errorHandler);
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