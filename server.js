var express = require('express');
var db = require('./models');

var PORT = process.env.PORT || 7777;
var app = express();

db.sequelize.sync().then(function() {
    app.listen(PORT, function(){
        console.log("Listening on 7777");
    });
});