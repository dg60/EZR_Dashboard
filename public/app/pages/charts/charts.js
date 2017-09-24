'use strict';

angular.module('myApp.charts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts', {
    templateUrl: 'pages/charts/charts.html',
    controller: 'chartsCtrl'
  });
}])

  .controller('chartsCtrl', function() {

})

  .controller('loadavgMinCtrl', function($scope,$http) {
// Init Timepicker===============================================================
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cbmin(start, end) {
            $('#reportrange_loadavgMin span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $('#reportrange_loadavgMin').daterangepicker({
            startDate: start,
            endDate: end,
            timePicker: true,
            timePickerIncrement: 15,
            "timePicker24Hour": true,
            "showWeekNumbers": true,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cbmin);

// chart init ===============================================================
        $scope.options = {
            chart: {
                type: 'lineChart',
                focusEnable: true,
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time',
                    tickFormat: function(d){
                        return d3.time.format('%d/%m/%y %H:%M:%S')(new Date(d))
                    }
                },
                x2Axis: {
                    tickFormat: function(d){
                        return d3.time.format('%d/%m/%y')(new Date(d))
                    }
                },
                yAxis: {
                    axisLabel: 'Loadavg (%)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    
                }
            },
            title: {
                enable: true,
                text: 'Title for Line Chart'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

// Data selected ===============================================================
    $('#reportrange_loadavgMin').on('apply.daterangepicker', function (ev, picker) {

        // Status
        document.getElementById("status_loadavgMin").innerHTML = "Data pending";
        document.getElementById("status_loadavgMin").style.color = "orange";

        let Start = picker.startDate._d;
        let End = picker.endDate._d;

        let convertedStart = Start.getTime();
        let convertedEnd = End.getTime();

        // Get request from api
        $http.get('/api/loadavg/loadavg/'+ convertedStart + '/' + convertedEnd )

            // Data from API
            .then(function (response) {

                let dataArr = angular.fromJson(response.data);
                let seriesLoadavg = [];
                let seriesLoadavg15min = [];
                let seriesLoadavg1hour = [];

                for (let i = 0; i < dataArr.length; i++) {

                    let timestamp = new Date(dataArr[i].created);

                    var _seriesLoadavg = {
                        x: timestamp,
                        y: dataArr[i].loadavgMin
                    }
                    var _seriesLoadavg15min = {
                        x: timestamp,
                        y: dataArr[i].loadavg15Min
                    }
                    var _seriesLoadavg1hour = {
                        x: timestamp,
                        y: dataArr[i].loadavgHour
                    }

                    seriesLoadavg.push(_seriesLoadavg);
                    seriesLoadavg15min.push(_seriesLoadavg15min);
                    seriesLoadavg1hour.push(_seriesLoadavg1hour);
                }


                // Status
                document.getElementById("status_loadavgMin").innerHTML = "Data Loaded";
                document.getElementById("status_loadavgMin").style.color = "green";

                $scope.data = [
                    {
                        values: seriesLoadavg,      //values - represents the array of {x,y} data points
                        key: 'Loadavg 1min', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: seriesLoadavg15min,
                        key: 'Loadavg 5min',
                        color: '#2ca02c'
                    },
                    {
                        values: seriesLoadavg1hour,
                        key: 'Loadavg 15min',
                        color: '#7777ff',
                        area: true      //area - set to true if you want this line to turn into a filled area chart.
                    }
                ];
            })
    })



})