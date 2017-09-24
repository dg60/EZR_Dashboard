var express = require('express');
var router = express.Router();

/* GET home index.html */
router.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


/* GET home index.html 
router.get('/index.html', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
*/

module.exports = router;
