const admin = require('firebase-admin');

const serviceAccount = require("./firebase.serviceaccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

});

module.exports = admin;

