var express = require('express');
var db = require('./models');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 7777;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./routes/api-routes.js")(app);

app.use(express.static("public"));

db.sequelize.sync().then(function() {
    app.listen(PORT, function(){
        console.log("Listening on", PORT);
    });
});