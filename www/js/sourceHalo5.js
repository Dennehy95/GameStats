function sourceHalo5(Username){
	var request;
	if (request) {
		request.abort();
	}
	var params = {
		// Request parameters
		//"size": "{number}",
	};
	
	request.done(function(data) {
		alert("success");
	})
	request.fail(function() {
		alert("error");
	});
}