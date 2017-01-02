var express = require('express');
var router = express();
var CompanySchema = require('../model/schema').CompDetails; 
var mongoose = require('mongoose');

router.get('/', function (req, res) {
	res.render('companyRegistration');
});

router.post('/', function(req,res){
	var query = {companyId: req.body.companyId};
	CompanySchema.find(query,function(err, docs){
	    if (err) return res.send(500, { error: err });
	    if(docs.length>0){
	    	return res.send("Company Id already exists");
	    }
	    var company = {
			   			companyId : req.body.companyId,
			   			companyHeading : req.body.companyHeading,
					    companyName : req.body.companyName,
					    endorsement : req.body.endorsement,
					    likes : req.body.likes,
					    videoUrl : req.body.videoUrl,
					    funding : req.body.funding,
					    foundingDate : req.body.foundingDate,
					    details : req.body.details
	   				};
	    var newCompany = new CompanySchema(company);
	    newCompany.save(function(err,result) {
            if (err){
                console.log('Error in Saving company:- '+err);  
                throw err;  
              } 
			return res.send("Company Details saved successfully<br><input action='action' type='button' value='Back' onclick='history.go(-1);'/>");	            
	    });
	});
});
module.exports = router;