/**
 * Module dependencies
 */
var stack = require("simple-stack-common")
  , ui = require("..");

var app = module.exports = stack();

// Relay the server on to the ui to install socket.io
app.on("ready", function(server) {
  ui.emit("ready", server);
});

app.useBefore("router", ui);
