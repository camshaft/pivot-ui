/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("superagent");

/*
 * FeatureController
 */
function FeatureController($scope, $routeParams) {
  superagent
    .get($scope.feature.href)
    .end(function(err, res) {
      $scope.$apply(function() {
        // TODO handle error
        $scope.settings = res.body;
      });
    });

  $scope.submit = function(method, action, form) {
    console.log(form);
    superagent(method, action)
      .send(form)
      .end(function(err, res) {
        console.log(res.ok);
      });
  };
};

/*
 * Register it with angular
 */
app.controller(FeatureController.name, [
  '$scope',
  '$routeParams',
  FeatureController
]);

/*
 * Let others know where to find it
 */
module.exports = FeatureController.name;
