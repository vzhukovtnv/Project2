var createError = require('http-errors');
var express 	= require('express');
var path 	= require('path');
//var cookieParser= require('cookie-parser');
//var logger 	= require('morgan');





// IMPORT ROUTES
const serverSetting  = require('./models/loadServerSetting');
const clientRouter   = require('./routes/client');
const companyRouter  = require('./routes/company');
const stocksRouter  = require('./routes/stocks');


var app = express();

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

// USE ROUTES
app.use('/stocks', stocksRouter);
app.use('/client', clientRouter);
app.use('/company', companyRouter);


// serve the react application
app.use(express.static('../client/build'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error !');
});

module.exports = app;
