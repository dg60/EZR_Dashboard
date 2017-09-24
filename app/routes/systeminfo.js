var express = require('express');
var router = express.Router();
var os = require('os');
//var config = require(__dirname +'/config/database'); 
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

function systeminfo() {
  
  // Base informations
  var _hostname = os.hostname();
  var _arch     = os.arch();
  var _platform = os.platform();
  // calculate uptime
  var _uptimehours   = Math.floor(os.uptime() / 3600);
  var _uptimeMinutes = Math.floor((os.uptime() % 3600) /60 );
  var _uptimeSeconds = os.uptime() % 60;
  var _uptime   =  (_uptimehours.toString()) +':' + (_uptimeMinutes.toString()) + ':' + (_uptimeSeconds.toString());    // uptime h:mm:ss  

  // technical data
  var _cpus     = os.cpus();  
  var _cpuModel = _cpus[0].model;
  var _cpuCores = os.cpus().length;
  var _totalMem = ((os.totalmem() / 1024) / 1024);  // convert from byte to Megabyte

  // loadavg
  var _loadavg    = os.loadavg();
  var _loadavgMin =   ((_loadavg[0] * 100) / _cpuCores);
  var _loadavg15Min = ((_loadavg[1] * 100) / _cpuCores);
  var _loadavgHour =   ((_loadavg[2] * 100) / _cpuCores);

  // object for systeminformations
  var systeminfo = {
      hostname : _hostname,
      arch     : _arch, 
      platform : _platform,
      uptime   : _uptime,
      cpuModel : _cpuModel,
      cpuCores : _cpuCores,
      totalMem : _totalMem,
      loadavg  : _loadavg,
      loadavgMin : _loadavgMin,  
      loadavg15Min : _loadavg15Min, 
      loadavgHour : _loadavgHour 
  }

  return systeminfo;

};

/*
router.use(function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, 'ilovescotchyscotch', function(err, decoded) {			
			if (err) {
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				// if everything is good, save to request for use in other routes
				req.decoded = decoded;	
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});
*/


/* GET /systeminfo  */
router.get('/', function (req, res){

  res.json(systeminfo());

});

module.exports = router;
