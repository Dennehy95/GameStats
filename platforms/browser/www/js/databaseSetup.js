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
// global variables
	
	// This alert is used to make sure the application is loaded correctly
	// you can comment this out once you have the application working
	console.log("DEBUGGING: we are in the onBodyLoad() function");

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
	console.log('HE3RE');
	// this line will try to create the table User in the database just
	//created/openned
	db.transaction(function(tx){
		console.log('HE3RE');
	  // you can uncomment this next line if you want the User table to be
	//empty each time the application runs
		//tx.executeSql( 'DROP TABLE Users',nullHandler,nullHandler);

	  // this line actually creates the table User if it does not exist
	//and sets up the three columns and their types
	  // note the UserId column is an auto incrementing column which is
	//useful if you want to pull back distinct rows
	  // easily from the table.
		//tx.executeSql('DROP TABLE User');
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Users(UserId INTEGER NOT NULL PRIMARY KEY, Username varchar(50) NOT NULL, System varchar(30) NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Rocket_League(PlayerName varchar(50) NOT NULL, System varchar(30), Goals INT)',[],nullHandler,errorHandler);
	},errorHandler,successCallBack);

}

		// list the values in the database to the screen using jquery to
		//update the #lbUsers element
function ListDBValues() {
	db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	// this line clears out any content in the #lbUsers element on the
	//page so that the next few lines will show updated
	// content and not just keep repeating lines
	$('#lbUsers').html('');

	// this next section will select all the content from the User table
	//and then go through it row by row
	// appending the UserId  FirstName  LastName to the  #lbUsers element
	//on the page
	//console.log(db.transaction);
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT * FROM Users;', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					//transaction.executeSql('SELECT Goals FROM Rocket_League WHERE PlayerName=' + row.Username +';', [],
					console.log(row.UserId)
					console.log(row.Username)
					console.log(row.System)
					console.log('**********')
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
	
	db.transaction(function(transaction) {
		transaction.executeSql('SELECT Goals FROM Rocket_League WHERE PlayerName = "The Wet Gurkin";', [],
		function(transaction, result) {
			if (result != null && result.rows != null) {
				for (var i = 0; i < result.rows.length; i++) {
					var row = result.rows.item(i);
					console.log(row.Goals)
				}
			}
		},errorHandler);
	},errorHandler,nullHandler);
	getLinkedIds();
	return;
}

// this is the function that puts values into the database using the
//values from the text boxes on the screen
function AddValueToDB() {
	db = openDatabase(shortName, version, displayName,maxSize);
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}

	// this is the section that actually inserts the values into the User
	//table
	db.transaction(function(transaction) {
		transaction.executeSql('INSERT INTO Users(Username, System)VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()],nullHandler,errorHandler);
		transaction.executeSql('INSERT INTO Rocket_League(PlayerName, System, Goals)VALUES (?,?,?)',[$('#txFirstName').val(), $('#txLastName').val(), 786],nullHandler,errorHandler);
	});

	// this calls the function that will show what is in the User table in
	//the database
	ListDBValues();
	getLinkedIds();

	return false;

}