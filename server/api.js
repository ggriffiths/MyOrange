/* The API controller

*/
 
 // Our User/Course models
var User = require('./user.js');
var Course = require('./course.js');
var CatalogCourse = require('./catalogCourse.js');

// Creates a new user
exports.register = function(req, res) {
    new User({displayName: req.body.displayName, email: req.body.email, password: req.body.password}).save();
}

// secure login for user
exports.login = function(req, res) {
  User.find({ 'email': req.body.email }, function (err, docs) {
    console.log("test!");
  });
}

// Lists all users
exports.listUsers = function(req, res) {
  User.find(function(err, users) {
    res.send(users);
  });
}

// Lists all courses
exports.listCourses = function(req, res) {
  console.log(req);
  console.log(res);
  Course.find(function(err, courses) {
    res.send(courses);
  });
}

// Lists all catalog courses
exports.listCatalogCourses = function(req, res) {
  CatalogCourse.find(function(err, catalogCourses) {
    console.log("listCatalogCourses func");
    res.send(catalogCourses);
  });
}

 
// Search for a specific course
exports.searchCourses = function(req, res) {
    Course.find({department: req.params.department,number: req.params.number}, function(error, courses) {
      res.send(courses);
    });
}

// Search for a specific course
exports.searchUsers = function(req, res) {
    Course.find({department: req.params.department,number: req.params.number}, function(error, users) {
      res.send(users);
    });
}