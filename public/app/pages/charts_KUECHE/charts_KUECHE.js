'use strict';


angular.module('myApp.charts_KUECHE', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts_KUECHE', {
    templateUrl: 'pages/charts_KUECHE/charts_KUECHE.html',
    controller: 'chartsCtrl_KUECHE'
  });
}])

  .controller('chartsCtrl_KUECHE', function() {

})

  .controller('Ctrl_KUECHE', function($scope,$http) {
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
                let conf_heatarea = 5;
                let series_Target = [];
                let series_Actual = [];
                let series_Aktor = [];

                for (let i = 0; i < dataArr.length; i++) {

                    let timestamp = new Date(dataArr[i].created);

                    var _series_Target = {
                        x: timestamp,
                        y: dataArr[i].heatarea[conf_heatarea].T_TARGET
                    }
                    var _series_Actual = {
                        x: timestamp,
                        y: dataArr[i].heatarea[conf_heatarea].T_ACTUAL
                    }
                    var _series_Aktor = {
                        x: timestamp,
                        y: dataArr[i].heatarea[conf_heatarea].ACTOR
                    }

                    series_Target.push(_series_Target);
                    series_Actual.push(_series_Actual);
                    series_Aktor.push(_series_Aktor);
                }


                // Status
                document.getElementById("status_loadavgMin").innerHTML = "Data Loaded";
                document.getElementById("status_loadavgMin").style.color = "green";

                $scope.data = [
                    {
                        values: series_Target,      //values - represents the array of {x,y} data points
                        key: 'Solltemperatur', //key  - the name of the series.
                        color: '#ff7f0e'  //color - optional: choose your own line color.
                    },
                    {
                        values: series_Actual,
                        key: 'Isttemperatur',
                        color: '#2ca02c'
                    },
                    {
                        values: series_Aktor,
                        key: 'Aktor',
                        color: '#7777ff',
                        area: true      //area - set to true if you want this line to turn into a filled area chart.
                    }
                ];
            })
    })



})