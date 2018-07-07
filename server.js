// set up ======================================================================
var fs = require('fs');

var hskey = fs.readFileSync('localhost-key.pem');
var hscert = fs.readFileSync('localhost-cert.pem');

var https_options = {
    key: hskey,
    cert: hscert
};
var https = require('https');
var express = require('express');
var app = express();        
var mongoose = require('mongoose'); 				
var port = process.env.PORT || 3000; 				
var config = require('./config/database'); 		// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var User   = require('./app/models/user'); // get our mongoose model
var User = mongoose.model('User');

// configuration ===============================================================
mongoose.connect(config.localUrl); 	     // Connect to local MongoDB 


app.use(express.static('./public/app')); 		                                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                                      // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));                        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                                  // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));                // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));                           // override with the X-HTTP-Method-Override header in the request


// auth ===============================================================
app.set('superSecret', config.secret); // secret variable

// routes ======================================================================
var routes = require('./app/routes/index');
var auth = require('./app/routes/authenticate');
var systeminfo = require('./app/routes/systeminfo');
var temperature = require('./app/routes/temperature');
var weather = require('./app/routes/weather');

// Only for testing
app.get('/setup', function(req, res) {

	// create a sample user
	var admin = new User();
	admin.name = 'admin';
	admin.email = 'admin';
	admin.admin = true;

	admin.setPassword('admin');

	// find the user
	User.findOne({
		name: 'admin'
	}, function(err, user) {

		// check if user already exits
		if (user) {
			res.json({ success: false, message: 'User already exists' });
		} else if (!user) {

		admin.save(function(err) {
		if (err) throw err;

			console.log('User saved successfully');
			res.json({ success: true });
			});

		}
	});
});

app.use('/', routes);
app.use('/api_auth', auth);
app.use('/api/systeminfo', systeminfo);
app.use('/api/temperature', temperature);
app.use('/api/weather', weather);


// listen (start app with node server.js) ======================================
//app.listen(port);
server = https.createServer(https_options, app).listen(port, '0.0.0.0');
console.log("App listening on https://localhost:" + port);
