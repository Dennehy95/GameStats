// this is the function that puts values into the database using the
//values from the text boxes on the screen
function AddValueToDB(system) {
	db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	
	if(system == 'psn'){
		Username = $('#psnId').val().trim();
	}
	else if(system == 'steam'){
		Username = $('#steamID').val().trim() + "/" + $('#steamName').val().trim();
	}
	else if(system =='xbox'){
		Username = $('#xboxId').val().trim();
	}
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Username FROM Users WHERE Username = "'+ Username +'" AND System = "' + system + '";', [],
		function(transaction, result) {
			if (result.rows.length == 0){
				transaction.executeSql('INSERT INTO Users(Username, System)VALUES (?,?)',[Username, system],nullHandler,errorHandler);
			//transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Goals)VALUES (?,?,?)',[$('#Username').val(), $('input[name=radio-choice-t-6]:checked').val(), 786],nullHandler,errorHandler);
			}
			else{
				alert('Id already Linked')
			}
		},errorHandler);
	});
	// this calls the function that will show what is in the User table in
	//the database
	getLinkedIds();
	return false;
}