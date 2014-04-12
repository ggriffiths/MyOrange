var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function($scope, $timeout) {
  
  $scope.list1 = [{ 'title': 'Freshman: Fall', 'drag': false }];
  $scope.list2 = [{ 'title': 'Sophomore: Fall', 'drag': false }];
  $scope.list3 = [{ 'title': 'Junior: Fall', 'drag': false }];
  $scope.list4 = [{ 'title': 'Senior: Fall', 'drag': false }];
  $scope.list5 = [{ 'title': 'Freshman: Spring', 'drag': false }];
  $scope.list6 = [{ 'title': 'Sophomore: Spring', 'drag': false }];
  $scope.list7 = [{ 'title': 'Junior: Spring', 'drag': false }];
  $scope.list8 = [{ 'title': 'Senior: Spring', 'drag': false }];
  $scope.list10 = [{ 'title': 'Major', 'drag': false }];
  $scope.list11 = [{"title": "Computer Science", 'drag': true}, ];

  $scope.list9 = [
  {"title": "PHI 378", "name":"Minds and Machines", 'drag': true, 'drag': true},
  {"title": "CIS 467", "name":"Introduction to Artificial Intelligence", 'drag': true, 'drag': true},
  {"title": "CIS 471", "name":"Optimization Methods", 'drag': true, 'drag': true},
  {"title": "CIS 478", "name":"Introduction to Quantum Computing", 'drag': true, 'drag': true},
  {"title": "CIS 483", "name":"Introduction to Computer and Network Security", 'drag': true, 'drag': true},
  {"title": "CIS 531", "name":"Compiler Construction", 'drag': true, 'drag': true},
  {"title": "CIS 545", "name":"Finite Mathematics", 'drag': true, 'drag': true},
  {"title": "CIS 543", "name":"Control of Robots", 'drag': true, 'drag': true},
  {"title": "CIS 553", "name":"Software Systems Implementation", 'drag': true, 'drag': true},
  {"title": "CIS 554", "name":"Object-Oriented Programming of Abstract Structures in C++", 'drag': true, 'drag': true},
  {"title": "CIS 565", "name":"Introduction to Artificial Neural Networks", 'drag': true},
  {"title": "CIS 567", "name":"Knowledge Representation and Reasoning", 'drag': true},
  {"title": "CIS 581", "name":"Concurrent Programming", 'drag': true},
  {"title": "CIS 583", "name":"Systems Assurance Seminar", 'drag': true},
  {"title": "CSE 397", "name":"Computer Laboratory I", 'drag': true},
  {"title": "CSE 398", "name":"Computer Laboratory II", 'drag': true},
  {"title": "CSE 483", "name":"Windows Programming", 'drag': true},
  {"title": "CSE 561", "name":"Digital Machine Design", 'drag': true},
  {"title": "CSE 581", "name":"Introduction to Database Management Systems", 'drag': true},
  {"title": "ECS 101", "name":"Introduction to Engineering and Computer Science", 'drag': true},
  {"title": "ECS 102", "name":"Introduction to Computing", 'drag': true},
  {"title": "MAT 295", "name":"Calculus I", 'drag': true},
  {"title": "WRT 105", "name":"Studio 1: Practices of Academic Writing", 'drag': true},
  {"title": "CIS 252", "name":"Introduction to Computer Science", 'drag': true},
  {"title": "MAT 296", "name":"Calculus II", 'drag': true},
  {"title": "PHI 251", "name":"Logic", 'drag': true},
  {"title": "PHY 211", "name":"General Physics/General Physics Laboratory", 'drag': true}, 
  {"title": "CIS 275", "name":"Introduction to Discrete Mathematics", 'drag': true}, 
  {"title": "CIS 351", "name":"Data Structures", 'drag': true}, 
  {"title": "MAT 397", "name":"Calculus III", 'drag': true}, 
  {"title": "MAT 331", "name":"First Course in Linear Algebra", 'drag': true}, 
  {"title": "CIS 341", "name":"Computer Organization and Programming Systems", 'drag': true}, 
  {"title": "CIS 453", "name":"Software Specification and Design", 'drag': true}, 
  {"title": "CIS 477", "name":"Introduction to Analysis of Algorithms", 'drag': true},
  {"title": "CIS 486", "name":"Software Implementation", 'drag': true}, 
  {"title": "CIS 473", "name":"Computability Theory", 'drag': true},
  {"title": "CIS 454", "name":"Software Implementation", 'drag': true},
  {"title": "ECS 392", "name":"Ethical Aspects of Engineering and Computer Science", 'drag': true}
  ];
    $scope.dropCallback = function(ui, event) {
$scope.list1 = [{ 'title': 'Freshman: Fall', 'drag': false },
{"title": "ECS 101", "name":"Introduction to Engineering and Computer Science", 'drag': true},
{"title": "ECS 102", "name":"Introduction to Computing", 'drag': true},
    {"title": "MAT 295", "name":"Calculus I", 'drag': true},
    {"title": "WRT 105", "name":"Studio 1: Practices of Academic Writing", 'drag': true},];
  
$scope.list5 = [{ 'title': 'Freshman: Spring', 'drag': false },
{"title": "CIS 252", "name":"Introduction to Computer Science", 'drag': true},
{"title": "MAT 296", "name":"Calculus II", 'drag': true},
{"title": "PHI 251", "name":"Logic", 'drag': true},
{"title": "PHY 211", "name":"General Physics/General Physics Laboratory", 'drag': true}, ];
  
$scope.list2 = [{ 'title': 'Sophomore: Fall', 'drag': false },
{"title": "CIS 275", "name":"Introduction to Discrete Mathematics", 'drag': true}, 
{"title": "CIS 351", "name":"Data Structures", 'drag': true}, 
{"title": "MAT 397", "name":"Calculus III", 'drag': true},
];
$scope.list6 = [{ 'title': 'Sophomore: Spring', 'drag': false },
{"title": "CIS 321", "name":"Introduction to Probability and Statistics", 'drag': true}, 
{"title": "CIS 352", "name":"Programming Languages:Theory and Practice", 'drag': true}, 
{"title": "CIS 341", "name":"Introduction to Systems Programming", 'drag': true}, 
{"title": "WRT 205", "name":"Studio 2; Critical Research and Writing", 'drag': true}, ];
$scope.list3 = [{ 'title': 'Junior: Fall', 'drag': false },
{"title": "CIS 453", "name":"Software Specification and Design", 'drag': true}, 
{"title": "CIS 477", "name":"Introduction to Analysis of Algorithms", 'drag': true},
{"title": "CIS 486", "name":"Software Implementation", 'drag': true}, ];
$scope.list7 = [{ 'title': 'Junior: Spring', 'drag': false },
{"title": "CIS 473", "name":"Computability Theory", 'drag': true},
{"title": "CIS 454", "name":"Software Implementation", 'drag': true},
{"title": "CIS 581", "name":"Concurrent Programming", 'drag': true},
{"title": "CIS 583", "name":"Systems Assurance Seminar", 'drag': true},
{"title": "CSE 397", "name":"Computer Laboratory I", 'drag': true},];
$scope.list4 = [{ 'title': 'Senior: Fall', 'drag': false },
{"title": "ECS 392", "name":"Ethical Aspects of Engineering and Computer Science", 'drag': true},
{"title": "CIS 567", "name":"Knowledge Representation and Reasoning", 'drag': true},
{"title": "CSE 398", "name":"Computer Laboratory II", 'drag': true},
{"title": "CSE 483", "name":"Windows Programming", 'drag': true},,
];
$scope.list8 = [{ 'title': 'Senior: Spring', 'drag': false },
{"title": "CIS 553", "name":"Software Systems Implementation", 'drag': true, 'drag': true},
{"title": "CIS 554", "name":"Object-Oriented Programming of Abstract Structures in C++", 'drag': true, 'drag': true},
{"title": "CIS 565", "name":"Introduction to Artificial Neural Networks", 'drag': true},
{"title": "MAT 331", "name":"First Course in Linear Algebra", 'drag': true},  ];
 $scope.list9 = [
{"title": "CSE 561", "name":"Digital Machine Design", 'drag': true},
{"title": "CSE 581", "name":"Introduction to Database Management Systems", 'drag': true},
{"title": "CIS 342", "name":"Computer Organization and Programming Systems", 'drag': true},
{"title": "CIS 467", "name":"Introduction to Artificial Intelligence", 'drag': true, 'drag': true},
{"title": "PHI 378", "name":"Minds and Machines", 'drag': true, 'drag': true},
{"title": "CIS 471", "name":"Optimization Methods", 'drag': true, 'drag': true},
{"title": "CIS 478", "name":"Introduction to Quantum Computing", 'drag': true, 'drag': true},
{"title": "CIS 483", "name":"Introduction to Computer and Network Security", 'drag': true, 'drag': true},
{"title": "CIS 531", "name":"Compiler Construction", 'drag': true, 'drag': true},
{"title": "CIS 545", "name":"Finite Mathematics", 'drag': true, 'drag': true},
{"title": "CIS 543", "name":"Control of Robots", 'drag': true, 'drag': true},];

    };
  // Limit items to be dropped in list1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.list1.length >= 6) {
        return false;
      } else {
        return true;
      }

    }
  };
 
});



