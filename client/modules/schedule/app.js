/**
  app.js - the main javascript file for the schedule index.html
  includes angular functions/factories/ctrlrs as well as necessary
  schedule functions. Schedule functions are contained in the
  {schedule} namespace and events in the {schedule.events} namespace

  Dependencies:
  ./user.js
  ./data.js
  ./calendar-api.js
  angular.js

  TODO: isolate angular app/factories/controllers from schedule
  JavaScript and inject schedule via factory
*/

// Development: viewing from //client/modules/schedule/index.html
// Production: viewing from //client/main.html#/schedule
DEVELOPMENT = true;
myApp = DEVELOPMENT ? angular.module('myApp',[]) : angular.module('myApp');

/*
  Angular Factories
  Classes: course info
  Events: event listeners
  User: access user data
*/
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

/*
  Angular Controllers
  ScheduleCtrl - used 'globally' to access user data
  CalendarCtrl - user in panes that need access to calendar information
  SidebarCtrl - used for info display / event control
  TODO: try to move $scope.authorize to ScheduleCtrl, it doesn't really
        line up with the objectives of CalendarCtrl
*/
ScheduleCtrl = function($scope, User) {
  $scope.user = User;
};

CalendarCtrl = function($scope) {
  $scope.getSelected = function() {
    var selected = [];
    for (i in $scope.user.calendars)
      if ($scope.user.calendars[i].selected)
        selected.push($scope.user.calendars[i].id);
    return selected;
  };
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

var schedule = {}

/*
  schedule.getDegreePlanFromSemester - auxiliary to get a list of
  classes to add to the calendar for the semester
  {string} semester - the semester for which to add classes
  {object} user - pass in the user to access user's degree plan
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
  {object} user - pass in the user to access user's degree Plan
*/
schedule.addSemesterFromDegreePlan = function(semester, user) {
  var classes = schedule.getDegreePlanFromSemester(semester, user);
  var calendarId = user.getCalendarId(semester);
  if (!calendarId) { 
    console.log('Must Create Calendar!');
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
  {object} course - contains course info to add
  {object} user - pass user info to make new calendar if necessary
  returns: {boolean} success/failure
*/
schedule.addToCalendar = function(course, user) {
  var calendarId = user.getCalendarId(course.semester);
  if (!calendarId) {
    gCal.createCalendar(course.semester, function(r) {
      user.calendars.push(r);
      schedule.addToCalendar(course,user);
    });
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
  // TODO: Handle case of multiple calendar events per class
  gCal.calendarEventRequest(calendar_event);
  schedule.refreshCalendar(user);
}

/*
  schedule.refreshCalendar - reloads the google calendar iframe
  {object} user - user data (email required)
  {string} calendarIds - list of calendarIds to display
*/
schedule.refreshCalendar = function(user, calendarIds) {
  //TODO: remember why the fuck i getEmail(sch.refCal)...it takes no args...back to user.email for now...
  calendarIds = calendarIds || [user.email];
      
  cal_string = 'https://www.google.com/calendar/embed?&showTitle=0&showNav=0&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&ctz=America%2FNew_York&src=' + calendarIds.join('&src=');
  iframe = document.getElementById('cal');
  iframe.src = cal_string;
};


/*
  EVENTS
  All event functions for the scheduler
*/

schedule.events = {}

/*
  schedule.events.AddPanel - transitions for action select to displaying
  the interface to add a class or a degree plan
  {boolean} degreePlan - true if adding degree plan, false if single class
*/
schedule.events.AddPanel = function(degreePlan) {
  document.getElementById('selectAction').hidden = true;
  document.getElementById('addClass').hidden = false;
  document.getElementById('prefix').hidden = degreePlan;
  document.getElementById('course').hidden = degreePlan;
}

/*
  schedule.events.CancelButton - returns back to displaying the action
  selection menu
*/
schedule.events.CancelButton = function() {
  document.getElementById('addClass').hidden = true;
  document.getElementById('selectAction').hidden = false;
}

/*
  schedule.events.AddToCalendarButton - triggers adding class(es) to
  calendar
  {object} user - pass in user info to use in other functions
  {boolean} degreePlan - true if adding degree plan, false if single class
  {string} semester - to specify which semester of the degree plan
  {object} course - course data necessary to create event
*/
schedule.events.AddToCalendarButton = function(user, degreePlan, semester, course) {
  if (degreePlan) schedule.addSemesterFromDegreePlan(
      semester, user);
  else schedule.addToCalendar(course, user);
}
