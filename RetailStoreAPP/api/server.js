const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const app = express();
const path = __dirname + '/static/';

// var corsOptions = {
//   origin: "http://localhost:3000"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bookstore application." });
// });

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// connection configurations
var dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'littlewhale',
  database: 'mydb'
});
// connect to database
dbConn.connect(); 

// Retrieve all users 
app.get('/getCards', function (req, res) {
    dbConn.query("SELECT tblbookrequests.Brn AS brn, tblbookrequests.Status AS status, adder.username AS adder, approver.username AS approver FROM tblbookrequests INNER JOIN tblusers adder ON tblbookrequests.AdderID = adder.id INNER JOIN tblusers approver ON tblbookrequests.ApproverID = approver.id", function (error, results, fields) {
        if (error) throw error;
        return res.send({ data: results});
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});