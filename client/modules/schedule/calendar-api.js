/*
  calendar-api.js - contains various Google Calendar API calls
  namespace contained in {gCal}

  Dependencies:
  gapi - Google JavaScript Client API
  
*/

gCal = {}

/*
  getCalendarList - retrieves all of the user's calendars
  {function} callback - callback fn to handle response
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
  {string} name - calendar name
  {function} callback - callback fn to handle response
*/
gCal.createCalendar = function(name, callback) {
  gapi.client.load('calendar','v3', function() {
    request = gapi.client.calendar.calendars.insert({
      'resource' : { 'summary': name }
    });
    callback = callback || function(){return;};
    request.execute(callback);
  });
};
  
/*
  createEvent - creates an event for a class to be passed to the
  GCal API (get ready for a shitload of args)
  {string} calendarId - calendar to add event to
  {string} semester - TODO: delete this, unnecessary
  {string} summary - event title, use course title
  {string} description - event description, use course description
  {string} loc - event location, use classroom
  {DateTime} start - a datetime string representing start time/date
  {DateTime} end - a datetime string  representing end time/date
  {DateTime} until - TODO: use this for recurrence to make noninfinite
  returns: {object} calendar_event to use in event insert request body
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
  {object} request_body: params to be used in post request
  {function} callback: callback fn to handle response
  returns: {object} response
*/
gCal.calendarEventRequest = function(request_body, callback) {
  var request = gapi.client.request({
    'path':'/calendar/v3/calendars/' +
           request_body.calendarId + '/events',
    'method': 'POST',
    'body': JSON.stringify(request_body)
    //TODO: ^ Check if JSON.stringify is actually necessary
    //      idk but fuck it, it works
  });
  callback = callback || function(r) {return;};
  request.execute(callback);
};

/*
  getRecurrence - converts a "MoWeFr" style string to an RFC2445 
  standard recurrence string
  {string} s: a string of days to repeat, days are abbreviated
    to two letters each: ie:"SuMoTuWeThFrSa"
  returns: {string} RRule to specify recurrence

  TODO: This should really be in the schedule object, has nothing
  to do with accessing gapi
  TODO: implement 'Until'
*/
gCal.getRecurrence = function(s) {
  days = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  repeat = [];
  for (var i in days) {
    if (s.search(days[i]) >= 0) repeat.push(days[i].toUpperCase());
  }
  rrule = 'RRULE:FREQ=WEEKLY;BYDAY='+repeat.join(',')+';';
  return rrule;
};

