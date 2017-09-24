'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'pages/login/login.html',
    controller: 'loginCtrl'
  });
}])

.controller('loginCtrl', function($scope,$http,$location,$window,authentication) {

  $scope.formInfo ={};
  $scope.token = {};
  $scope.login = function() {
    
      let inValid = false;
      // Check data===================================================
      $scope.nameRequired = '';
      $scope.emailRequired = '';
      $scope.passwordRequired = '';

      if (!$scope.formInfo.Name) {
        $scope.nameRequired = 'Name Required';
        inValid = true;
      }

      if (!$scope.formInfo.Email) {
        $scope.emailRequired = 'Email Required';
        inValid = true;
      }

      if (!$scope.formInfo.Password) {
        $scope.passwordRequired = 'Password Required';
        inValid = true;
      }

      if (!inValid) {
        //prepare the request=========================================
        var params = "name="+ $scope.formInfo.Name + "&" + "password=" + $scope.formInfo.Password ;
        var req = {
          method: 'POST',
          url: '/api_auth/authenticate',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: params 
        }
        //Request to the server=========================================
        $http(req)
        .then(function successCallback(response) {
          let data = response.data;
          $scope.token = response.data;

          if (!data.success) {
            //error
            $scope.message = data.message; // Error message from server
            $scope.formInfo ={};
            authentication.logout();
          }
          else{
            //succes
            authentication.saveToken(data.token);
            $location.path('/dashboard');
          }
        }, 
        function errorCallback(response) {
          // clear form
          $scope.formInfo ={};
          $scope.message = 'Error while getting Data from Server';
        });
      }
  };
});