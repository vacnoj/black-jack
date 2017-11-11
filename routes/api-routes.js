
var db = require("./../models");
var users = [];

module.exports = function(app) {

// display users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(results) {
      console.log(results)
      results.forEach(function(e) {
        users.push(e.username);
      });
      res.json(users);
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

// app.get("/")
