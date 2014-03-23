'use strict';
//DEVELOPMENT = true;
//myApp = DEVELOPMENT ? angular.module('myApp',[]) : angular.module('myApp');
angular.module('myApp', ['google-maps']);

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {templateUrl: 'modules/schedule/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/map', {templateUrl: 'modules/map/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/communicator', {templateUrl: 'modules/communicator/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/degree', {templateUrl: 'modules/degree/index2.html', controller: 'NavCtrl'});
  $routeProvider.otherwise({redirectTo: '/schedule'});
}]);