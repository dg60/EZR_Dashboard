'use strict';
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var temperature = require('../models/temperature.js');

/* GET /temperatures  */
router.get('/', function(req, res, next) {
  temperature.find(function (err, data) {
    if (err) return next(err);
    res.json(data);
  });
});

/* POST /temperature */
router.post('/', function(req, res, next) {
  temperature.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /temperatures / *id / *Startdate /* Enddate */ 
router.get('/:id/:Startdate/:Enddate', function(req, res, next) {
  
  var id         = req.params.id;
  var _startdate = parseInt(req.params.Startdate);
  var _enddate   = parseInt(req.params.Enddate);

  var date1 = new Date(_startdate);
  var date2 = new Date(_enddate);

  var Startdate = new Date(date1.getFullYear(),date1.getMonth(),date1.getDate(),date1.getHours(),date1.getMinutes(),date1.getSeconds());
  var Enddate   = new Date(date2.getFullYear(),date2.getMonth(),date2.getDate(),date2.getHours(),date2.getMinutes(),date2.getSeconds());

/*
  temperature.find({id: id,
                created: {$gte: Startdate , $lte: Enddate}
    }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
*/

  temperature.find({ id: id, created: { $gte: Startdate, $lte: Enddate } }).sort({ created: 1 }).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });


});


module.exports = router;
