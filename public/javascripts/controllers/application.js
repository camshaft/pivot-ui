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
    });
  };

  io.emit("application", appName, handleFeatures);
  io.on(appName, handleFeatures);

  $scope.$watch("application", function(oldVal, newVal) {
    if(!oldVal || !newVal) return;
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
