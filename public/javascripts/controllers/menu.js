/*
 * Module dependencies
 */
var app = require("..");

/*
 * MenuController
 */
function MenuController($scope, $routeParams) {
  $scope.apps = [
    {name: "photos"},
    {name: "landing"},
    {name: "home"},
    {name: "profile"}
  ];

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
