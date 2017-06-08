function sourceHalo5(Username){
	/*var request;
	if (request) {
		request.abort();
	}*/
	//halo5Emblem(Username);
	halo5PSRArena(Username,'arena');
	//halo5PSRCampaign(Username);
}

function halo5Emblem(Username){
	var request;
	if (request) {
		request.abort();
	}
	
	//request.done(function (response, textStatus, jqXHR){
	request.done(function(data) {
		alert("success");
		//console.log(data.Results.Id);
		//console.log(data.Results.Result);
	})
	request.fail(function() {
		alert("error");
	});
}

function halo5PSRArena(Username,Mode){
	var request;
	if (request) {
		request.abort();
	}
	console.log('all good');
	var request;
	if (request) {
		request.abort();
	}
	request = $.ajax({
		url: "http://www.dennehyobutternug.eu/gameStatsPython/sourceHalo5.py",
		type: "post",
		beforeSend: function(){
			$('.ajax-loader').css("visibility", "visible");
		},
		complete: function(){
			$('.ajax-loader').css("visibility", "hidden");
		},
		data: {
			Username : Username,
			Mode: Mode
		}
	});
	console.log('all good2');
	request.done(function (response, textStatus, jqXHR){
	//request.done(function(data) {
		//newData = jQuery.parseJSON(data)
		//console.log(data)
		console.log("success");
		console.log(response)
		//console.log(data.Results[0].Id);
		//console.log(data.Results[0].Result);
	})
	request.fail(function() {
		alert("error");
	});
}

function halo5PSRCampaign(Username){
	var request;
	if (request) {
		request.abort();
	}
	
	//request.done(function (response, textStatus, jqXHR){
	request.done(function(data) {
		console.log("success");
		console.log(data.Results[0].Id);
		console.log(data.Results[0].Result);
	})
	request.fail(function() {
		alert("error");
	});
}