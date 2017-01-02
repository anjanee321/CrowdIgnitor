
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , db   = require('./model/crowdDb').db
  , path = require('path')
  , cors =  require('cors')
  , passport = require('passport')
 // , passportConfig = require('./app_api/config/passport')
  , jwt = require('express-jwt');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);;
app.use(express.static(path.join(__dirname, 'public')));

//Cors Enabling
app.use(cors());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(passport.initialize());

app.use(function (err, req, res, next) {
if (err.name === 'UnauthorizedError') {
 res.status(401);
 res.json({"message" : err.name + ": " + err.message});
}
});

var auth = jwt({
	  secret: 'MY_SECRET',
	  userProperty: 'payload'
	});


app.get('/', routes.index);
app.use('/setCompanyData',require('./controllers/companyRegistration.controller'));
app.use('/editCompanyData',require('./controllers/editCompanyDetails.controller'));
app.use('/login',  require('./controllers/login.controller'));
app.use('/registerUser',require('./controllers/register.controller'));
app.use('/app',require('./controllers/compDetails.controller'));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongo database successfully.");
  http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});
