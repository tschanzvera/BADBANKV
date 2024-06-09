var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./database.js');
var admin = require('./admin.js');



app.use(express.json()) 

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors())

app.get("/health", (req, res) => {
    res.send("hello")


})

app.put("/account", (req, res) => {
    let sign;
    if (req.query.action === "deposit")
        sign = 1;
    else
        sign = -1;
    checkAuthentication(req, res)
        .then((token) => changeBalance(req.query.amount, sign, token.email))

})


app.post("/login", (req, res) => {
   
    const email = req.body.email
    const password = req.body.password

    login(email, password, res)


})

function login(email, password, res) {
    admin.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const token = userCredential.user.getIdToken();
            database.getAccount(email)
                .then((account) => res.send({ ...account, token }))
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            res.status(errorCode).send(errorMessage)
        });

}




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

                    }).catch(() => {
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