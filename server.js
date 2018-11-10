require("dotenv").config();

const express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
const path = require("path");

var db = require("./models");
var app = express();
var PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starting the server, syncing our models ------------------------------------/
var syncOptions = { force: false };
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log("server started");
  });
});
