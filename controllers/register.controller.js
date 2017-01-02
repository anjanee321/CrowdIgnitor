var express = require('express');
var router = express();
var schema = require('../model/schema');
var session = require('express-session');
var User = schema.User ; 
var mongoose = require('mongoose');
var passport = require('passport');

router.get('/', function (req, res) {
	res.render('UserRegistration');
});
 
router.post('/', function (req, res,next) {
    //var	user = new User();	
     var user =	{
    	       firstName: req.body.firstName,
    	       lastName: req.body.lastName,
    	       email: req.body.email,
    	       mobNo: req.body.mobNo,
    	       password:req.body.password
    	   };
    validateUser(user.email,function(err,result){
    	if(err){
    		console.log('Error in validating User:-'+err);
    		return res.send(err);
    	}
    	var newUser = new User(user);
    	newUser.save(function(err,result) {
            if (err){
              console.log('Error in Saving user:- '+err);  
              throw err;  
            } 
            res.status(200);
            res.send('User Registration succesful');
          }).catch(function(e) {
             console.log("No array Found");
             res.send("No array found");
          });
     	});
    });

 function validateUser(email, callback) {
	User.find({email: email},function(err, users){
	    if(err) {
	    	console.log("Error in validating user");
	    	throw err;
	    } else if(users.length!=0) {
	    	if (users[0].email===email){
	    		return callback("email is already registered");
	      }
	    }else{
	    	return callback();
	    }
   });
 }
 module.exports = router; 