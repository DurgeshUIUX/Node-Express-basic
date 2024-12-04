var mysql = require('mysql');
var Db = {};


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
      //  var sql = "INSERT INTO users (name, address) VALUES ("+username+","+add+")";

module.exports = Db;
exports.con={};


// var sql = "INSERT INTO users (name, address) VALUES ('Durgesh','UP')";
//       console.log('query is :',sql);
//       con.query(sql, function(err, result){
//           if(err) throw err;
//               console.log("1 record inserted");
//             });
