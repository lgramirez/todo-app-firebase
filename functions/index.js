// const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const app = require("express")();
const { getAllTodos } = require("./APIs/todos");

app.get("/todos", getAllTodos);
exports.api = functions.https.onRequest(app);
