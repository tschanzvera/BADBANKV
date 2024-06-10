// const MongoClient = require('mongodb').MongoClient;
// const url         = 'mongodb://localhost:27017';
// let db            = null;

// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });
let account = null;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/badbank')
    .then(() => {

        console.log("successful connection")
        const accountsSchema = new mongoose.Schema({
            name: String,
            email: String,
            balance: Number
        });
        account = mongoose.model('accounts', accountsSchema);
        const lilasAccount = new account({
            email: "lila@gmail.com",
            name: "Lila",
            balance: 100
        });
        lilasAccount.save().then(() => { console.log("lila saved") })

        const bensAccount = new account({
            email: "ben@gmail.com",
            name: "ben",
            balance: 100
        });
        bensAccount.save().then(() => { console.log("ben saved") })



    })

    .catch(err => console.log(err));




function getAccount(email) {
    // return new Promise((resolve, reject) => { resolve(bank.accounts[email]) })

  return  account.findOne({ email:email}).then();

    
}

function updateAccount(updatedAccount) {
  return account.updateOne({email:updatedAccount.email}, updatedAccount).exec().then(()=>updateAccount);


}

module.exports = {
    getAccount, updateAccount
}
