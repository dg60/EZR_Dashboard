'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'nvd3',
  'myApp.dashboard',
  'myApp.charts',
  'myApp.charts_Niklas',
  'myApp.charts_Valentin',
  'myApp.charts_SZ',
  'myApp.charts_Bad',
  'myApp.charts_WZ',
  'myApp.charts_KUECHE',
  'myApp.charts_BUERO',
  'myApp.charts_VR_WC',
  'myApp.charts_Gesamt',
  'myApp.charts_Wetter',
  'myApp.settings',
  'myApp.login',
  'myApp.profile',
  'myApp.register',
  'myApp.authentication.service'
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/dashboard'});
  
}])

.run(['$rootScope', '$location', 'authentication', run])

.controller('topnavCtrl', function($scope,$location,authentication) {

  $scope.show = true;
  $scope.showDashboard = true;
  $scope.showCharts = true;

  // User logout=================================================
  $scope.logout = function(){
    authentication.logout();
    $location.path('/login');
  }
})


function run($rootScope, $location, authentication) {

    //init 
    $rootScope.user = {
            email : '',
            name : '',
            admin : ''
    };

    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {

      $rootScope.user = authentication.currentUser(); // Refresh user information on view
      //redirect to login when user login not valid
      if (!authentication.isLoggedIn()) {
        $location.path('/login');
      }
    });
  }


