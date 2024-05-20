var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./database.js');


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.get("/health",(req,res)=>{
    res.send("hello")

})













var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);