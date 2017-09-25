// server.js
// where your node app starts

// init project
var express = require('express');
var cors = require('cors')
var app = express()
app.use(cors())

const preview = require('./generatePreview.js')
let total = 0

let cache = []
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/total", function (request,response){
  response.send(total.toString());
})

app.get("/", function (request, response) {
  total++;
  preview(request.query.link, request.query.format, a => response.send(a) );
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
