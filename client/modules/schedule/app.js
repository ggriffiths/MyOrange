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
});

// Angular Controllers
CalendarCtrl = function($scope) {
  $scope.refreshCalendar = schedule.refreshCalendar
  $scope.authorize = function() {
    user.authorize( function() {
      user.initEmail(schedule.refreshCalendar);
      document.getElementById('auth').hidden = true;
    });
  }  
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
schedule.getDegreePlanFromSemester = function(s) {
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
schedule.addSemesterFromDegreePlan = function(semester) {
  var classes = schedule.getDegreePlanFromSemester(semester);
  var calendarId = user.calendars[semester];
  if (!calendarId) { 
    gCal.createCalendar(user, semester, function() {
        schedule.addSemesterFromDegreePlan(semester);
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
  schedule.refreshCalendar();
};

/*
  schedule.addToCalendar - takes the Class from the field and adds
  it to the user's google calendar.
  returns: boolean success/failure
*/
schedule.addToCalendar = function(course) {
  var calendarId = user.calendars[course.semester];
  if (!calendarId) {
    gCal.createCalendar(user, course.semester, function() {
        schedule.addToCalendar(course);
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
  schedule.refreshCalendar();
}

/*
  schedule.refreshCalendar - reloads the google calendar iframe
  returns true
*/
schedule.refreshCalendar = function(calendarId) {
  calendarId = calendarId || user.getEmail(schedule.refreshCalendar);
  cal_string = 'https://www.google.com/calendar/embed?&showTitle=0&showNav=0&showPrint=0&showCalendars=0&showTz=0&mode=WEEK&src='+calendarId+'&ctz=America%2FNew_York';
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

schedule.events.AddToCalendarButton = function(degreePlan, course) {
  if (degreePlan) schedule.addSemesterFromDegreePlan(
      document.getElementById('semester').value);
  else schedule.addToCalendar(course);
}
