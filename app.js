/**
 * Module exports
 */
var express = require("express")
  , redis = require("redis")
  , url = require("url");

/**
 * Expose the app
 */
var app = module.exports = express();

app.configure(function(){
  app.set("redis url", "redis://localhost:6379");
  app.set("prefix", "pivot");

  app.use(function forceTrailingSlash(req, res, next) {
    if(req.url === "/" && req.originalUrl[req.originalUrl.length-1] !== "/") return res.redirect(req.originalUrl+"/");
    next();
  });

  app.use(express.static(__dirname+"/public"));
  app.use(express.static(__dirname+"/build"));
});

/**
 * Create the api
 */
var api = express()
  , db = createClient(app.get("redis url"))
  , prefix = app.get("prefix");

// Mount the api
app.use("/api", api);

api.get("/", function(req, res, next) {
  db.smembers(join(prefix,"applications"), function(err, applications) {
    if(err) return next(err);

    var response = {
      applications: []
    };

    applications.forEach(function(application) {
      response.applications.push({
        title: application,
        href: req.resolve(application)
      });
    });

    res.send(response);
  });
});

api.get("/:app", function(req, res, next) {
  var application = req.params.app;
  db.smembers(join(prefix,application,"features"), function(err, features) {

    var response = {
      title: application,
      features: []
    };

    features.forEach(function(feature) {
      response.features.push({
        title: feature,
        href: req.resolve(application,"features",feature)
      });
    });

    res.send(response);
  });
});

api.get("/:app/features/:feature", function(req, res, next) {
  var application = req.params.app
    , name = req.params.feature;

  db.hgetall(join(prefix,application,name), function(err, feature) {
    // Normalize the values from redis
    Object.keys(feature).forEach(function(prop) {
      feature[prop] = JSON.parse(feature[prop]);
    });

    feature.groups.forEach(function(variant, idx) {
      variant.update = {
        action: req.resolve(application,"features",name,"variants",idx),
        method: "POST",
        fields: {
          users: {value: variant.users, label: "Users"},
          weight: {value: variant.weight, label: "Weight"}
        }
      };
    });

    feature.update = {
      action: req.resolve(application,"features",name),
      method: "POST",
      fields: {
        enabled: {value: feature.enabled, label: "Enabled"},
        released: {value: feature.released, label: "Deprecated"},
        control: {value: feature.control, label: "Control"},
        target: {value: feature.target, label: "Target"}
      }
    }

    res.send(feature);
  });
});

api.post("/:app/features/:feature", function(req, res, next) {
  var application = req.params.app
    , name = req.params.feature;

  var feature = {};

  if(typeof req.body.enabled !== "undefined") feature.enabled = JSON.stringify(req.body.enabled.value);
  if(typeof req.body.released !== "undefined") feature.released = JSON.stringify(req.body.released.value);
  if(typeof req.body.control !== "undefined") feature.control = JSON.stringify(req.body.control.value);
  if(typeof req.body.target !== "undefined") feature.target = JSON.stringify(req.body.target.value);

  if(!Object.keys(feature).length) return res.send(204);

  db.hmset(join(prefix,application,name), feature, function(err) {
    if(err) return next(err);
    res.send(204);
  });
});

api.post("/:app/features/:feature/variants/:variant", function(req, res, next) {
  var application = req.params.app
    , feature = req.params.feature
    , idx = req.params.variant
    , key = join(prefix,application,feature);

  db.hmget(key, "groups", function(err, variants) {
    if(err) return next(err);
    variants = JSON.parse(variants);

    var variant = variants[idx];

    if(req.body.weight) variant.weight = JSON.parse(req.body.weight);
    if(req.body.users) variant.users = req.body.users;

    variants[idx] = variant;

    db.hmset(key, "groups", JSON.stringify(variants), function(err) {
      if(err) return next(err);
      res.send(204);
    });
  });
});

function join() {
  return Array.prototype.join.call(arguments, ":");
};

/**
 * Create a redis client from a url
 *
 * @api private
 */
function createClient(redisUrl) {
  var options = url.parse(redisUrl)
    , client = redis.createClient(options.port, options.hostname);

  // Authorize the connection
  if (options.auth) client.auth(options.auth.split(":")[1]);

  // Exit gracefully
  function close() {
    client.end();
  };
  process.once("SIGTERM", close);
  process.once("SIGINT", close);

  return client
};