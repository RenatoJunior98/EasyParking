var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var parquesRouter = require('./routes/parquesRoutes');
var reviewsRouter = require('./routes/reviewsRoutes');
var reservaRouter = require('./routes/reservaRoutes');
var utilizadorRouter = require('./routes/userRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/parques', parquesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/reservas', reservaRouter);
app.use('/api/users', utilizadorRouter);

module.exports = app;
