/*
 * Module dependencies
 */
var app = require(".");

/**
 * Initialize the controllers
 */
var IndexController = require("./controllers/index")
  , ApplicationController = require("./controllers/application")
  , MenuController = require("./controllers/menu");

/**
 * Initialize the directives used outside of the controllers
 */
require("./directives/pillbox");
require("./directives/slider");

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "partials/index.html",
        controller: IndexController
      })
      .when("/apps/:app", {
        templateUrl: "partials/application.html",
        controller: ApplicationController
      })
      .otherwise({
        redirectTo: "/"
      });
  }
]);
