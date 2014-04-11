apicalls = {};

/* str -- Contains all url paths for api calls. Api searching queries
   are functions requiring arguments for the search 
*/
str = {}
str.baseUrl = 'http://localhost:8000'

// Searching queries
str.searchCoursesByDeptNumber = function(department, number) {
  return str.baseUrl + '/api/searchCourses/' + department + '/' + number;
}
str.searchCoursesByNumber = function(number) {
  return str.baseUrl + '/api/searchCourses/' + number;
}
str.searchCoursesByDept = function(department) {
  return str.baseUrl + '/api/searchCoursesByDept/' + department;
}
str.searchUsers = function(major,year) {
  return str.baseUrl + '/api/searchUsers/' + major + '/' + year;
}
str.findUser = function(email) {
  return str.baseUrl + '/api/findUser/' + email;
}
// Get all
str.getDeptList = '/api/getDeptList/';
str.getUsers = str.baseUrl + '/api/getUsers';
str.getCourses = str.baseUrl + '/api/getCourses';
str.getCatalogCourses = str.baseUrl + '/api/getCatalogCourses';

// Login/Register calls
str.login = str.baseUrl + '/api/login';
str.register = str.baseUrl + '/api/register';
str.updateUser = str.baseUrl + '/api/updateUser';

// API Calls
apicalls.getCourses = function(asynch) {
  courses = []
  $.ajax({
      async: asynch,
      type: 'GET',
      url: str.getCourses,
      dataType: 'json',
      success: function(data) {
          courses = data;
      }
  });
  return courses;
}

apicalls.getDeptList = function(asynch) {
  depts = []
  $.ajax({
      type: 'GET',
      async: asynch,
      url: str.getDeptList,
      dataType: 'json',
      success: function(data) {
          depts = data;
      }
  });
  return depts;
}

apicalls.getCoursesByDept = function(dept) {
  courses = []
  $.ajax({
      type: 'GET',
      url: str.searchCoursesByDept(dept),
      dataType: 'json',
      success: function (data) {
          courses = data;
          
      }
  });
  return courses;
}

apicalls.getCourse = function(dept, number, asynch) {
  courses = []
  $.ajax({
      type: 'GET',
      url: str.searchCoursesByDeptNumber(dept,number),
      dataType:'json',
      success: function(data) {
          courses = data;
      },
      async: asynch
  });
  window.console.log(str.searchCoursesByDeptNumber(dept,number));
  window.console.log(courses[0]);
  return courses[0];
}
