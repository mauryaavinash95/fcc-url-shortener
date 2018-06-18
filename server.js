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
var {URL} = require('./schema');

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('public'));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.get("/", function(request, response){
  return response.send("Hit /api/shorturl/new with original_url as key");
})

app.post('/api/shorturl/new', function(request, response){
    let {original_url} = request.body;
    console.log("Original URL: ", original_url);
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!original_url.match(regex)){
      console.log("Original URL is invalid")
      return response.send({"error":"invalid URL"});
    }
    let lookup_url = original_url.split("//")[1];
    URL.findOne({original_url})
    .then(res=>{
      if(res){
        console.log("Found original URL in DB");
        return response.send({original_url: res.original_url, short_url: res.short_url});
      } else {
        lookup(lookup_url)
        .then(res=>{
          console.log("DNS lookup: ", res);
          return insert(original_url);
        })
        .then(res=>{
          console.log("Response in server is: ", res);
          response.send({original_url: res.original_url, short_url: res.short_url});
        })
      }
    })
    .catch(err=>{
      console.log("Error is: ", err);
      response.send({"error":"invalid URL"});
      return err;
    })
});

app.get("/api/shorturl/:id", function(request, response){
  let id = request.params.id;
  console.log("Got id: ", id);
  URL.findOne({short_url: id})
  .then(res=>{
    if(res)
      response.redirect(res.original_url);
    else
      response.send({error: "No such short_url found"});
  })
  .catch(err=>{
    response.send({error: "Got Error"});
  })
})

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
