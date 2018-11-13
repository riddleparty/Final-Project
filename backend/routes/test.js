const db = require("../models");
const five = require("johnny-five");
const board = new five.Board();
const firebase = require("firebase");


//---------------------------------------------------------------------------------------------//
/*FIREBASE*/
//---------------------------------------------------------------------------------------------//

//firebase connection for real-time communication
const config = {
  apiKey: "AIzaSyBP4nQ3aIXnDzziz_oiq5lBHryfl6K7uKI",
  authDomain: "home-automation-smardo.firebaseapp.com",
  databaseURL: "https://home-automation-smardo.firebaseio.com",
  projectId: "home-automation-smardo",
  storageBucket: "home-automation-smardo.appspot.com",
  messagingSenderId: "942353647693"
};

const appFirebase = firebase.initializeApp(config);

// Create a variable to reference the database
const database = firebase.database();

//firebase will contain light's "ON/OFF" info as well as temperature reading values
//the code continues after module.export
//---------------------------------------------------------------------------------------------//


database.ref().on("value", function (snapshot) {

  room1Light_Status = snapshot.val().room1Light_Status;
  room2Light_Status = snapshot.val().room2Light_Status;
  roomTemp = snapshot.val().roomTemp;
  console.log(roomTemp)
  // console.log(room1Light_Status);
  if (room1Light_Status) {
    //database....
  }

});



board.on("ready", function () {
  let room1Light = new five.Led(11);
  let room2Light = new five.Led(12);

  let rm_1Switch = new five.Switch(7);
  let rm_2Switch = new five.Switch(6);
  let room_1Temp = new five.Thermometer({
    controller: "TMP102"
  })


  room_1Temp.on("change", function () {
    roomTemp = this.fahrenheit;
    //console.log(roomTemp)
    database.ref().set({
      roomTemp: roomTemp,
    })
  });
  //===========================================room 1 light control=================================================================================
  function rm1LightOn() {
    //console.log("buton pushed");
    room1Light.off();
    room1Light_Status = false;
    database.ref().set({
      room1Light_Status: room1Light_Status
    });
  }
  rm_1Switch.on("open", function () {

  });

  rm_1Switch.on("close", function () {
    //console.log("buton not pushed");
    room1Light.on();
    room1Light_Status = true;
    database.ref().set({
      room1Light_Status: room1Light_Status
    });
  });
  //===========================================room 1 light control end=================================================================================


  //===========================================room 2 light control=================================================================================
  rm_2Switch.on("open", function () {
    //console.log("buton 2 pushed");
    room2Light.on();
    room2Light_Status = true;
    database.ref().set({
      room2Light_Status: room2Light_Status
    });
  });

  rm_2Switch.on("close", function () {
    //console.log("buton not pushed");
    room2Light.off();
    room2Light_Status = false;
    database.ref().set({
      room2Light_Status: room2Light_Status
    });
  });
  //===========================================room 2 light control end=================================================================================
});