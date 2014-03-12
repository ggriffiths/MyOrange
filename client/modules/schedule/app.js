// Development: viewing from //client/modules/schedule/index.html
// Production: viewing from //client/main.html#/schedule
DEVELOPMENT = true;
myApp = DEVELOPMENT ? angular.module('myApp',[]) : angular.module('myApp');

// Angular Factories
myApp.factory('Classes', function() {
  Classes = scheduledata.getClasses();
  return Classes;
}).factory('Events', function() {
  Events = schedule.events;
  return Events;
}).factory('User', function() {
  User = user;
  return User;
});

// Angular Controllers
ScheduleCtrl = function($scope, User) {
  $scope.user = User;
};

CalendarCtrl = function($scope, User) {
  //$scope.user.calendars = [];
  //if ($scope.calendars == []) 
  $scope.getSelected = function() {
    var selected = [];
    for (i in $scope.user.calendars)
      if ($scope.user.calendars[i].selected)
        selected.push($scope.user.calendars[i].id);
    console.log(selected);
    return selected;
  };
  //                         'id':$scope.user.email,
  //                         'selected':true});
  $scope.refreshCalendar = schedule.refreshCalendar;
  $scope.authorize = function() {
    $scope.user.authorize(function() {
      $scope.user.initEmail(function() {
        gCal.getCalendarList(function(r) {
          $scope.user.calendars = r.items;
	  $scope.$apply();
        });
	schedule.refreshCalendar($scope.user);
      });
    });
    document.getElementById('auth').hidden = true;
  };
  window.scope = $scope
};

SidebarCtrl = function($scope, Classes, Events){
  $scope.classes = Classes;
  
  $scope.data = {};
  $scope.data.semester = $scope.classes['Fall 2014'];
  $scope.data.prefix = $scope.data.semester['CIS'];
  $scope.data.course = $scope.data.prefix['351'];
  
  $scope.events = {};
  $scope.events.AddPanel = Events.AddPanel;
  $scope.events.AddToCalendar = Events.AddToCalendarButton;
};


/**
  Schedule functions will be contained in the schedule object to
  protect the namespace
  The {schedule.events} object will contain event listeners, click
  functions, etc.
  The {schedule.
*/
var schedule = {}

/*
  schedule.getDegreePlanFromSemester - gets a list of classes
  to add to the calendar for the semester
*/
schedule.getDegreePlanFromSemester = function(semester, user) {
  var degreePlan = user.degreePlan;
  for (var i in degreePlan)
    if (s == degreePlan[i].name)
      return degreePlan[i].courseList;
  alert('That semester is not in your degree plan!');
};

/*
  schedule.addSemesterFromDegreePlan - adds an entire semester
  of classes from the degree plan
  {string} semester - the semester to add
*/
schedule.addSemesterFromDegreePlan = function(semester, user) {
  var classes = schedule.getDegreePlanFromSemester(semester, user);
  var calendarId = user.getCalendarId(semester);
  if (!calendarId) { 
    gCal.createCalendar(semester, function(r) {
        user.calendars.push({
         'name': semester,
         'id' : r.id
        });
        schedule.addSemesterFromDegreePlan(semester, user);
      });
    alert('Creating calendar for ' + semester);
    return;
  }
  for (var i in classes) {
    var course = classes[i];
    calendar_event = gCal.createEvent(calendarId,
                                      semester,
                                      course.name,
                                      course.description,
                                      course.loc,
                                      course.start,
                                      course.end,
                                      course.days);
    gCal.calendarEventRequest(calendar_event);
  };
  schedule.refreshCalendar(user);
};

/*
  schedule.addToCalendar - takes the Class from the field and adds
  it to the user's google calendar.
  returns: boolean success/failure
*/
schedule.addToCalendar = function(course, user) {
  var calendarId = user.getCalendarId(course.semester);
  if (!calendarId) {
    gCal.createCalendar(course.semester, function(r) {
        user.calendars.push({
          'name': semester,
          'id' : r.id
         });
        schedule.addToCalendar(course, user);
    });
    alert('Creating calendar for ' + course.semester);
    return;
  }
  calendar_event = gCal.createEvent(calendarId,
                                    course.semester,
                                    course.name,
                                    course.description,
                                    course.loc,
                                    course.start,
                                    course.end,
                                    course.days);
  // TODO: Handle case where multiple calendar events must be made
  gCal.calendarEventRequest(calendar_event);
  schedule.refreshCalendar(user);
}

/*
  schedule.refreshCalendar - reloads the google calendar iframe
  returns true
*/
schedule.refreshCalendar = function(user, calendarId) {
  calendarId = calendarId || [user.getEmail(schedule.refreshCalendar)];
      
  cal_string = 'https://www.google.com/calendar/embed?&showTitle=0&showNav=0&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&ctz=America%2FNew_York&src=' + calendarId.join('&src=');
  iframe = document.getElementById('cal');
  iframe.src = cal_string;
};


/*
  EVENTS
  All event functions for the scheduler
*/

schedule.events = {}

schedule.events.AddPanel = function(degreePlan) {
  document.getElementById('selectAction').hidden = true;
  document.getElementById('addClass').hidden = false;
  document.getElementById('prefix').hidden = degreePlan;
  document.getElementById('course').hidden = degreePlan;
}

schedule.events.CancelButton = function() {
  document.getElementById('addClass').hidden = true;
  document.getElementById('selectAction').hidden = false;
}

schedule.events.AddToCalendarButton = function(user, degreePlan, semester, course) {
  if (degreePlan) schedule.addSemesterFromDegreePlan(
      semester, user);
  else schedule.addToCalendar(course, user);
}
