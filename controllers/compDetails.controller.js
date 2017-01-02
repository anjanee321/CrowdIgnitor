var express = require('express');
var router = express();
var schema = require('../model/schema');

router.get('/', function (req, res) {
	res.render('companyRegistration');
});

router.get('/getCompanyCards', function (req, res) {
	schema.CompDetails.update({},{isLike:false}, {multi:true}, function(err, info) {
		  if (err){ 
			 throw err;
		  }
		  schema.CompDetails.find({},function(err,users){
			  if (err){ 
					 throw err;
			}
			  res.status(200).json(users);
		  });
	});
});

router.post('/setCompanyLikes', function(req,res){
	console.log(req.body);
	var query = {companyId: req.body.companyId};
	var newLikes = {likes: req.body.likes,isLike:req.body.isLike};
	schema.CompDetails.update(query, newLikes, {upsert:false}, function(err, numAffected){
	    if (err) return res.send(500, { error: err });
	    if(numAffected.nModified==0){
	    	return res.send("Company Id can't be found");
	    }
	    return res.send("succesfully saved");
	});
});
 
module.exports = router;