var express = require('express');
var router = express();
var CompanySchema = require('../model/schema').CompDetails; 
var mongoose = require('mongoose');

router.get('/', function (req, res) {
	res.render('editCompanyDetails');
});

router.get('/getCompanyId',function(req,res){
	var query = CompanySchema.find({}).select({ "companyId": 1, "_id": 0}).sort( { "companyId": 1 } );
	query.exec(function(err,companyId){
		if(err) return err;
	    return res.send(companyId);
	});
});

router.get('/getCompanyData',function(req,res){
	var query = CompanySchema.find({"companyId":req.query.companyId}).select({"_id": 0,"isLike":0});
	query.exec(function(err,companyData){
		if(err) return err;
	    return res.send(companyData);
	});
});

router.post('/updateCompanyData',function(req,res){
	var query = {companyId: req.body.companyId};
    var update = {$set:
    	{
   			companyHeading : req.body.companyHeading,
		    companyName : req.body.companyName,
		    endorsement : req.body.endorsement,
		    likes : req.body.likes,
		    videoUrl : req.body.videoUrl,
		    funding : req.body.funding,
		    foundingDate : req.body.foundingDate,
		    details : req.body.details
    	}
	};
	CompanySchema.update(query,update,function(err,docs) {
		if (err){
		    console.log('Error in updating company details:- '+err);  
		    throw err;  
		  }
		if(docs.nModified>0){
			return res.send("Company Details updated successfully.<br><input action='action' type='button' value='Back' onclick='history.go(-1);'/>");	            
		}else{
			return res.send("Company Details are not updated. You have made no changes to details.<br><input action='action' type='button' value='Back' onclick='history.go(-1);'/>");	            
		}
	});
});
module.exports=router;