/*
 * Module dependencies
 */
var app = require("..")
  , ioService = require("../services/io");

/*
 * MenuController
 */
function MenuController($scope, $routeParams, io) {
  io.on("applications", function(apps) {
    $scope.$apply(function() {
      $scope.apps = apps;
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
  ioService,
  MenuController
]);

/*
 * Let others know where to find it
 */
module.exports = MenuController.name;
