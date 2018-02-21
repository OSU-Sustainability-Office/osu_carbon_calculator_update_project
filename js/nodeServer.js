// nodeServer.js
// This is a seperate server that's dedicated to accepting data from users
// in real time.

// Setup ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = 3000; // NOTE: Port 80 is forwarded to 3000 on our ec2 instance
                     // this command:
//sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
var fs       = require('fs'); // TEMP - for saving acquisuite POST data
var db       = require('mongodb').MongoClient; // Database
var bodyParser   = require('body-parser');
var morgan       = require('morgan');

// Configuration ===============================================================
// Set the region
var mongoHost = "localhost";
var mongoPort = 27017;
var mongoUser = "carbonCalc";
var mongoPassword = "OakCreek";
var mongoDBName = "carbon-calculator";
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword +
               '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoConnection = null;

// log every request to the console
app.use(morgan('dev'));

// Parse post bodies
app.use(bodyParser.json());// get information from JSON POST bodies


// Routes ======================================================================

//=====================================
// Data Collection
//=====================================
// Collects POST data from users in JSON format.
// Then, queries the database to prevent duplicates
// and stores the data.
app.post('/upload', function (req, res) {

  console.log(req.body);
  var dataObject = req.body;

  // Send success status.
  res.status("200");

  // Get userData collection
  var col = db.collection('userData');

  col.find({UserID:dataObject.UserID}).limit(1).toArray(function (err, results) {
    if (results.length > 0) { // If the user exists in the DB

      // Search the user's data for today's date.
      // The user can only upload a maximum of 1 carbon footprint per day.
      var userObject = results[0];
      var update = false;
      for (var i = 0; i < userObject.data.length; i++) {
        // If date exists in the user's list,
        if (userObject.data[i].date == dataObject.data[0].date) {
          update = true;
          userObject.data[i] = dataObject.data[0]; // Replace it
          console.log("Replace data.");
        }
      }

      // If the date didn't exist, push the new data
      if(!update) {
        userObject.data.push(dataObject.data[0]); // The data itself is an array. Only push the first element.
        console.log("Push new data.");
      }
      console.log(userObject.data);

      // Update database with new data.var db = client.db('mytestingdb');
      col.update({"_id":userObject._id}, {$set: {"data":userObject.data}});

      // Send a result message for debugging.
      res.send("Added new data to user.");

    } else {// User does not exist.

      // Insert user's object into database.
      col.insert(dataObject);
      // Send a result message for debugging.
      res.send("User inserted into database.");

    }
  });

});
//=====================================
// Data Retrieval
//=====================================
// Retrieves the user's object in JSON format.
app.post('/download', function (req, res) {

  console.log(req.body);
  var dataObject = req.body;

  // Get userData collection
  var col = db.collection('userData');

  col.find({UserID:dataObject.UserID}).limit(1).toArray(function (err, results) {
    if (results.length > 0) { // If the user exists in the DB

      var userObject = results[0];

      // Send success status.
      res.status("200");

      // Send user's object.
      res.send(JSON.stringify(userObject));

    } else {// User does not exist.

      // Send success status.
      res.status("500");

      // Send an error message.
      res.send("Error: No such user.");

    }
  });

});

// Launch ======================================================================
// Connect to DB
db.connect(mongoURL, function (err, connection) {
  if (err) {
    throw err;
  }
  mongoConnection = connection;
  db = connection.db("carbon-calculator");
  // Launch app
  app.listen(port, function () {
    console.log("Server listening on port:", port);
  });
});
console.log("I think it's working!");
