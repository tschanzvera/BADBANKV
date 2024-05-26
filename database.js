// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });

const bank = {
    accounts: {
        "lila@gmail.com": {
            email: "lila@gmail.com",
            name: "Lila",
            balance: 100
        },
        "ben@gmail.com": {
            email: "ben@gmail.com",
            name: "Ben",
            balance: 100
        }
    }
}

function getAccount(email){
    return new Promise((resolve,reject)=>{resolve(bank.accounts[email])})

    
}

function updateAccount(updatedAccount){
    bank.accounts[updatedAccount.email]=updatedAccount
    return new Promise((resolve,reject)=>{resolve()})


}