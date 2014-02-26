'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('NavCtrl', [function() {
  	if(window.location.href=="http://localhost:8000/client/main.html#/map"){
		document.getElementById("map-canvas").style.visibility="visible";
  	}
  	else
  	{
		document.getElementById("map-canvas").style.visibility="hidden";
  	}
  }]);