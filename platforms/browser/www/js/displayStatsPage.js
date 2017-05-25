function displayBasics(Username, System, Game){
	$("#statsPageTitle").append(
		"<h1 id='gameTitle' class='headerTitle ui-title' role='heading'>" + Game + "</h1>"
	);
	if(System == 'psn'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo psn'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'steam'){
		str = Username
		Id = str.substring(0,str.indexOf("/"));
		Username = str.substring(str.indexOf("/")+1,str.length);
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo steam'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
	else if(System == 'xbox'){
		$("#statsPage").append(
			"<h1 class='statsPageUserInfo xbox'>" +
				"<div class='usernameTitle'>" + Username +"</div>" +
			"</h1>"
		);
	}
}

function displayStats(system, Username){
	$("#statsPage").html("");
	$("#statsPageTitle").html("");
	var activeStats = "None";
	$.mobile.pageContainer.pagecontainer('change', '#Page3', {
		reverse: false,
		transition: 'pop',
		reload    : false
	});
	
	displayBasics(Username, system, "");
}