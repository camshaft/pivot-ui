/*
 * Module dependencies
 */
var app = require("..")
  , each = require("each");

/*
 * pillbox
 */
function pillbox() {
  return {
    template: '<div class="pillbox">'+
                '<ul>'+
                  '<li data-ng-repeat="tag in tags""><span data-ng-bind="tag"></span><a data-ng-click="remove(tag)">✕</a></li>'+
                '</ul>'+
                '<form style="display: inline-block;" data-ng-submit="add(input)"><input type="text" class="pillbox" data-ng-model="input"></form>'+
              '</div>',
    scope: true,
    replace: true,
    restrict: 'A',
    link: function($scope, $elem, $attrs) {
      $scope.tags = $scope.$eval($attrs.pillbox) || [];

      $scope.add = function(value) {
        if($scope.tags.indexOf(value) !== -1) return;
        $scope.tags.push(value);
        $scope.input = "";
      };

      $scope.remove = function(value) {
        $scope.tags.splice($scope.tags.indexOf(value), 1);
      };

      $scope.$watch($attrs.pillbox, function(value) {
        $scope.tags = value;
      });
    }
  }
};

/*
 * Register it with angular
 */
app.directive(pillbox.name, [
  pillbox
]);

/*
 * Let others know where to find it
 */
module.exports = pillbox.name;
