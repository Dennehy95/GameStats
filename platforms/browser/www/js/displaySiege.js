function displaySiege(Username, System){
	console.log('clearing');
	$("#statsPage").html("");
	$("#statsPageTitle").html("");
	$.mobile.pageContainer.pagecontainer('change', '#Page2', {
		transition: 'slide',
		reload    : false
	});
	console.log('basics');
	displayBasics(Username, System, "Rainbow Six Siege");
	console.log('basics done');
	db.transaction(function(transaction){
		transaction.executeSql('SELECT Active FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.item(0).Active == 0){
				$("#statsPage").append(
					"<div class='getStats'>" +
						"<a class='getStatsButton ui-btn ui-corner-all' onclick='sourceSiege(\"" + Username + "\",\"" + System + "\")'>Get Stats</a>" +
					"</div>"
				);
			}
			else if(result.rows.item(0).Active == 1){
				displayStatsSiege(Username, System);
			}
		});
	},errorHandler,nullHandler);
	$("#statsPageTitle").trigger("create");
	$("#statsPage").trigger("create");
}

function displayStatsSiege(Username, System){
	console.log('getting stats');
}