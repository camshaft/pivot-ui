/*
 * Module dependencies
 */
var app = require("..")
  , superagent = require("superagent");

/*
 * MenuController
 */
function MenuController($scope, $routeParams) {
  superagent
    .get("api")
    .end(function(err, res) {
      $scope.$apply(function() {
        // TODO handle error
        $scope.apps = res.body.applications;
      });
    });

  $scope.$routeParams = $routeParams;

  $scope.$watch('$routeParams', function() {
    $scope.currentApp = $routeParams.app;
  }, true);
};

/*
 * Register it with angular
 */
app.controller(MenuController.name, [
  '$scope',
  '$routeParams',
  MenuController
]);

/*
 * Let others know where to find it
 */
module.exports = MenuController.name;
