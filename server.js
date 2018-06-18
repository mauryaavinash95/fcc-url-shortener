'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/api/shorturl/new', function(req, res){
    
});

// DB Connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL)
    .then((resolve) => {
        console.log("Connection with MongoDB server successful: ", process.env.MONGODB_URL);
    })
    .then(()=>{
      app.listen(port, function () {
        console.log('Node.js listening ...');
      });
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB caught: ", err);
    });
