
var db = require("./../models");
var path = require('path');
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

app.post("/blackjack", function(req, res) {
  let username;
  console.log(req.body);
  db.User.findOne({ where: {username: req.body.username, password: req.body.password} 
  }).then(function(results) {
    console.log(results);
    if (results) {
      res.sendFile(path.join(__dirname + '/../public/game/game.html'));
    } else res.status(400).send({ error: "Nope" });
  });
});
};
