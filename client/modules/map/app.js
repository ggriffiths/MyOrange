//Global variables
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var dayOfWeek;

//Initialize the map
function initialize() 
{
  directionsDisplay = new google.maps.DirectionsRenderer();
  var syracuse = new google.maps.LatLng(43.037633, -76.134011);
  var mapOptions = 
  {
    zoom: 17,
    center: syracuse,
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  directionsDisplay.setMap(map);
}

//Calculate the route depending on the day of the week chosen or if the day is null calculate with two given buildings
function calcRoute() 
{
  dayOfWeek = document.getElementById('Day').value;

  //Create a start and end point with Shaw and Ernie as the locations
  var start = new google.maps.LatLng(43.036754, -76.129495);
  var end = new google.maps.LatLng(43.039699, -76.129692);

  //Check the day of the week value to know the other buildings to use as waypoints
  if (dayOfWeek == "Monday" || dayOfWeek == "Wednesday")
  {
    // Create the request for the map
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [
        { location:new google.maps.LatLng(43.037676, -76.132604), stopover:true},
        { location:new google.maps.LatLng(43.036586, -76.133988), stopover:true},
        { location:new google.maps.LatLng(43.038640, -76.132030), stopover:true} ],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING
    };
  }
  else if(dayOfWeek == "Tuesday" || dayOfWeek == "Thursday")
  {
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [
        { location:new google.maps.LatLng(43.036790, -76.132390), stopover:true},
        { location:new google.maps.LatLng(43.037735, -76.130614), stopover:true},
        { location:new google.maps.LatLng(43.037052, -76.134686), stopover:true},
        { location:new google.maps.LatLng(43.038233, -76.134530), stopover:true}, ],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING
    };
  }
  else if(dayOfWeek == "Friday")
  {
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [
        { location:new google.maps.LatLng(43.035962, -76.134551), stopover:true}, ],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };
  }
  
  // Day of the week is blank so use the current building options as the start and end values
  else if(dayOfWeek == "null")
  {
    start = document.getElementById('start').value;
    end = document.getElementById('end').value;
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };
  }

//Dont show the directions
    directionsService.route(request, function(response, status) 
    {
      if (status == google.maps.DirectionsStatus.OK) 
      {
        directionsDisplay.setDirections(response);
      }
    });

/*
//Show Directions, not currently needed but can be used if wanted

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById("directions_panel");
        summaryPanel.innerHTML = "";
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += "<b>Route Segment: " + routeSegment + "</b><br />";
          summaryPanel.innerHTML += route.legs[i].start_address + " to ";
          summaryPanel.innerHTML += route.legs[i].end_address + "<br />";
          summaryPanel.innerHTML += route.legs[i].distance.text + "<br /><br />";
        }
      } else {
        alert("directions response "+status);
      }
    });
*/
}

// Event handler for when the page loads
google.maps.event.addDomListener(window, 'load', initialize);