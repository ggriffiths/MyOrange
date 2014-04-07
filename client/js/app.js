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
  $routeProvider.when('/schedule', {templateUrl: '/modules/schedule/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/map', {templateUrl: '/modules/map/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/communicator', {templateUrl: '/modules/communicator/index.html', controller: 'NavCtrl'});
  $routeProvider.when('/degree', {templateUrl: '/modules/degree/index2.html', controller: 'NavCtrl'});
  $routeProvider.otherwise({redirectTo: '/schedule'});
}]);

function login(){
  var formData = {
    email:document.getElementById("loginEmailInput").value,
    password:document.getElementById("loginPasswordInput").value
  }; 

  $.ajax({
      url : "http://localhost:8000/api/login",
      type: "POST",
      data : formData,
      success: function(data, textStatus, jqXHR)
      {
          writeCookie('currentUser', formData.email, 3);
          window.location = "http://localhost:8000/main.html";
          alert(String(readCookie('currentUser')));
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          alert("Incorrect Login Information");
          window.location = "http://localhost:8000/#myLoginModal";
      }
  });
}


function register(){

  if(document.getElementById("passwordRegister").value==document.getElementById("passwordRegister2").value){
    var formData = {
      displayName:document.getElementById("passwordRegister").value,
      email:document.getElementById("emailRegister").value,
      major:document.getElementById("majorRegister").value,
      year:document.getElementById("graduationRegister").value,
      password:document.getElementById("passwordRegister").value,
      courses:[]
    }; 

    $.ajax({
        url : "http://localhost:8000/api/register",
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
            window.location = "http://localhost:8000/main.html";
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("Duplicate Email Detected. Try a different email address.");
            window.location = "http://localhost:8000";
        }
    });
  }
  else{
    alert("Passwords do not match");
  }

}

function updateUser(){
  var formData = {
    displayName:document.getElementById("displayNameRegister").value,
    email:document.getElementById("emailRegister").value,
    major:document.getElementById("majorRegister").value,
    year:document.getElementById("graduationRegister").value,
    password:document.getElementById("passwordRegister").value,
    courses:[]
  }; 

  $.ajax({
      url : "http://localhost:8000/api/register",
      type: "POST",
      data : formData,
      success: function(data, textStatus, jqXHR)
      {
          window.location = "http://localhost:8000/main.html";
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
          alert("Duplicate Email Detected. Try a different email address.");
          window.location = "http://localhost:8000";
      }
  });
}

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}