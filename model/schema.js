var mongoose = require('mongoose');
var autoIncrement= require('./crowdDb').autoInc;

//Schema of Collections in mongoDB 
var UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type: String,
		   unique: true,
		   required: true},
    mobNo:Number,
    password:String
}, { collection: 'UserRegistration' });

var CompanySchema = mongoose.Schema({
	companyId : Number,
	companyHeading : String,
	companyName : String,
	endorsement : Number,
	likes : Number,
	videoUrl: String,
	funding : String,
	foundingDate : Date,
	details : String,
	isLike: Boolean
	
}, { collection: 'CompanyDetails' });

// Models
var User = mongoose.model('User', UserSchema);
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'companyId' });

var CompDetails = mongoose.model('CompDetails',CompanySchema);
	
module.exports = {
	User : User,
	CompDetails : CompDetails	
};