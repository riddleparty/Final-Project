var db = require("../models");


module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.render("login", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/homepage", function(req, res) {
    db.Users.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("homepage", {
        example: dbExample
      });
    });
  });

  app.get("/login", function(req, res){
    res.render("login");
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });


  app.get("/room2", function(req, res) {
    res.render("room2")
  });

  app.get("/room3", function(req, res) {
    res.render("room3")
  });
    
  app.get("/room4", function(req, res) {
    res.render("room4")
  });
  
};


