/**
 * Module dependencies
 */
var app = require("..");

/**
 * Socket.IO Service
 */
function io() {
  var client = window.io.connect();
  
  return client;
};

/**
 * Register it with angular
 */
app.factory(io.name, [
  io
]);

/**
 * Let others know where to find it
 */
module.exports = io.name;
