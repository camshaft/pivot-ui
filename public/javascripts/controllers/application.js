/*
 * Module dependencies
 */
var app = require("..")
  , feature = require("./feature")
  , superagent = require("superagent");

/*
 * ApplicationController
 */
function ApplicationController($scope, $routeParams) {
  var appName = $routeParams.app;

  superagent
    .get("api/"+appName)
    .end(function(err, res) {
      $scope.$apply(function() {
        // TODO handle error
        $scope.app = res.body;
      });
    });

};

/*
 * Register it with angular
 */
app.controller(ApplicationController.name, [
  '$scope',
  '$routeParams',
  ApplicationController
]);

/*
 * Let others know where to find it
 */
module.exports = ApplicationController.name;
