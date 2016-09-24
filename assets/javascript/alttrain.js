// Initialize Firebase
var config = {
    apiKey: "AIzaSyCBP6l0u9Ra7sT6cR3RQcaNZmx2jf6OI-I",
    authDomain: "trains-2c0c9.firebaseapp.com",
    databaseURL: "https://trains-2c0c9.firebaseio.com",
    storageBucket: " ",
    messagingSenderId: "16733116348"
};
firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = 0;
  var frequency = 0;


// Button for adding a new train
$('#addTrainBtn').on("click", function(){

  //User input
  var trainName = $('#trainNameInput').val().trim();
  var destination = $('#destInput').val().trim();
  var firstTrain = $('#firstTrainInput').val().trim();
  var frequency = $('#freqInput').val().trim();

  //TRAIN
  database.ref().push({

    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency,
  })

  // Clears all of the text-boxes
  $('#trainNameInput').val("");
  $('#destInput').val("");
  $('#firstTrainInput').val("");
  $('#freqInput').val("");

  return false;
});

// Creates a Firebase event for adding trains to the database and a row in the html
database.ref().on("child_added", function(childSnapshot){
  console.log(childSnapshot.val());

  // Store everything into a variable
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;


  //First time
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current time
  var currentTime = moment();
  console.log("CURRENT TIME:" + moment(currentTime).format("HH:mm"));

  // Difference between times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Remainder
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  // Mins until train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination  + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});
