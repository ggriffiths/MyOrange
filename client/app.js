'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/schedule', {templateUrl: 'modules/schedule/schedule.html', controller: 'MyCtrl1'});
  $routeProvider.when('/map', {templateUrl: 'modules/map/map.html', controller: 'MyCtrl2'});
  $routeProvider.when('/communicator', {templateUrl: 'modules/communicator/communicator.html', controller: 'MyCtrl2'});
  $routeProvider.when('/degree', {templateUrl: 'modules/degree/degree.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
