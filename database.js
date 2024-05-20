const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});
