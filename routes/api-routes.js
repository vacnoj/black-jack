
var db = require("./../models");

module.exports = function(app) {

// display users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(results) {
      console.log(results)
      results.forEach(function(e) {
        res.json(e.username);
      });
    });
  });

//posts to the db User
  app.post("/api/users", function(req, res) {

    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function(results) {
      res.json(results);
    });
  });
};

// // display users
// app.get("/letsplay!", function(req, res) {
    
// });