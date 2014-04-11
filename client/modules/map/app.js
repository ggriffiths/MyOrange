var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var dayOfWeek;

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

function calcRoute() 
{
  dayOfWeek = document.getElementById('Day').value;
  var start = new google.maps.LatLng(43.036809, -76.129461);
  var end = new google.maps.LatLng(43.039699, -76.129692);
  if (dayOfWeek == "Monday" || dayOfWeek == "Wednesday")
  {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) 
    {
      if (checkboxArray.options[i].selected == true) 
      {
        waypts.push({
            location:checkboxArray[i].value,
            stopover:true});
      }
    }
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
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) 
    {
      if (checkboxArray.options[i].selected == true) 
      {
        waypts.push({
            location:checkboxArray[i].value,
            stopover:true});
      }
    }
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [
        { location:new google.maps.LatLng(43.037676, -76.132604), stopover:true},
        { location:new google.maps.LatLng(43.037735, -76.130614), stopover:true},
        { location:new google.maps.LatLng(43.037052, -76.134686), stopover:true},
        { location:new google.maps.LatLng(43.036586, -76.133988), stopover:true}, ],
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.WALKING
    };
  }
  else
  {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
    for (var i = 0; i < checkboxArray.length; i++) 
    {
      if (checkboxArray.options[i].selected == true) 
      {
        waypts.push({
            location:checkboxArray[i].value,
            stopover:true});
      }
    }
    var request = 
    {
        origin: start,
        destination: end,
        waypoints: [
        { location:new google.maps.LatLng(43.037676, -76.132604), stopover:true}, ],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.WALKING
    };
  }

//Dont show directions
    directionsService.route(request, function(response, status) 
    {
      if (status == google.maps.DirectionsStatus.OK) 
      {
        directionsDisplay.setDirections(response);
        //var route = response.routes[0];
        //var summaryPanel = document.getElementById('directions_panel');
      }
    });

/*
//Show Directions
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
google.maps.event.addDomListener(window, 'load', initialize);