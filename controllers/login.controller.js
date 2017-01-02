var express = require('express');
var router = express();
var User = require('../model/schema').User;
var session = require('express-session');

 
router.post('/', function (req, res, next) {
	   var email = req.body.email;
	   var password = req.body.password;
	   console.log(req.body);
	   User.findOne({email: email, password: password}, function(err, user) {
	      if(err) return next(err);
	      if(!user) return res.send('Email id or password is wrong');
	      
	      console.log("User is:-"+user);
	      return res.send('Logged In!');
	   });
	});

 /*router.get('/logout', function (req, res) {
   req.session.user = null;
   console.log('Logged out successfully!');
}); */

/*'use strict';

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var router = express();
var schema = require('../model/schema');
var session = require('express-session');  

router.post('/login',auth, function (req, res, next) {
	passport.authenticate('local', function(err, user, info){
	    var token;

	    // If Passport throws/catches an error
	    if (err) {
	      res.status(404).json(err);
	      return;
	    }

	    // If a user is found
	    if(user){
	      token = user.generateJwt();
	      res.status(200);
	      res.json({
	        "token" : token
	      });
	    } else {
	      // If user is not found
	      res.status(401).json(info);
	    }
	  })(req, res);
});*/ 

module.exports = router;