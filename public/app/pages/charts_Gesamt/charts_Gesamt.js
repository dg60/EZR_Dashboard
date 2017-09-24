'use strict';


angular.module('myApp.charts_Gesamt', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts_Gesamt', {
    templateUrl: 'pages/charts_Gesamt/charts_Gesamt.html',
    controller: 'chartsCtrl_Gesamt'
  });
}])

  .controller('chartsCtrl_Gesamt', function() {

})

  .controller('loadavgMinCtrl_Gesamt', function($scope,$http) {
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
                    axisLabel: 'Temperature [C°]',
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
                text: ''
            },
            subtitle: {
                enable: true,
                text: '',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: ' ',
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
        $http.get('/api/temperature/temperature/'+ convertedStart + '/' + convertedEnd )

            // Data from API
            .then(function (response) {

                let dataArr = angular.fromJson(response.data);
                let series_Actual_0 = [];
                let series_Actual_1 = [];
                let series_Actual_2 = [];
                let series_Actual_3 = [];
                let series_Actual_4 = [];
                let series_Actual_5 = [];
                let series_Actual_6 = [];
                let series_Actual_7 = [];

                for (let i = 0; i < dataArr.length; i++) {

                    let timestamp = new Date(dataArr[i].created);

                    var _series_Actual_0 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[0].T_ACTUAL
                    }
                    var _series_Actual_1 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[1].T_ACTUAL
                    }
                    var _series_Actual_2 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[2].T_ACTUAL
                    }
                    var _series_Actual_3 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[3].T_ACTUAL
                    }
                    var _series_Actual_4 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[4].T_ACTUAL
                    }
                    var _series_Actual_5 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[5].T_ACTUAL
                    }
                    var _series_Actual_6 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[6].T_ACTUAL
                    }
                    var _series_Actual_7 = {
                        x: timestamp,
                        y: dataArr[i].heatarea[7].T_ACTUAL
                    }

                    series_Actual_0.push(_series_Actual_0);
                    series_Actual_1.push(_series_Actual_1);
                    series_Actual_2.push(_series_Actual_2);
                    series_Actual_3.push(_series_Actual_3);
                    series_Actual_4.push(_series_Actual_4);
                    series_Actual_5.push(_series_Actual_5);
                    series_Actual_6.push(_series_Actual_6);
                    series_Actual_7.push(_series_Actual_7);
                }


                // Status
                document.getElementById("status_loadavgMin").innerHTML = "Data Loaded";
                document.getElementById("status_loadavgMin").style.color = "green";

                $scope.data = [
                    {
                        values: series_Actual_0,      //values - represents the array of {x,y} data points
                        key: 'Ist-Niklas', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: series_Actual_1,
                        key: 'Ist-Valentin',
                        color: '#2ca02c'
                    },
                    {
                        values: series_Actual_2,
                        key: 'Ist-SZ',
                        color: '#7777ff',

                    },
                    {
                        values: series_Actual_3,
                        key: 'Ist-Bad'

                    },
                    {
                        values: series_Actual_4,
                        key: 'Ist-WZ'
                    },
                    {
                        values: series_Actual_5,
                        key: 'Ist-Küche'
                    },
                    {
                        values: series_Actual_6,
                        key: 'Ist-Büro'
                    },
                    {
                        values: series_Actual_7,
                        key: 'Ist-VR+WC'
                    }
                ];
            })
    })



})