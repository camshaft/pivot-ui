/*
 * Module dependencies
 */
var app = require("..")
  , Pillbox = require("pillbox")
  , each = require("each");

/*
 * pillbox
 */
function pillbox() {
  return function($scope, $elem, attrs) {
    var input = Pillbox($elem[0]);

    var list = $scope.$eval(attrs.pillbox);

    each(list, function(item) {
      input.add(item);
    });

    input.on("add", function(tag) {
      $scope.$apply(function() {
        list.push(tag);
      });
    });

    input.on("remove", function(tag) {
      $scope.$apply(function() {
        list.splice(list.indexOf(tag), 1);
      });
    });
  };
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
