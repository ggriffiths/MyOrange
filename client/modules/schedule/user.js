user = {};
user.email = '';
user.degreePlan = [];
user.calendars = [];

/*
  Get calendar
*/
user.getCalendarId = function(name) {
  var calendarId;
  for (var i in user.calendars)
    calendarId = user.calendars[i].summary == name ? user.calendars[i].id : calendarId;
  return calendarId;
};

/*
  Get/Set/Initialize user.email
*/
user.getEmail = function() { return user.email };
user.setEmail = function(e) { user.email = e; };
user.initEmail = function(callback) {
  gapi.client.load('plus','v1', function() {
    var request = gapi.client.plus.people.get({userId:'me'});
    request.execute(function(obj) {
      user.setEmail(obj.emails[0].value);
      if (callback) callback();
    });
  });
}

/* 
  authorize - prompts user to authorize app to use required Google APIs
*/
user.authorize = function(callback) {
  var params = {
      "client_id": "229789026459-boi2v7najuc1acb2diohskv18ioahtu7.apps.googleusercontent.com",
      "scope": ["https://www.googleapis.com/auth/calendar",
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read']
  }
  gapi.auth.authorize(params, function() {
    console.log('login complete');
    console.log(gapi.auth.getToken());
    if (callback) callback();
  });
};
