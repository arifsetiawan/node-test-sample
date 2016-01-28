
'use strict';

const Promise = require('bluebird');
const Mongoose = Promise.promisifyAll(require("mongoose"));

Mongoose.connect(config.mongodb.connectionUri);
global.Mongoose = Mongoose


Mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + config.mongodb.connectionUri);
}); 

// If the connection throws an error
Mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
Mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  Mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 