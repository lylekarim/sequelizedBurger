var express = require("express");

// Sets up the Express App
var app = express();

var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");


// Serve static content for the app from the "public" directory in the application directory.


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));
// connect the routes



// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

