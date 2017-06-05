function sourceHalo5(Username){
	var request;
	if (request) {
		request.abort();
	}
	var params = {
		// Request parameters
		//"size": "{number}",
	};
	request = $.ajax({
		url: "https://www.haloapi.com/profile/h5/profiles/" + Username + "/emblem?" + $.param(params),
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","");
		},
		type: "GET",
		// Request body
		data: "{body}",
	});
	request.done(function(data) {
		alert("success");
	})
	request.fail(function() {
		alert("error");
	});
}