const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
require('dotenv').config();

const indexRouter = require('./routes/index');
const opdRouter = require('./routes/opd');
const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

// Database Setup
const db = require('./modules/database');

// Authentication Connection to database;
db.sequelize.authenticate()
    .then(()=>{
        console.log("Connected to database successfully");
    })
    .catch(err => {
        console.error("An error occured while connecting ", err);
});

// Initalizing all models
const Person = require('./models/Person'),
      Patient = require('./models/Patient'),
      Receipt = require('./models/Receipt'),
      Employee = require('./models/Employee'),
      Consultant = require('./models/Consultant');

// Sync and seed databases with new Values

// db.sequelize.sync({force: true}).then( () => {
//   require('./modules/seed')(20);
//   console.log("Database synchronized");
// }).catch(err=>{
//   console.error(err);
// });

    
// All Routing
app.use('/', indexRouter);
app.use('/opd/', opdRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
