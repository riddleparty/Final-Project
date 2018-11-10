var db = require("../models");
var five = require("johnny-five");
var board = new five.Board();
var firebase = require("firebase");


//---------------------------------------------------------------------------------------------//
/*FIREBASE*/
//---------------------------------------------------------------------------------------------//

//firebase connection for real-time communication
var config = {
  apiKey: "AIzaSyBP4nQ3aIXnDzziz_oiq5lBHryfl6K7uKI",
  authDomain: "home-automation-smardo.firebaseapp.com",
  databaseURL: "https://home-automation-smardo.firebaseio.com",
  projectId: "home-automation-smardo",
  storageBucket: "home-automation-smardo.appspot.com",
  messagingSenderId: "942353647693"
};

var appFirebase = firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//firebase will contain light's "ON/OFF" info as well as temperature reading values
//the code continues after module.export
//---------------------------------------------------------------------------------------------//


database.ref().on("value", function (snapshot) {

  islightOn = snapshot.val().islightOn;
  console.log(islightOn);
  if (islightOn) {
    //database....
  }
});



board.on("ready", function () {
  var led = new five.Led(11);
  var rm_1Switch = new five.Switch(8);
  var room_1Temp = new five.Thermometer("A0");

  function temperature() {
    room_1Temp.on("change", function() {
      //var tempReading = value * 1/10;
      console.log(this.scaleTo(0, 10));
    });
  };

  rm_1Switch.on("open", function () {
    console.log("buton pushed");
    led.on();
    islightOn = true;
    database.ref().set({
      islightOn: islightOn
    });
  });

  rm_1Switch.on("close", function () {
    console.log("buton not pushed");
    led.off();
    islightOn = false;
    database.ref().set({
      islightOn: islightOn
    });
  });
});