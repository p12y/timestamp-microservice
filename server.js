'use strict';

var fs = require('fs');
var express = require('express');
var router = express.Router();    
var app = express();
var months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'
]

if (!process.env.DISABLE_XORIGIN) {
  app.use(function(req, res, next) {
    var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
    var origin = req.headers.origin || '*';
    if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
         console.log(origin);
         res.setHeader('Access-Control-Allow-Origin', origin);
         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
    next();
  });
}

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    console.log('requested');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })

app.route('/*')
    .get(function(req, res) {
      var url = decodeURIComponent(req.url)
        .slice(1)
        .replace(/\//g, ' ');
      var natDate, unixDate; 
  
      // handle unix
      if (!isNaN(url)) {
        natDate = new Date(url * 1000);
        unixDate = url;
      } else {
      // handle natural language
        natDate = new Date(url);
        unixDate = Math.floor(natDate / 1000)
      }
  
      if (!isNaN(natDate.getTime())) {
        var month = months[natDate.getMonth()]
        res.json({unix: unixDate, natural: natDate.toDateString()});
      } else {
        res.json({unix: null, natural: null});
      }
    })

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

