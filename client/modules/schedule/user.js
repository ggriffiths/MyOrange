/**
  user.js - contains user-associated functions and data including
  authentication, email, degree plan, and calendars.
  everything is contained in the {user} namespace

  Dependencies:
  gapi - Google JavaScript Client API
*/

user = {};
user.email = '';
user.degreePlan = [];
user.calendars = [];

/*
  user.getCalendarId - Gets calendarId from the name
  {string} name - calendar name, use the semester (ie:'Fall 2014')
  returns: {string} calendarId
*/
user.getCalendarId = function(name) {
  var calendarId;
  for (var i in user.calendars)
    calendarId = user.calendars[i].summary == name ? user.calendars[i].id : calendarId;
  return calendarId;
};

/*
  user.initEmail - gets the User's email from the Google+ people api
  and stores it in the user object to be used elsewhere
  {function} callback - callback fn to handle response
*/
user.initEmail = function(callback) {
  gapi.client.load('plus','v1', function() {
    var request = gapi.client.plus.people.get({userId:'me'});
    request.execute(function(obj) {
      user.email = obj.emails[0].value;
      if (callback) callback(obj);
    });
  });
}

/* 
  authorize - prompts user to authorize app to use required Google APIs
  {function} callback - callback fn to handle response
*/
user.authorize = function(callback) {
  var params = {
      "client_id": "229789026459-boi2v7najuc1acb2diohskv18ioahtu7.apps.googleusercontent.com",
      "scope": ["https://www.googleapis.com/auth/calendar",
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read']
  };
  gapi.auth.authorize(params, function(r) {
    console.log('login complete');
    console.log(gapi.auth.getToken());
    if (callback) callback(r);
  });
};
