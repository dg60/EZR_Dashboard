'use strict';


angular.module('myApp.charts_Wetter', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts_Wetter', {
    templateUrl: 'pages/charts_Wetter/charts_Wetter.html',
    controller: 'chartsCtrl_Wetter'
  });
}])

  .controller('chartsCtrl_Wetter', function() {

})

  .controller('Ctrl_Wetter', function($scope,$http) {
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
                    axisLabel: '[C°], [hPa], [%]',
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
        $http.get('/api/weather/weather/'+ convertedStart + '/' + convertedEnd )

            // Data from API
            .then(function (response) {

                let dataArr = angular.fromJson(response.data);
                let series_temp = [];
                let series_pressure = [];
                let series_humidity = [];
                let series_wind_speed = [];
                let series_wind_deg = [];
                let series_Actual_5 = [];
                let series_Actual_6 = [];
                let series_Actual_7 = [];

                for (let i = 0; i < dataArr.length; i++) {

                    let timestamp = new Date(dataArr[i].created);

                    var _series_temp = {
                        x: timestamp,
                        y: dataArr[i].temp
                    }
                    var _series_pressure = {
                        x: timestamp,
                        y: dataArr[i].pressure
                    }
                    var _series_humidity = {
                        x: timestamp,
                        y: dataArr[i].humidity
                    }
                    var _series_wind_speed = {
                        x: timestamp,
                        y: dataArr[i].wind_speed
                    }
                    var _series_wind_deg = {
                        x: timestamp,
                        y: dataArr[i].wind_deg
                    }

                    series_temp.push(_series_temp);
                    series_pressure.push(_series_pressure);
                    series_humidity.push(_series_humidity);
                    series_wind_speed.push(_series_wind_speed);
                    series_wind_deg.push(_series_wind_deg);
                }


                // Status
                document.getElementById("status_loadavgMin").innerHTML = "Data Loaded";
                document.getElementById("status_loadavgMin").style.color = "green";

                $scope.data = [
                    {
                        values: series_temp,      //values - represents the array of {x,y} data points
                        key: 'Aussentemperatur', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: series_pressure,
                        key: 'Luftdruck [hPa]',
                        color: '#2ca02c',
                        disabled: true
                    },
                    {
                        values: series_humidity,
                        key: 'Luftfeuchte [%]',
                        color: '#7777ff',
                        disabled: true

                    },
                    {
                        values: series_wind_speed,
                        key: 'Windgeschw. [m/s]',
                        disabled: true

                    },
                    {
                        values: series_wind_deg,
                        key: 'Windrichtung [degrees]',
                        disabled: true
                    }
                ];
            })
    })



})