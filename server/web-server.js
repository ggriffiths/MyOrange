var express = require('express');
var mongoose = require('mongoose');
var app = module.exports = express();
 
// connect to Mongo when the app initializes
var uristr = 'mongodb://admin:admin@ds039507.mongolab.com:39507/myorange';
mongoose.connect(uristr);

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../client'));	
});
 
// Function to restrict a location
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/#myLoginModal');
  }
}

// Set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');


// Searching for specific course or user
app.get('/api/searchCourses/:department/:number', api.searchCourses);
app.get('/api/searchCourses/:number', api.searchCourses);
app.get('/api/searchUsers/:major?*/:year?*', api.searchCourses);

// Get all
app.get('/api/getUsers', api.listUsers);
app.get('/api/getCourses', api.listCourses);
app.get('/api/getCatalogCourses', api.listCatalogCourses);

// Login/Register calls
app.post('/api/login', api.login);
app.post('/api/register', api.register);
app.post('/api/updateUser', api.updateUser);

var port = 8000;

app.listen(port);
console.log("Express server listening on port %d",port);