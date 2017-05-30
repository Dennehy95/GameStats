function fillListOfGames(UserId, Username, System){
	/*$("#" + System + UserId).html("");
	//Check if User has recorded availability for each game
	db = openDatabase(shortName, version, displayName,maxSize);
	db.transaction(function(transaction){
		transaction.executeSql('SELECT Active FROM Rocket_League WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.length == 1){
				$('#' + System + UserId).prepend(
					"<li>" +
						"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displayRocketLeague(\"" + Username + "\",\"" + System + "\")'>Rocket League</a>" +
					"</li>"
				).children().last().trigger("create");
			}
			console.log('done.');
		},errorHandler);
		
		transaction.executeSql('SELECT Active FROM Siege WHERE PlayerName = "' + Username + '" AND System = "' + System + '";', [],
		function(transaction, result) {
			if(result.rows.length == 1){
				$('#' + System + UserId).prepend(
					"<li>" +
						"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='displaySiege(\"" + Username + "\",\"" + System + "\")'>Rainbow Six Siege</a>" +
					"</li>"
				).children().last().trigger("create");
			}
		},errorHandler);
		var count = $("#" + System + UserId +" li").length;
		if(count == 0){
			$('#' + System + UserId).append(
				"<li>" +
					"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='updateListOfGames(\"" + UserId + "\",\"" + Username +"\",\"" + System + "\")'>Search For Games</a>" +
				"</li>"
			).children().last().trigger("create");
		}
		else{
			$('#' + System + UserId).append(
				"<li>" +
					"<a class='gameList ui-btn ui-icon-carat-r ui-btn-icon-right' onclick='updateListOfGames(\"" + UserId + "\",\"" + Username +"\",\"" + System + "\")'>Search For More Games</a>" +
				"</li>"
			).children().last().trigger("create");
		}
		
	},errorHandler,nullHandler);*/
}

function getLinkedIds(system, activeSystemPage) {
	db = openDatabase(shortName, version, displayName,maxSize);
	if(activeSystemPage == '2a'){
		activeSystemPageCopy = '2b';
	}
	else{
		activeSystemPageCopy = '2a';
	}
	$("#Page" + activeSystemPage).html("");
	if(system == 'psn'){
		$("#Page" + activeSystemPage).append(
			"<div class='systemSection psn'>" +
				"<h1 class='systemTitle psn'>Playstation Network </h1>" +
				"<div class='ui-grid-a'>" +
					"<div class='ui-block-a'>" +
						"<h1 class='systemTitle home'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goHome(\"" + 'right' + "\")' style='width: 0%;margin-left: -1vh;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute' transform='scale(-1, 1)'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
								"<div class='ui-block-a' onclick='goHome(\"" + 'right' + "\")' style='margin-left: 20%;text-align: center;width: 80%;'>" +
									"<div class='navText systems'>Home</div>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<h1 class='systemTitle steam'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goSteam(\"" + 'left' + "\",\"" + activeSystemPageCopy + "\")' style='width: 80%;text-align: center;'>" +
									"<div class='navText systems'>Steam</div>" +
								"</div>" +
								"<div class='ui-block-b' onclick='goSteam(\"" + 'left' + "\",\"" + activeSystemPageCopy + "\")' style='width: 0%;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
				"</div>" +
				"<div class='ui-grid-a' style='background-color: #333'>" +
					"<div class='ui-block-a'>" +
						"<a href='#psnAddID"+ activeSystemPage +"' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton add' data-transition='pop'>Add Id</a>" +
						"<div data-role='popup' id='psnAddID"+ activeSystemPage +"' data-theme='a' data-overlay-theme='b' class='ui-corner-all'>" +
							"<form id='psnAddForm"+ activeSystemPage +"' action=''>" +
								"<div style='padding:10px 20px;'>" +
									"<input type='text' name='user' id='psnId"+ activeSystemPage +"' value='' placeholder='PSN Id' style='font-size: 3vh' required data-theme='a'>" +
									"<button type='submit' style='font-size: 3vh' class='ui-btn ui-corner-all ui-shadow ui-btn-b'>Link Id</button>" +
								"</div>" +
							"</form>" +
						"</div>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<a id='psnRemoveIdButton"+ activeSystemPage +"' href='#psnRemoveID"+ activeSystemPage +"' data-rel='popup' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton remove' data-transition='pop'>Remove Id</a>" +
						"<div data-role='popup' id='psnRemoveID"+ activeSystemPage +"' data-transition='flow' data-overlay-theme='a' data-position-to='window' style='background-color: #333; border: none; padding: 0 0 1px 0;'>" +
							"<h3 class='popupHeader'>Remove Id</h3>" +
							"<ul id='psnRemoveIdList"+ activeSystemPage +"' data-role='listview' data-inset='false'>" +
							"</ul>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div id='linkedPSN"+ activeSystemPage +"' class='idListview' data-role='collapsible-set'>" +
					"<div data-theme='b' data-role='collapsible'>" +
						
					"</div>" +
				"</div>" +
			"</div>"
		);
		$("#Page" + activeSystemPage).trigger("create");
		
		$('#psnAddForm'+ activeSystemPage).on('submit', function(e) {
			e.preventDefault();
			console.log('moo');
			$('#psnAddID2a').popup('close');
			AddValueToDB('psn','2a');
		});
		$('#psnAddForm2b').on('submit', function(e) {
			e.preventDefault();
			$('#psnAddID2b').popup('close'); 
			AddValueToDB('psn','2b');
		});
		
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "psn";', [],
			function(transaction, result) {
				if (result != null && result.rows != null) {
					if(result.rows.length == 0){
						$("#psnRemoveIdButton"+ activeSystemPage).attr("onclick","");
					}
					else{
						$("#psnRemoveIdButton"+ activeSystemPage).attr("onclick","fillRemoveIdPopup('psn',\"" + activeSystemPage + "\")");
						for (var i = 0; i < result.rows.length; i++) {
						
							var row = result.rows.item(i);
							$("#linkedPSN"+ activeSystemPage).append(
								"<h3 class='usernameListTitle psn'>" +
									"<div class='usernameList' onclick='displayStats(\"" + 'psn' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + row.Username + "</div>" +
								"</h3>"
								//"<ul id='psn" + row.UserId + "'data-role='listview' class='gamelistview'>"
							);
							//fillListOfGames(row.UserId, row.Username, "psn");					
							//$("#linkedPSN").append(
								//"</ul>"
							//);
							$("#linkedPSN"+ activeSystemPage).trigger("create");
						}
					}
				}
				else{
					/*("#linkedPSN").append(
						"<div data-theme='b' data-role='collapsible' >" +
							"<h3 class='noIdsTitle'>" +
								"<div></div>" +
							"</h3>" +
						"</div>"
					);*/
				}
			},errorHandler);
		},errorHandler,nullHandler);
	}
	if(system == 'steam'){
		$("#Page" + activeSystemPage).append(
			"<div class='systemSection steam'>" +
				"<h1 class='systemTitle steam'>Steam</h1>" +
				"<div class='ui-grid-a'>" +
					"<div class='ui-block-a'>" +
						"<h1 class='systemTitle psn'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goPSN(\"" + 'right' + "\",\"" + activeSystemPageCopy + "\")' style='width: 0%;margin-left: -1vh;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute' transform='scale(-1, 1)'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
								"<div class='ui-block-a' onclick='goPSN(\"" + 'right' + "\",\"" + activeSystemPageCopy + "\")' style='margin-left: 20%;text-align: center;width: 80%;'>" +
									"<div class='navText systems'>PSN</div>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<h1 class='systemTitle xbox'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goXbox(\"" + 'left' + "\",\"" + activeSystemPageCopy + "\")' style='width: 80%;text-align: center;'>" +
									"<div class='navText systems'>Xbox</div>" +
								"</div>" +
								"<div class='ui-block-b' onclick='goXbox(\"" + 'left' + "\",\"" + activeSystemPageCopy + "\")' style='width: 0%;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
				"</div>" +
				"<div class='ui-grid-a' style='background-color: #333'>" +
					"<div class='ui-block-a'>" +
						"<a href='#steamAddID"+ activeSystemPage +"' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton add' data-transition='pop'>Add Id</a>" +
						"<div data-role='popup' id='steamAddID"+ activeSystemPage +"' data-theme='a' data-overlay-theme='b' class='ui-corner-all'>" +
							"<form id='steamAddForm"+ activeSystemPage +"' action=''>" +
								"<div style='padding:10px 20px;'>" +
									"<input type='text' name='user' id='steamID"+ activeSystemPage +"' value='' placeholder='Steam Id' style='font-size: 3vh' required data-theme='a'>" +
									"<input type='text' name='user' id='steamName"+ activeSystemPage +"' value='' placeholder='Steam Name' style='font-size: 3vh' required data-theme='a'>" +
									"<button type='submit' style='font-size: 3vh' class='ui-btn ui-corner-all ui-shadow ui-btn-b'>Link Id</button>" +
								"</div>" +
							"</form>" +
						"</div>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<a id='steamRemoveIdButton"+ activeSystemPage +"' href='#steamRemoveID"+ activeSystemPage +"' data-rel='popup' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton remove' data-transition='pop'>Remove Id</a>" +
						"<div data-role='popup' id='steamRemoveID"+ activeSystemPage +"' data-transition='flow' data-overlay-theme='a' data-position-to='window' style='background-color: #333; border: none; padding: 0 0 1px 0;'>" +
							"<h3 class='popupHeader'>Remove Id</h3>" +
							"<ul id='steamRemoveIdList"+ activeSystemPage +"' data-role='listview' data-inset='false'>" +
							"</ul>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div id='linkedSteam"+ activeSystemPage +"' class='idListview' data-role='collapsible-set'>" +
					"<div data-theme='b' data-role='collapsible'>" +
						
					"</div>" +
				"</div>" +
			"</div>"
		);
		
		$("#Page" + activeSystemPage).trigger("create");
		$('#steamAddForm2a').on('submit', function(e) {
			e.preventDefault();
			$('#steamAddID2a').popup('close'); 
			AddValueToDB('steam','2a');
		});
		$('#steamAddForm2b').on('submit', function(e) {
			e.preventDefault();
			$('#steamAddID2b').popup('close'); 
			AddValueToDB('steam','2b');
		});
				
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId, Username FROM Users WHERE System = "steam";', [],
			function(transaction, result) {
				if (result != null && result.rows != null) {
					if(result.rows.length == 0){
						$("#steamRemoveIdButton"+ activeSystemPage).attr("onclick","");
						/*$("#linkedSteam").append(
							"<h3 class='noIdsTitle'>" +
								"<div>No Linked Ids</div>" +
							"</h3>"
						);*/
					}
					else{
						$("#steamRemoveIdButton"+ activeSystemPage).attr("onclick","fillRemoveIdPopup('steam', \"" + activeSystemPage + "\")");
						for (var i = 0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							str = row.Username
							Id = str.substring(0,str.indexOf("/"));
							Username = str.substring(str.indexOf("/")+1,str.length);
							$("#linkedSteam"+ activeSystemPage).append(
								"<h3 class='usernameListTitle steam'>" +
									"<div class='usernameList' onclick='displayStats(\"" + 'steam' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + Username + "</div>" +
								"</h3>"
							);
							$("#linkedSteam"+ activeSystemPage).trigger("create");
						}
					}
				}
				else{
					/*("#linkedSteam").append(
						"<h3 class='noIdsTitle'>" +
							"<div></div>" +
						"</h3>"
					);*/
				}
			},errorHandler);
		},errorHandler,nullHandler);
	}
	if(system == 'xbox'){
		$("#Page" + activeSystemPage).append(
			"<div class='systemSection xbox'>" +
				"<h1 class='systemTitle xbox'>Xbox Live </h1>" +
				"<div class='ui-grid-a'>" +
					"<div class='ui-block-a'>" +
						"<h1 class='systemTitle steam'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goSteam(\"" + 'right' + "\",\"" + activeSystemPageCopy + "\")' style='width: 0%;margin-left: -1vh;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute' transform='scale(-1, 1)'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
								"<div class='ui-block-a' onclick='goSteam(\"" + 'right' + "\",\"" + activeSystemPageCopy + "\")' style='margin-left: 20%;text-align: center;width: 80%;'>" +
									"<div class='navText systems'>Steam</div>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<h1 class='systemTitle home'>" +
							"<div class='ui-grid-a'>" +
								"<div class='ui-block-a' onclick='goHome(\"" + 'left' + "\")' style='width: 80%;text-align: center;'>" +
									"<div class='navText systems'>Home</div>" +
								"</div>" +
								"<div class='ui-block-b' onclick='goHome(\"" + 'left' + "\")' style='width: 0%;text-align: center;'>" +
									"<svg width='7vh' height='7vh' viewbox='0 0 400 400' style='position: absolute'>" +
										"<path stroke='#000' stroke-width='50' fill='none' stroke-opacity='0.4' d='M200 350 A 100 100 0 0 1 200 150 M200 150 200 125 225 150 200 175Z'/>" +
									"</svg>" +
								"</div>" +
							"</div>" +
						"</h1>" +
					"</div>" +
				"</div>" +
				"<div class='ui-grid-a' style='background-color: #333'>" +
					"<div class='ui-block-a'>" +
						"<a href='#xboxAddID"+ activeSystemPage +"' data-rel='popup' data-position-to='window' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton add' data-transition='pop'>Add Gamertag</a>" +
						"<div data-role='popup' id='xboxAddID"+ activeSystemPage +"' data-theme='a' data-overlay-theme='b' class='ui-corner-all'>" +
							"<form id='xboxAddForm"+ activeSystemPage +"' action=''>" +
								"<div style='padding:10px 20px;'>" +
									"<input type='text' name='user' id='xboxId"+ activeSystemPage +"' value='' placeholder='Xbox Gamertag' style='font-size: 3vh' required data-theme='a'>" +
									"<button type='submit' style='font-size: 3vh' class='ui-btn ui-corner-all ui-shadow ui-btn-b'>Link Id</button>" +
								"</div>" +
							"</form>" +
						"</div>" +
					"</div>" +
					"<div class='ui-block-b'>" +
						"<a id='xboxRemoveIdButton"+ activeSystemPage +"' href='#xboxRemoveID"+ activeSystemPage +"' data-rel='popup' class='ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-a alterIdButton remove' data-transition='pop'>Remove Id</a>" +
						"<div data-role='popup' id='xboxRemoveID"+ activeSystemPage +"' data-transition='flow' data-overlay-theme='a' data-position-to='window' style='background-color: #333; border: none; padding: 0 0 1px 0;'>" +
							"<h3 class='popupHeader'>Remove Id</h3>" +
							"<ul id='xboxRemoveIdList"+ activeSystemPage +"' data-role='listview' data-inset='false'>" +
							"</ul>" +
						"</div>" +
					"</div>" +
				"</div>" +
				"<div id='linkedXbox"+ activeSystemPage +"' class='idListview' data-role='collapsible-set'>" +
					"<div data-theme='b' data-role='collapsible'>" +
						
					"</div>" +
				"</div>" +
			"</div>"
		);
		$("#Page" + activeSystemPage).trigger("create");
		
		$('#xboxAddForm2a').on('submit', function(e) {
			e.preventDefault();
			AddValueToDB('xbox','2a');
			$('#xboxAddID2a').popup('close'); 
		});
		$('#xboxAddForm2b').on('submit', function(e) {
			e.preventDefault();
			AddValueToDB('xbox','2b');
			$('#xboxAddID2b').popup('close'); 
		});
			
		db.transaction(function(transaction){
			transaction.executeSql('SELECT UserId,Username FROM Users WHERE System = "xbox";', [],
			function(transaction, result) {
				if (result != null && result.rows != null) {
					if(result.rows.length == 0){
						$("#xboxRemoveIdButton"+ activeSystemPage).attr("onclick","");
						/*$("#linkedXbox").append(
							"<h1 class='noIdsTitle'></h1>"
						);*/
					}
					else{
						$("#xboxRemoveIdButton"+ activeSystemPage).attr("onclick","fillRemoveIdPopup('xbox',\"" + activeSystemPage + "\")");
						for (var i = 0; i < result.rows.length; i++) {
							var row = result.rows.item(i);
							$("#linkedXbox"+ activeSystemPage).append(
								"<h3 class='usernameListTitle xbox'>" +
									"<div class='usernameList' onclick='displayStats(\"" + 'xbox' + "\",\"" + row.Username + "\",\"" + activeSystemPage + "\")'>" + row.Username + "</div>" +
								"</h3>"
								//"<ul id='xbox" + row.UserId + "'data-role='listview' class='gamelistview'>"
							);
							//fillListOfGames(row.UserId, row.Username, "xbox");
							/*$("#linkedXbox"+ activeSystemPage).append(
								"</ul>"
							);*/
							$("#linkedXbox"+ activeSystemPage).trigger("create");
						}
					}
				}
				else{
					/*("#linkedXbox").append(
						"<h3 class='noIdsTitle'>" +
							"<div></div>" +
						"</h3>"
					);*/
				}
			},errorHandler);
		},errorHandler,nullHandler);
	}
}
				

