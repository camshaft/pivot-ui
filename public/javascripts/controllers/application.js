/*
 * Module dependencies
 */
var app = require("..");

/*
 * ApplicationController
 */
function ApplicationController($scope, $routeParams) {
  $scope.appName = $routeParams.app;

  $scope.features = [
    {
      config: {
        users: ["scott", "cameron"],
        groups: [],
        split: {
          "testing1": 30,
          "testing2": 30,
          "testing3": 40
        }
      },
      info: {
        name: "featureOne",
        variants: ["testing1", "testing2", "testing3"]
      }
    },
    {
      config: {
        users: ["dave"],
        groups: ["beta"],
        split: {}
      },
      info: {
        name: "featureTwo",
        variants: [true, false]
      }
    }
  ]
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
