'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var insert = require('./insert');
var promisify = require('util').promisify;
var dns = require('dns');
var app = express();
var lookup = promisify(dns.lookup);

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('public'));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.post('/api/shorturl/new', function(request, response){
    let {original_url} = request.body;
    console.log("Original URL: ", original_url);
    lookup(original_url)
    .then(res=>{
      console.log("DNS lookup: ", res);
      return insert(original_url);
    })
    .then(res=>{
      console.log("Response in server is: ", res);
      response.send({original_url: res.original_url, short_url: res.short_url});
    })
    .catch(err=>{
      console.log("Error is: ", err);
      response.send("Bye");
    })
});

// DB Connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL)
    .then((resolve) => {
        console.log("Connection with MongoDB server successful: ", process.env.MONGO_URL);
    })
    .then(()=>{
      app.listen(port, function () {
        console.log('Node.js listening ...');
      });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB caught: ", err);
    });
