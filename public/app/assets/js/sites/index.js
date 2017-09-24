//document ready
$( document ).ready(function() {
// set up ======================================================================
var xmlhttpSysteminfo = new XMLHttpRequest();
var url = "http://localhost:3000/api/systeminfo/";

// Fire ajax request ===========================================================
xmlhttpSysteminfo.open("GET", url, true);
xmlhttpSysteminfo.send();

xmlhttpSysteminfo.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            var myArr = JSON.parse(this.responseText);
            createSysteminformation(myArr);
        }
    };



// table systeminformation =====================================================
function createSysteminformation(arr) {
    var out = "";
    var i;

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
        out += '<td>' + 'Actual Load Average[15min]: '  + '</td>';
        out += '<td>' + Math.round(arr.loadavg15Min) + ' %'+ '</td>';
        out += '</tr>';

        out += '<tr>';
        out += '<td>' + 'Actual Load Average[60min]: '  + '</td>';
        out += '<td>' + Math.round(arr.loadavgHour) + ' %'+ '</td>';
        out += '</tr>';

    // Close table 
    out += '</tbody>';

    document.getElementById("tableSysteminfo").innerHTML = out;
}


//  ======================================================================


});
