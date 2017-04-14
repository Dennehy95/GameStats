function displayRocketLeague(Username, System){
	$("#statsPage").html("");
	$("#statsPageTitle").html("");
	$.mobile.pageContainer.pagecontainer('change', '#Page2', {
		transition: 'slide',
		reload    : false
	});
	$("#statsPageTitle").append(
		"<h1 id='gameTitle' class='headerTitle ui-title' role='heading'>Rocket League</h1>"
	);
	if(System == 'psn'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo psn'>" +
				"<div>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'steam'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo steam'>" +
				"<div>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'xbox'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo xbox'>" +
				"<div>" + Username +"</div>" +
			"</h1>"
		);
	}
}