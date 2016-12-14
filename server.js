var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport');
//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET || '12345' }));
app.use(passport.initialize());
app.use(passport.session());




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

require("./Project_Models/app.js")(app);
//require("./assignment/app.js")(app);


var ipaddress = process.env.IP;
var port      = process.env.PORT || 3000;
app.listen(port,ipaddress);
