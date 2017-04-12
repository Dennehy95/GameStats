function getLinkedIds() {
	var db;
	var shortName = 'GameStatsDB';
	var version = '1.0';
	var displayName = 'GameStatsDB';
	var maxSize = 65535;
		
	db = openDatabase(shortName, version, displayName,maxSize);
	
	db.transaction(function(transaction){
		transaction.executeSql('SELECT Username FROM Users WHERE System = "PSN";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#linkedPSN").append(
						"<div data-theme='b' data-role='collapsible' >" +
							"<h3>" +
								"<div>" + row.Username + "</div>" +
							"</h3>" +
							"<ul id='psn" + row.Username + "'data-role='listview'>"
					);
					$('#psn' + row.Username).append(
								"<li>" +
									"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''></a>" +
								"</li>").children().last().trigger("create");		
					$("#linkedPSN").append(
							"</ul>" +
						"</div>"
					);
					$("#linkedPSN").trigger("create");
				}
			}
		},errorHandler);
			
		transaction.executeSql('SELECT Username FROM Users WHERE System = "Steam";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#linkedSteam").append(
						"<div data-theme='b' data-role='collapsible' >" +
							"<h3>" +
								"<div>" + row.Username + "</div>" +
							"</h3>" +
							"<ul id='steam" + row.Username + "'data-role='listview'>"
					);
					$('#steam' + row.Username).append(
								"<li>" +
									"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''></a>" +
								"</li>").children().last().trigger("create");		
					$("#linkedSteam").append(
							"</ul>" +
						"</div>"
					);
					$("#linkedSteam").trigger("create");
				}
			}
		},errorHandler);
			
		transaction.executeSql('SELECT Username FROM Users WHERE System = "Xbox";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#linkedXbox").append(
						"<div data-theme='b' data-role='collapsible' >" +
							"<h3>" +
								"<div>" + row.Username + "</div>" +
							"</h3>" +
							"<ul id='xbox" + row.Username + "'data-role='listview'>"
					);
					$('#xbox' + row.Username).append(
								"<li>" +
									"<a class='ui-btn ui-icon-carat-r ui-btn-icon-right' onclick=''></a>" +
								"</li>").children().last().trigger("create");		
					$("#linkedXbox").append(
							"</ul>" +
						"</div>"
					);
					$("#linkedXbox").trigger("create");
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
}
				

