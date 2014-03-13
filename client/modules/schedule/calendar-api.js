/*
  calendar-api.js - contains various Google Calendar API calls
*/
gCal = {}

/*
  getCalendarList - retrieves all of the user's calendars
*/
gCal.getCalendarList = function(callback) {
  var request = gapi.client.request({
    'path':'/calendar/v3/users/me/calendarList?minAccessRole=owner',
  });
  callback = callback || function(r) {return;};
  request.execute(callback);
};

/*
  createCalendar - creates a new google calendar
*/
gCal.createCalendar = function(name, callback) {
  gapi.client.load('calendar','v3', function() {
    request = gapi.client.calendar.calendars.insert({
      'resource' : { 'summary': name }
    });
    request.execute( function(r) {
      if (callback) callback(r);
    });
  });
};
  
/*
  createEvent - creates an event for a class to be passed to the
  GCal API
*/
gCal.createEvent = function(calendarId,
                            semester,
                            summary,
                            description,
                            loc,
                            start,
                            end,
                            repeat,
                            until) {
  var calendar_event = {
    "calendarId": calendarId,
    "summary": summary,
    "description": description,
    "location": loc,
    "start": {
        "dateTime": start,
        "timeZone": "America/New_York"
    },
    "end": {
        "dateTime": end,
        "timeZone": "America/New_York"
    },
    "recurrence": [gCal.getRecurrence(repeat)],
  };
  return calendar_event;
};

/*
  calendarEventRequest - uses the GCal api to make an HTTP request
  object request_body: params to be used in post request
  returns: response object
*/
gCal.calendarEventRequest = function(request_body, callback) {
  var request = gapi.client.request({
    'path':'/calendar/v3/calendars/' +
           request_body.calendarId + '/events',
    'method': 'POST',
    'body': JSON.stringify(request_body)
  });
  callback = callback || function(r) {return;};
  request.execute(callback);
};

/*
  getRecurrence - converts a "MoWeFr" style string to an RFC2445 
  standard recurrence string
  {string} s: a string of days to repeat, days are abbreviated
    to two letters each: ie:"SuMoTuWeThFrSa"
  returns: the string to pass to the API request
*/
gCal.getRecurrence = function(s) {
  days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  repeat = [];
  for (var i in days) {
    if (s.search(days[i]) >= 0) repeat.push(days[i].toUpperCase());
  }
  rrule = 'RRULE:FREQ=WEEKLY;BYDAY='+repeat.join(',')+';';
  // TODO: implement 'Until'
  return rrule;
};

