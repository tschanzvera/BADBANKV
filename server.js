var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./database.js');
var admin = require('./admin.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors())

app.get("/health", (req, res) => {
    res.send("hello")


})

app.put("/deposit", (req, res) => {
    checkAuthentication(req, res)
        .then(token => changeBalance(req.query.amount, 1, token.email))
    res.send("money has been deposited")
})

app.put("/withdraw", (req, res) => {
    changeBalance(req.query.amount, -1)
    res.send("money has been withdrawn")
})





function changeBalance(amount, sign, email, response) {


    if (typeof amount !== 'number' || amount <= 0) {
        console.error("Invalid amount");
        response.status(400).send("invalid amount");
    }

    database.getAccount(email)
        .then(currentAccount => {

            if (currentAccount) {
                // Update the balance of the current account
                currentAccount.balance = currentAccount.balance + amount * sign;
                database.updateAccount(currentAccount)
                    .then(() => {
                        console.log(` New balance: ${currentAccount.balance}`);
                        response.send(currentAccount.balance);

                    }).catch(() =>{
                        response.status(500).send();

                    })

            } else {
                console.error("No current account selected");
                response.status(400).send("no such account");
            }
        })

}

function checkAuthentication(req, res) {


    // read token from header
    const idToken = req.headers.authorization
    console.log('header:', idToken);

    if (!idToken) {
        res.status(401).send();
        return
    }
    //check, did they pass us the token?
    //if not, do a 401 error
    //check if verify id token was successful
    //if not, do 401

    //verify token, is this token valid?
    return admin.auth().verifyIdToken(idToken)
        .catch(function (error) {
            console.log('error:', error);
            res.status(401).send("Token invalid!");

        });

}






var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);