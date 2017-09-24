/*
* TODO: 
* Pack Line chart in a module
* Init function for Actual values 
* 
*/

//document ready
$( document ).ready(function() {
// set up ======================================================================
var Start = new Date();
var End = new Date();
var seriesMin = [];
var series15Min = [];
var xmlhttpavgMin = new XMLHttpRequest();
var xmlhttpavg15Min = new XMLHttpRequest();
var url = "http://localhost:3000/api/loadavg/";

// chart config ======================================================================
var loadavgMin =  Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'loadavgMin',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: seriesMin,
        // The name of the data record attribute that contains x-values.
        xkey: 'created',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['loadavgMin','loadavg15Min'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['loadavgMin','loadavg15Min'],

        resize: false,

        pointSize: 1

        });

var loadavg15Min =  Morris.Line({
        // ID of the element in which to draw the chart.
        element: 'loadavgMin15',
        // Chart data records -- each entry in this array corresponds to a point on
        // the chart.
        data: seriesMin,
        // The name of the data record attribute that contains x-values.
        xkey: 'created',
        // A list of names of data record attributes that contain y-values.
        ykeys: ['loadavg15Min'],
        // Labels for the ykeys -- will be displayed when you hover over the
        // chart.
        labels: ['loadavg15Min'],

        resize: false

        });


// Date Picker ======================================================================
$(function () {

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
});

$(function () {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb15min(start, end) {
        $('#reportrange_loadavg15Min span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }

    $('#reportrange_loadavg15Min').daterangepicker({
        startDate: start,
        endDate: end,
        timePicker: false,
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
    }, cb15min);
});


//Apply button Event Date Picker ======================================================================
$('#reportrange_loadavgMin').on('apply.daterangepicker', function (ev, picker) {
    // Init of the chart
    seriesMin = [];
    loadavgMin.setData(seriesMin);
    // Status
    document.getElementById("status_loadavgMin").innerHTML = "Data pending";
    document.getElementById("status_loadavgMin").style.color = "orange";

    Start = picker.startDate._d;
    End = picker.endDate._d;

    var convertedStart = Start.getTime();
    var convertedEnd = End.getTime();
    var request = '';

    request = url + "loadavg/" + convertedStart + "/" + convertedEnd;

    // Fire ajax request
    xmlhttpavgMin.open("GET", request, true);
    xmlhttpavgMin.send();

});

$('#reportrange_loadavg15Min').on('apply.daterangepicker', function (ev, picker) {
    // Init of the chart
    series15Min = [];
    loadavg15Min.setData(series15Min);
    // Status
    document.getElementById("status_loadavg15Min").innerHTML = "Data pending";
    document.getElementById("status_loadavg15Min").style.color = "orange";

    Start = picker.startDate._d;
    End = picker.endDate._d;

    var convertedStart = Start.getTime();
    var convertedEnd = End.getTime();
    var request = '';

    request = url + "loadavg/" + convertedStart + "/" + convertedEnd;

    // Fire ajax request
    xmlhttpavg15Min.open("GET", request, true);
    xmlhttpavg15Min.send();

});

//Ajax Request to api ======================================================================
    xmlhttpavgMin.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Init
            seriesMin = [];
            var myArr = JSON.parse(this.responseText);
            // myFunction(myArr);
            for (i = 0; i < myArr.length; i++) {
                var _seriesMinobject = {
                    created: myArr[i].created,
                    loadavgMin: myArr[i].loadavgMin,
                    loadavg15Min: myArr[i].loadavg15Min
                }
                seriesMin.push(_seriesMinobject);
                delete _seriesMinobject;
            }

            loadavgMin.setData(seriesMin);
            document.getElementById("status_loadavgMin").innerHTML = "Data was loaded";
            document.getElementById("status_loadavgMin").style.color = "green";
        }
    };

    xmlhttpavg15Min.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            // Init
            series15Min = [];
            var myArr = JSON.parse(this.responseText);
            // myFunction(myArr);
            for (i = 0; i < myArr.length; i++) {
                var _series15Minobject = {
                    created: myArr[i].created,
                    loadavg15Min: myArr[i].loadavg15Min
                }
                series15Min.push(_series15Minobject);
                delete _series15Minobject;
            }

            loadavg15Min.setData(series15Min);
            document.getElementById("status_loadavg15Min").innerHTML = "Data was loaded";
            document.getElementById("status_loadavg15Min").style.color = "green";
        }
    };



});