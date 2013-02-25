/**
 * Module exports
 */
var express = require("express")
  , io = require("socket.io")
  , backend = require("./lib/backend");

/**
 * Expose the app
 */
var app = module.exports = express();

/**
 * Configure the app
 */
app.configure("development", function(){
  app.locals.pretty = true;
  app.use(express.logger("dev"));
});

app.configure(function(){
  app.set("x-powered-by", false);
  app.use(express.static(__dirname+"/public"));
  app.use(express.static(__dirname+"/build"));
});

app.on("ready", function(server) {
  var ws = io.listen(server);

  ws.sockets.on('connection', function(socket) {

  });
});

/**
 * Expose backend
 */
// app.lookup = backend();
