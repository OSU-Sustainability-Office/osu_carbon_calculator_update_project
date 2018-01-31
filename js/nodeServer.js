// nodeServer.js
// This is a seperate server that's dedicated to accepting data from users
// in real time.

// set up ======================================================================
// get all the tools we need
var dotenv   = require('dotenv').config();
var express  = require('express');
var app      = express();
var fs       = require('fs'); // TEMP - for saving acquisuite POST data\
var AWS      = require('aws-sdk'); // For DynamoDB
var db       = new AWS.DynamoDB();
var bodyParser   = require('body-parser');
var morgan       = require('morgan');

// configuration ===============================================================

mongoose.connect(process.env.MONGO_DATABASE_URL, { useMongoClient: true }); // connect to our database
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're connected");
});

// log every request to the console
app.use(morgan('dev'));

// Parse post bodies
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());// get information from html forms
app.use(bodyParser.text({type: "*/*", limit: '50mb'}));// get information from html forms

// Obtain DB schema
var User = require('./app/models/user-schema');
var Building = require('./app/models/building-schema');

// Routes ======================================================================

//=====================================
// Data Collection
//=====================================
// Collects POST data from users in JSON format.
// Then, queries the database to prevent duplicates
// and stores the data.
app.post('/upload/:id', function (req, res) {

  console.log(req.body);

  var dataObject = req.body;


  res.status("200");
  res.send("");
});

// launch ======================================================================
app.listen(80);
console.log("I think it's working!");
