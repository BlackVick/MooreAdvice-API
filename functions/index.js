const functions = require("firebase-functions");

//admin
var admin = require("firebase-admin");
var serviceAccount = require("./permisions.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mooreadvice-test.firebaseio.com",
});

//firestore
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

const express = require("express");
const api = express();

//cors
const cors = require("cors");
api.use(cors({ origin: true }));

//routes
const init = require("./src/routes/Routes");
init(api);

//export api to cloud functions
exports.api = functions.https.onRequest(api);
