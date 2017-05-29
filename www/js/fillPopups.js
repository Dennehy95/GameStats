function fillRemoveIdPopup(system){
	console.log($.mobile.activePage.find("#psnRemoveID-popup").hasClass("ui-popup-active"));
	if(system == "psn"){
		$("#psnRemoveIdList").html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "psn";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#psnRemoveIdList").append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle psn'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'psn' + "\",\"" + row.Username + "\")'>" + row.Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#psnRemoveID").trigger("create");
				}
			});
		});
	}
	else if(system == "steam"){
		$("#steamRemoveIdList").html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "steam";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					str = row.Username
					Id = str.substring(0,str.indexOf("/"));
					Username = str.substring(str.indexOf("/")+1,str.length);
					
					$("#steamRemoveIdList").append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle steam'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'steam' + "\",\"" + row.Username + "\")'>" + Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#steamRemoveID").trigger("create");
				}
			});
		});
	}
	else if(system == "xbox"){
		//$('#psnAddID').popup
		$("#xboxRemoveIdList").html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "xbox";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#xboxRemoveIdList").append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle xbox'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'xbox' + "\",\"" + row.Username + "\")'>" + row.Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#xboxRemoveID").trigger("create");
				}
			});
		});
	}
}