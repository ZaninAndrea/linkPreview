// server.js
// where your node app starts

// init project
const extRequest = require("request")
var express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())

const preview = require('./generatePreview.js')

let cache = []
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (request, response) {
  preview(request.query.link, request.query.format, a => response.send(a) );
  
  const url = 'https://count1up.herokuapp.com/up/linkpreview?secret=537e7782a6379efc5623a2f4bbdb87c6'

  extRequest(url, function(error, response, body) {
    console.log(body)
  })
  
});



// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
