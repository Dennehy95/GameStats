function fillRemoveIdPopup(system, activeSystemPage){
	console.log($.mobile.activePage.find("#psnRemoveID"+ activeSystemPage +"-popup").hasClass("ui-popup-active"));
	if(system == "psn"){
		$("#psnRemoveIdList"+ activeSystemPage).html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "psn";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#psnRemoveIdList"+ activeSystemPage).append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle psn'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'psn' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + row.Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#psnRemoveID"+ activeSystemPage).trigger("create");
				}
			});
		});
	}
	else if(system == "steam"){
		$("#steamRemoveIdList"+ activeSystemPage).html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "steam";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					str = row.Username
					Id = str.substring(0,str.indexOf("/"));
					Username = str.substring(str.indexOf("/")+1,str.length);
					
					$("#steamRemoveIdList"+ activeSystemPage).append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle steam'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'steam' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#steamRemoveID"+ activeSystemPage).trigger("create");
				}
			});
		});
	}
	else if(system == "xbox"){
		//$('#psnAddID').popup
		$("#xboxRemoveIdList"+ activeSystemPage).html("");
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "xbox";', [],
			function(transaction, result) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					$("#xboxRemoveIdList"+ activeSystemPage).append(
						"<li class='removeIdList' >" +
							"<h3 class='usernameListTitle xbox'>" +
								"<div class='usernameList' onclick='removeId(\"" + 'xbox' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + row.Username + "</div>" +
							"</h3>" +
						"</li>").children().last().trigger("create");
					$("#xboxRemoveID"+ activeSystemPage).trigger("create");
				}
			});
		});
	}
}