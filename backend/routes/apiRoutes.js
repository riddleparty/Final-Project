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

  app.get("/api/examples", function (req, res) {
    db.Users.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Users.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Users.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};