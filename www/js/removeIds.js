function removeId(system, Username, activeSystemPage){
	/*db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}*/
	db.transaction(function(transaction) {
		transaction.executeSql('DELETE FROM Users WHERE Username = "'+ Username +'" AND System = "' + system + '";')
		transaction.executeSql('DELETE FROM Rocket_League WHERE PlayerName = "'+ Username +'" AND System = "' + system + '";')
		transaction.executeSql('DELETE FROM Siege WHERE PlayerName = "'+ Username +'" AND System = "' + system + '";')
		transaction.executeSql('DELETE FROM Halo_V WHERE PlayerName = "'+ Username +'" AND System = "' + system + '";')
	},errorHandler);
	// this calls the function that will show what is in the User table in
	//the database
	
	fillRemoveIdPopup(system, activeSystemPage);
	getLinkedIds(system, activeSystemPage, 0);
	return false;
}