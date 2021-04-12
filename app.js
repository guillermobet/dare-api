const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const loginRouter = require('./routes/login');
const clientsRouter = require('./routes/clients');
const policiesRouter = require('./routes/policies');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/login', loginRouter);
app.use('/api/v1/clients', clientsRouter);
app.use('/api/v1/policies', policiesRouter);

module.exports = app;
