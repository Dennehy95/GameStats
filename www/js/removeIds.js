function removeId(system, Username){
	/*db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}*/
	db.transaction(function(transaction) {
		transaction.executeSql('DELETE FROM Users WHERE Username = "'+ Username +'" AND System = "' + system + '";')
	},errorHandler);
	// this calls the function that will show what is in the User table in
	//the database
	getLinkedIds();
	fillRemoveIdPopup(system)
	return false;
}