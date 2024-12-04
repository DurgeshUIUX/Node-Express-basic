// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var http =require('http');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// var Db     = require('./app/models/db');
var User     = require('./app/models/user');

var port = process.env.PORT || 8080;        // set our port
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb",

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");

});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here



// ----------------------------------------------------
router.route('/users')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {


        let users ={
           name:req.body.name,
           email:req.body.email,
           username:req.body.username,
           password:req.body.password
        }



        console.log('enter data is :  ',users.name,users. email,users.username,users.password);
       var sql = "INSERT INTO users (name,email, username,password) VALUES ('"+users.name+"','"+users.email+"','"+users.username+"','"+users.password+"')";
        console.log('query is :',sql);
        con.query(sql, function(err, result){
            if(err)
            {
              throw err;
              console.log('err is ',err);
            }
            else
            {
            res.send({
              users,
              result
            });
            console.log("1 record inserted",users);
            }

      });



    });

    // get all the bears (accessed at GET http://localhost:8080/api/users)
router.route('/users')
  .get(function(req, res) {
    var sql = "select * from users";
     console.log('query is :',sql);
     con.query(sql, function(err, result){
         if(err)
         {
           throw err;
           console.log('err is ',err);
         }
         else
         {
         res.send({
           result
         });
         console.log("success in get");
         }

   });
    });

    router.route('/users/:email')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
         var email= req.params.email;

      var sql = "SELECT * FROM users WHERE email= '"+email+"'"
       console.log('query is :',sql);
       con.query(sql, function(err, result){
           if(err)
           {
             throw err;
             console.log('err is ',err);
           }
           else
           {
           res.send({
             result
           });
           console.log("success in get");
           }

     });
    });



// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
