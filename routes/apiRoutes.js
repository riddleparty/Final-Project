var db = require("../models");
var five = require("johnny-five");
var board = new five.Board();
module.exports = function (app) {

  app.get("/api/arduino", function(req, res){
  });

  var islightOn = undefined;
  board.on("ready", function () {
    var led = new five.Led(11);
    var rmSwitch = new five.Switch(8);

    app.post("/api/arduino", function (req, res) {
      if (req.body.status === "on") {
        islightOn = true;
        console.log("on web");
        led.on();
        res.send(islightOn);
      }
      else if (req.body.status === "off") {
        islightOn = false;
        led.off();
        res.send(islightOn);
      }
      console.log("is light on? : " + islightOn);
    });

    rmSwitch.on("open", function () {
      if (islightOn === true) {
        led.off();
        islightOn = false;
      } else {
        led.on();
        islightOn = true;
      }
      console.log("----------------------------");
      console.log("Hardware: Im open");
      console.log("is light on? : " + islightOn);
    });

    rmSwitch.on("close", function () {
      if (islightOn === false) {
        led.on();
        islightOn = true;
      } else {
        led.off();
        islightOn = false;
      }
      console.log("----------------------------");
      console.log("Hardware: Im close");
      console.log("is light on? : " + islightOn);
    });
  }); // end of board

  app.get("/api/ard/hardware", function (req, res) {
    res.send(islightOn);
  });




  //Grab data from activity to show unit/room/on/off
  var newActivityData = {
    unit: getElementByID("#unitdiv").val(),
    room: getElementByID("#roomdiv").val(),
    status: getElementByID("#statusdiv").val()
};


  // GET route for getting all of the todos
  app.get("/api/status", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.homedb.findAll({}).then(function(dbhome) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbhome);
    });
  });



  //post route for Activity
  app.post("/api/status", function(req, res) {
    console.log(req.body);

    db.homedb.create({
      unit: req.body.text,
      room: req.body.room,
      status: req.body.status,
      complete: req.body.complete
    }).then(function(dbTodo) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTodo);
    });


    // var activity = {
    //   unit: "",
    //   room: "",
    //   status: ""
      
    //   };
  });



  console.log(req.body);

  //db.home.create(req.body).then(function(newActivity) {
    
  //}); // create activity

  
};

