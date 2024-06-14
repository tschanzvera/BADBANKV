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
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/badbank')
    .then(() => {

        console.log("successful connection")
        const accountsSchema = new mongoose.Schema({
            name: String,
            email: String,
            balance: Number,
            password: String
        });
        account = mongoose.model('accounts', accountsSchema);
        hashPassword("secret").then((hash) => {
            const lilasAccount = new account({
                email: "lila@gmail.com",
                name: "Lila",
                balance: 100,
                password: hash
            });
            lilasAccount.save().then(() => { console.log("lila saved") })

            const bensAccount = new account({
                email: "ben@gmail.com",
                name: "ben",
                balance: 100,
                password: hash
            });
            bensAccount.save().then(() => { console.log("ben saved") })
        });



    })

    .catch(err => console.log(err));


function createAccount(name, email, password) {
    return hashPassword(password).then((hash) => {
        const newAccount = new account({
            email: email,
            name: name,
            balance: 0,
            password: hash
        });
        return newAccount.save().then(() => { console.log("account saved") })
    });


}




function getAccount(email) {
    // return new Promise((resolve, reject) => { resolve(bank.accounts[email]) })

    return account.findOne({ email: email }).then();


}

function updateAccount(updatedAccount) {
    return account.updateOne({ email: updatedAccount.email }, updatedAccount).exec().then(() => updateAccount);


}



function hashPassword(password) {

    const saltRounds = 10; // Number of salt rounds
    return bcrypt.hash(password, saltRounds);

};




module.exports = {
    getAccount, updateAccount, hashPassword, createAccount
}
