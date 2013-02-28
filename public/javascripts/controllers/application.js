/*
 * Module dependencies
 */
var app = require("..")
  , ioService = require("../services/io");

/*
 * ApplicationController
 */
function ApplicationController($scope, $routeParams, io) {
  var appName = $scope.appName = $routeParams.app;

  function handleFeatures(application) {
    $scope.$apply(function() {
      $scope.application = application;
      $scope.serverUpdate = true;
    });
  };

  io.emit("application", appName, handleFeatures);
  io.on(appName, handleFeatures);

  $scope.$watch("application", function(newVal, oldVal) {
    if(!oldVal || !newVal) return;
    if($scope.serverUpdate) return $scope.serverUpdate = false;
    // TODO check if this is an update from the other end
    // TODO remove all of the garbage properties angular puts on our obj
    io.emit("application-update", appName, newVal);
  }, true);
};

/*
 * Register it with angular
 */
app.controller(ApplicationController.name, [
  '$scope',
  '$routeParams',
  ioService,
  ApplicationController
]);

/*
 * Let others know where to find it
 */
module.exports = ApplicationController.name;
