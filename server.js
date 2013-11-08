
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var passport = require('passport')
var path = require('path');
var User = require('./server/models/User.js');


var app = express();

// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/client/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));
app.use(passport.initialize());
app.use(passport.session());

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

passport.use(User.localStrategy);
passport.use(User.googleStrategy());


require('./server/routes.js')(app);

// app.get('/', routes.index);
// app.get('/users', user.list);

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
