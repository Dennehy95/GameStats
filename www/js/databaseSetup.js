var db;
var shortName = 'GameStatsDB';
var version = '1.0';
var displayName = 'GameStatsDB';
var maxSize = 65535;

var gamesList = ['Halo_V', 'Rocket_League', 'Siege'];
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
		//tx.executeSql( 'DROP TABLE Siege',nullHandler,nullHandler); //**************
		//tx.executeSql( 'DROP TABLE Halo_V',nullHandler,nullHandler); //************* 
		/*76561198073672390 Steam
		Harmen501 PSN
		The Wet Gurkin Xbox*/

	  // this line actually creates the table User if it does not exist
	//and sets up the three columns and their types
	  // note the UserId column is an auto incrementing column which is
	//useful if you want to pull back distinct rows
	  // easily from the table.
		//tx.executeSql('DROP TABLE User');
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Users(UserId INTEGER NOT NULL PRIMARY KEY, Username varchar(50) NOT NULL, System varchar(30) NOT NULL)',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Rocket_League(PlayerName varchar(50) NOT NULL, System varchar(30), Active INT, Ratio REAL, Wins INT, Goals INT, Saves INT, Shots INT, Mvps INT, Assists INT, Mvpratio REAL, DuelRank varchar(30), DuelDivision varchar(30), DuelRating INT, DuelGames INT, DuelStreak varchar(30), DoublesRank varchar(30), DoublesDivision varchar(30), DoublesRating INT, DoublesGames INT, DoublesStreak varchar(30), StandardRank varchar(30),StandardDivision varchar(30), StandardRating INT, StandardGames INT, StandardStreak varchar(30),SoloStandardRank varchar(30),SoloStandardDivision varchar(30), SoloStandardRating INT, SoloStandardGames INT, SoloStandardStreak varchar(30), Time varchar(30))',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Siege(PlayerName varchar(50) NOT NULL, System varchar(30), Active INT, KillsCasual INT, DeathsCasual INT, kdCasual REAL, PlaytimeCasual varchar(10), WinsCasual INT, LossesCasual INT, WinPercentCasual REAL, levelCasual INT, KillsRanked INT, DeathsRanked INT, kdRanked REAL, PlaytimeRanked varchar(10), WinsRanked INT, LossesRanked INT, WinPercentRanked REAL, levelRanked INT, Revives INT, Suicides INT, MeleeKills INT, AccuracyPercent varchar(10), HeadshotPercent varchar(10), Assist INT,PenetrationKills INT, Time varchar(30))',[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS Halo_V(PlayerName varchar(50) NOT NULL, System varchar(30), Active INT, TotalArenaAssassinations INT, TotalArenaAssists INT, TotalArenaDeaths INT, TotalArenaGamesCompleted INT, TotalArenaGamesLost INT, TotalArenaGamesTied INT, TotalArenaGamesWon INT, TotalArenaGrenadeKills INT, TotalArenaGroundPoundKills INT, TotalArenaHeadshots INT, TotalArenaKills INT, TotalArenaMeleeKills INT, TotalArenaPowerWeaponKills INT, TotalArenaShotsFired INT, TotalArenaShotsLanded INT, TotalArenaShoulderBashKills INT, TotalArenaTimePlayed varchar(15), SpartanRank INT, Emblem VARCHAR(512), SpartanImage VARCHAR(512), Time varchar(30),ActiveMode varchar(15))',[],nullHandler,errorHandler);	
		
	},errorHandler,successCallBack);
}