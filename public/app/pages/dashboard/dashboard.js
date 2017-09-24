'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'pages/dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  });
}])

.controller('dashboardCtrl', function() {

})


.controller('systeminfoCtrl', function($scope,$http) {

    $http.get('/api/systeminfo')
    .then(function (response) {
      createSysteminformation(response.data);
    })
})

function createSysteminformation(arr) {
    var out = "";
 
    // Create table header
    out += '<thead>';
    out += '<tr>';
    out += '<th> Property' + '</th>' ;
    out += '<th> Value ' + '</th>' ;
    out += '</tr>';
    out += '</thead>';
    out += '<tbody>';
    
	
        out += '<tr>';
        out += '<td>' + 'Hostname: '  + '</td>';
        out += '<td>' + arr.hostname + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Arch: '  + '</td>';
        out += '<td>' + arr.arch + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Platform: '  + '</td>';
        out += '<td>' + arr.platform + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Uptime: '  + '</td>';
        out += '<td>' + arr.uptime + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Cpu Model: '  + '</td>';
        out += '<td>' + arr.cpuModel + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Cpu Cores: '  + '</td>';
        out += '<td>' + arr.cpuCores + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Total Memory: '  + '</td>';
        out += '<td>' + arr.totalMem + '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Actual Load Average[1min]: '  + '</td>';
        out += '<td>' + Math.round(arr.loadavgMin) + ' %'+ '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Actual Load Average[5min]: '  + '</td>';
        out += '<td>' + Math.round(arr.loadavg15Min) + ' %'+ '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Actual Load Average[15min]: '  + '</td>';
        out += '<td>' + Math.round(arr.loadavgHour) + ' %'+ '</td>';
        out += '</tr>';

    // Close table 
    out += '</tbody>';

    angular.element('#tableSysteminfo').html(out);
}




