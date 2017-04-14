var db;
var shortName = 'GameStatsDB';
var version = '1.0';
var displayName = 'GameStatsDB';
var maxSize = 65535;
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");

}

function nullHandler(){};


function onBodyLoad(){

	if (!window.openDatabase) {
	   // not all mobile devices support databases  if it does not, the 
	   //following alert will display
	   // indicating the device will not be albe to run this application
	   alert('Databases are not supported in this browser.');
	   return;
	}

	// this line tries to open the database base locally on the device
	// if it does not exist, it will create it and return a database
	//object stored in variable db
	
	db = openDatabase(shortName, version, displayName,maxSize);
	// this line will try to create the table User in the database just
	//created/openned
	db.transaction(function(tx){
	  // you can uncomment this next line if you want the User table to be
	//empty each time the application runs
		
		//tx.executeSql( 'DROP TABLE Users',nullHandler,nullHandler); //******************
		//tx.executeSql( 'DROP TABLE Rocket_League',nullHandler,nullHandler); //**************

	  // this line actually creates the table User if it does not exist
	//and sets up the three columns and their types
	  // note the UserId column is an auto incrementing column which is
	//useful if you want to pull back distinct rows
	  // easily from the table.
		//tx.executeSql('DROP TABLE User');
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Users(UserId INTEGER NOT NULL PRIMARY KEY, Username varchar(50) NOT NULL, System varchar(30) NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Rocket_League(PlayerName varchar(50) NOT NULL, System varchar(30), Active INT)',[],nullHandler,errorHandler);
	},errorHandler,successCallBack);

}


// this is the function that puts values into the database using the
//values from the text boxes on the screen
function AddValueToDB() {
	db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	
	if($('#Username').val() !== ""){
		Username = $('#Username').val().trim();
		db.transaction(function(transaction) {
			transaction.executeSql('SELECT Username FROM Users WHERE Username = "'+ Username +'" AND System = "' + $('input[name=radio-choice-t-6]:checked').val() + '";', [],
			function(transaction, result) {
				if (result.rows.length == 0) {
					transaction.executeSql('INSERT INTO Users(Username, System)VALUES (?,?)',[Username, $('input[name=radio-choice-t-6]:checked').val()],nullHandler,errorHandler);
				//transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Goals)VALUES (?,?,?)',[$('#Username').val(), $('input[name=radio-choice-t-6]:checked').val(), 786],nullHandler,errorHandler);
				}
			},errorHandler);
		});
	}
	else{
		alert('Username is empty');
	}
	// this calls the function that will show what is in the User table in
	//the database
	getLinkedIds();
	return false;

}