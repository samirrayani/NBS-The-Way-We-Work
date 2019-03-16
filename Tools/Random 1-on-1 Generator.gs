// Code borrows heavily from https://github.com/Knewton/RandomLunch/blob/master/script.js
// For more information, please see http://mindweather.com/

var SPREADSHEET_ID = "0AvUuxos_JjaXdFlEU3Z5bkJvR1ZSRElaRUtpNVhhU1E"; // REPLACE this
var PEOPLE_SHEET = "People"; // Name of the sheet with the list of people
var QUESTIONS_SHEET = "1:1 Questions"; //Name of the sheet with the list of questions
var NUMBER_OF_QUESTIONS = 2; // Per person
var ONE_ON_ONES_SHEET = "Random 1:1s"; // Name of the sheet for outputting the random 1:1s
var ORG_DOMAIN = "awesomeco.com";
var MENU_TEXT = "Kittens of Awesome!";
var DEBUG = 0; // Set to 1 for debugging

// is n even even?
function isEven(n) {
  return n == parseFloat(n)? !(n%2) : void 0;
}

// Return a randomized list of people
function randomizePeople() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(PEOPLE_SHEET);
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var people = [];
  
  // We skip the 0th row (the header)
  for (var i = 1; i < numRows ; i++) {
    var column = values[i];
    // Add people to the list, only if they want to participate in Random 1:1s
    if (column[6] == "Yes") {
        var emailAddress = column[0] + "@" + ORG_DOMAIN;
        people.push(emailAddress);
    }
  }
    
  people.sort(function (a, b) {return Math.round(Math.random()) - 0.5;});
  
  // If there's an even number of participants, one random person will have two 1:1s
  if (!isEven(people.length)) {
    people.push(people[0]);
  }
  
  if (DEBUG) {
    Logger.log("randomizePeople");
    Logger.log("People: " + people.join(", "));
    Logger.log("# People: " + people.length);
  }
  
  return(people);
  
}

// Randomly pick questions from a list
function pickQuestions() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(QUESTIONS_SHEET);
  
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var questions = [];
  
  for (var i=1; i <= NUMBER_OF_QUESTIONS*2; i++) {
    var index = Math.floor(Math.random() * (numRows));
    questions.push(values[index]);
    if (DEBUG) {
      Logger.log("pickQuestions");
      Logger.log("index: " + index);
      Logger.log("questions: " + questions);
    }
  }
  
  return (questions);
 
}

function main() {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(ONE_ON_ONES_SHEET);
  var people = randomizePeople();
  
  for (var i = 0; i < people.length ; i=i+2) {
    var questions = pickQuestions();
    sheet.appendRow([people[i], 
                     questions[0].toString(), 
                     questions[1].toString(), 
                     people[i+1], 
                     questions[2].toString(), 
                     questions[3].toString()]);
  }
}

/**
 * Adds a custom menu to the active spreadsheet, containing a single menu item
 * for invoking the readRows() function specified above.
 * The onOpen() function, when defined, is automatically invoked whenever the
 * spreadsheet is opened.
 * For more information on using the Spreadsheet API, see
 * https://developers.google.com/apps-script/service_spreadsheet
 */
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [
    {
      name : "Create Random 1:1 Pairings",
      functionName : "main"
    }];
  spreadsheet.addMenu(MENU_TEXT, entries);
};
