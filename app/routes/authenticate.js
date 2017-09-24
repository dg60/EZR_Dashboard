'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var config = require('./../../config/database'); 	
//var User   = require('../models/user'); // get our mongoose model
var User = mongoose.model('User');


router.post('/authenticate', function(req, res, next) {


	// find the user
	User.findOne({
		name: req.body.name 
	}, function(err, user) {


		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if ( !user.validPassword(req.body.password) ) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

                
				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: user.generateJwt()
				});
			}		
		}
	});
});


router.post('/register', function(req, res, next) {

	var newUser = new User();

	newUser.name = req.body.name;
	newUser.email = req.body.email;
	newUser.admin = req.body.admin;

	newUser.setPassword(req.body.password);
	
		// find the user
	User.findOne({
		name: req.body.name
	}, function(err, user) {

		// check if user already exits
		if (user) {
			res.json({ success: false, message: 'User already exists' });
		} else if (!user) {
				newUser.save(function(err) {
						if (err) {
							res.json({ 
								success: false,
								message: 'Error while register new user'
								});
						} else {
							res.json({ 
								success: true,
								message: 'User saved successfully'
								})
							}
					})
			};
	});
});

module.exports = router;
