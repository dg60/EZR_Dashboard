'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'pages/profile/profile.html',
    controller: 'profileCtrl'
  });
}])

.controller('profileCtrl', function($scope,authentication) {

  // User logout=================================================
  $scope.profile = authentication.currentUser();

});