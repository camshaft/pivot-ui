/**
 * Module exports
 */
var express = require("express")
  , io = require("socket.io")
  , db = require("simple-db");

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
  app.use(express.favicon());
  app.use(express.static(__dirname+"/public"));
  app.use(express.static(__dirname+"/build"));
});

app.on("ready", function(server) {
  var ws = io.listen(server);

  var clientChannel = ws
    .on('connection', function(socket) {
      // TODO auth

      db.get("applications-list", "list", function(err, applications) {
        socket.emit("applications", applications);
      });

      socket.on("feature", function(appName, feature, variants) {
        db.get("applications", appName, function(err, application) {
          if(!application) application = {};
          if(!application.features) application.features = {};

          application.features[feature] = {
            variants: variants,
            config: {
              enabled: false,
              users: [],
              groups: [],
              buckets: {}
            }
          };

          db.put("applications", appName, application, function(err) {
            socket.emit(appName, application);
            socket.broadcast.emit(appName, application);

            db.get("applications-list", "list", function(err, applications) {
              if(!applications) applications = [];

              if(applications.indexOf(appName) === -1) applications.push(appName);

              db.put("applications-list", "list", applications, function() {
                socket.emit("applications", applications);
                socket.broadcast.emit("applications", applications);
              });
            });
          });
        });
      });

      socket.on("application", function(application, fn) {
        // Ask the database
        db.get("applications", application, function(err, data) {
          fn(data);
        });
      });

      socket.on("application-update", function(appName, application) {
        console.log("updating", appName);
        db.put("applications", appName, application, function(err) {
          socket.broadcast.emit(appName, application);
        });
      })
    });
});
