const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const tourRouter = require('./routes/tourroutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//1)MIDDLEWARES;
//use third party middleware - morgan:
app.use(morgan('dev'));
app.use(express.json());
//<-using a middleware, next third conventional argument needed:

/*Middleware for reading static files*/
app.use(express.static(`${__dirname}/public`));

//Important: the middleware order in Express meter, bc getAllTours will ends request response cycle!
app.use((req, res, next) => {
  console.log(`Hello from the middleware 🌞`);
  next(); // we need to call next function, otherwise, response/request cycle would be really sucked at this point
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //info when exact request happened;
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//*****to connect our routes with application we would use them as a middleware
app.use('/api/v1/tours', tourRouter); // this will be our middleware;
app.use('/api/v1/users', userRouter); // this will be our middleware;

module.exports = app;
