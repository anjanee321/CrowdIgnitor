//Connection to MongoDB
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');
var connection=mongoose.connect('mongodb://localhost/CrowdIgnitor');

var db = mongoose.connection;
autoIncrement.initialize(mongoose.connection);

module.exports = {
	db: db,
	autoInc:autoIncrement
};