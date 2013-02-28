/**
 * Module dependencies
 */
var app = require("..");

/**
 * Feature Filter
 */
function feature() {
  return function(results, search) {
    if(!results) return;
    if(!search) return results;

    var newResults = {};

    Object.keys(results).forEach(function(key) {
      if(key.indexOf(search) !== -1) newResults[key] = results[key];
    });

    return newResults;
  };
};

/**
 * Register it with angular
 */
app.filter(feature.name, [
  feature
]);

/**
 * Let others know where to find it
 */
module.exports = feature.name;
