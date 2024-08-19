const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

// const hpp = require("hpp");

const app = express();

app.use(cors());

const studentRouter = require('./routes/studentRoute');

// 1. Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the server 👋');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3.) ROUTES
app.use('/api/v1/student', studentRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// 4.) START SERVER
module.exports = app;
