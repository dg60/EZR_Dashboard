'use strict';

angular.module('myApp.register', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'pages/register/register.html',
    controller: 'registerCtrl'
  });
}])

.controller('registerCtrl', function($scope,$http,authentication) {

  $scope.formInfo ={};
  $scope.token = {};
  $scope.register = function() {
    
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

      if(!($scope.formInfo.PasswordConfirm == $scope.formInfo.Password) ){
        $scope.passwordRequiredC = 'Passwords not equal';
        inValid = true;
      }


      if (!inValid) {
        //prepare the request=========================================
        var params = "name="+ $scope.formInfo.Name + "&" + "password=" + $scope.formInfo.Password + "&" + "email=" +  $scope.formInfo.Email + "&" + "admin=" + $scope.formInfo.Admin;
        var req = {
          method: 'POST',
          url: '/api_auth/register',
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
          }
          else{
            //succes
            $scope.messageSucess = 'User created';
            $scope.formInfo ={};
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