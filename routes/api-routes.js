// Import the model (burger.js) to use its database functions.
var db = require("../models");



//Routes
//get route -> index
//   // GET route for getting all of the burgers
module.exports = function(app) {

app.get("/", function(req, res) {
  db.Burger.findAll({})
  .then(function(dbBurger) {
    // We have access to the burgers as an argument inside of the callback function
   res.json(dbBurger);
   console.log("hello"+ dbBurger);
   return res.render('index', {dbBurger})
    
  });

});

 


// POST Route for saving a new burger
 app.post("/api/burgers", function(req, res) {
  console.log(req.body);
//   // create takes an argument of an object describing the item we want to
//   // insert into our table. In this case we just we pass in an object with a text
  // and complete property (req.body)
  db.Burger.create({
    burger_name: req.body.burger_name,
    devoured: req.body.devoured
  }).then(function(dbBurger) {
    // We have access to the new burger as an argument inside of the callback function
    res.json(dbBurger);
  })
  .catch(function(err) {
//     // Whenever a validation or flag fails, an error is thrown
//     // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
});


//PUT route for updating burgers

app.put("/api/burgers/:id", function (req, res, next) {
  db.Burger.update(
    {devoured: true, where: {id: req.params.id} }
  )
  .then(function([ rowsUpdate, [updatedBurger] ]) {
    res.json(updatedBurger)
  })
  .catch(next)
 })

//Delete route

app.delete("/api/burgers/:id", function(req, res) {
  db.Burger.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.end();
  });
});


}