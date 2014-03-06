var App = angular.module('drag-and-drop', ['ngDragDrop']);

App.controller('oneCtrl', function($scope, $timeout) {
  $scope.list1 = [{ 'title': 'Freshman', 'drag': false }];
  $scope.list2 = [{ 'title': 'Sophomore', 'drag': false }];
  $scope.list3 = [{ 'title': 'Junior', 'drag': false }];
  $scope.list4 = [{ 'title': 'Senior', 'drag': false }];
  
  $scope.list5 = [
    { 'title': 'Class 1', 'drag': true },
    { 'title': 'Class 2', 'drag': true },
    { 'title': 'Class 3', 'drag': true },
    { 'title': 'Class 4', 'drag': true },
    { 'title': 'Class 5', 'drag': true },
    { 'title': 'Class 6', 'drag': true },
    { 'title': 'Class 7', 'drag': true },
    { 'title': 'Class 8', 'drag': true }
  ];

  // Limit items to be dropped in list1
  $scope.optionsList1 = {
    accept: function(dragEl) {
      if ($scope.list1.length >= 5) {
        return false;
      } else {
        return true;
      }
    }
  };
});