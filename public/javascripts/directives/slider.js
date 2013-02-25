/*
 * Module dependencies
 */
var app = require("..");

/*
 * slider
 */
function slider() {
  return function($scope, $elem, attrs) {

  };
};

/*
 * Register it with angular
 */
app.directive(slider.name, [
  slider
]);

/*
 * Let others know where to find it
 */
module.exports = slider.name;
