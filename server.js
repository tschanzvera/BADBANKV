var express = require('express');
var app = express();
var cors = require('cors');
var database = require('./database.js');
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

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors())

app.get("/health", (req, res) => {
    res.send("hello")


})

app.put("/deposit", (req, res) => {
    changeBalance(req.query.amount, 1)
    res.send("money has been deposited")
})

app.put("/withdraw", (req, res) => {
    changeBalance(req.query.amount, -1)
    res.send("money has been withdrawn")
})





function changeBalance( amount, sign) {
    

    if (typeof amount !== 'number' || amount <= 0) {
        console.error("Invalid withdrawal amount");
        return bank;
    }

    const newState = { ...bank };

    if (newState.currentAccount) {
        // Update the balance of the current account
        newState.accounts[newState.currentAccount].balance += amount * sign;
        console.log(` New balance: ${newState.accounts[newState.currentAccount].balance}`);
    } else {
        console.error("No current account selected");
    }

    return newState;
}










var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);