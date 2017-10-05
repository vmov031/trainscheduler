 var config = {
    apiKey: "AIzaSyCCA6oKB-rmGfK0RyDt0A1OXvXMBHQUIvE",
    authDomain: "train-453ef.firebaseapp.com",
    databaseURL: "https://train-453ef.firebaseio.com",
    projectId: "train-453ef",
    storageBucket: "train-453ef.appspot.com",
    messagingSenderId: "1022942037794"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-input").val().trim(), "hh:mm").format("X");
    var frequency = $("#frequency-input").val().trim();

   var newTrain = {
        name: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");

    });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().frequency;

 
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var firstTime = firstTrain;
  var tFrequency = frequency;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var nextTrainPretty = moment(nextTrain).format("hh:mm");



  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextTrainPretty + "</td><td>" + minutesAway + "</td></tr>");
});
