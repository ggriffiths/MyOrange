/* The API controller

*/
 
 // Our User/Course models
var User = require('./user.js');
var Course = require('./course.js');
var CatalogCourse = require('./catalogCourse.js');

// Creates a new user
exports.register = function(req, res) {
    User.findOne({ 'email': req.body.email }, function (err, docs) {
      if (docs == null){
        new User(
        {
          displayName: req.body.displayName, 
          email: req.body.email, 
          major: req.body.major, 
          year: req.body.year, 
          password: req.body.password,
          courses: req.body.courses
        }).save();
        res.send("success");
      }
      else{
        res.send(401);
      }
    });
}

// Update a new user
exports.updateUser = function(req, res) {
    User.update({ 'email': req.body.email }, {
      displayName: req.body.displayName,
      major: req.body.major,
      year: req.body.year
    }, function(err){
      if(err) res.json(err);
      else res.send("success");
    });
    console.log("inside update user");
    res.send("success");
}

// secure login for user
exports.login = function(req, res) {
  User.findOne({ 'email': req.body.email }, function (err, docs) {
    if(docs){
      if(req.body.password == docs.password){
        res.send("success");
      }
      else{
        res.send('Incorrect Login Information', 401);
      }
    }
    else{
      res.send('Incorrect Login Information', 401);
    }
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

// Find user by email
exports.findUser = function(req, res) {
    User.findOne({email: req.params.email}, function(error, user) {
      res.send(user);
    });
}