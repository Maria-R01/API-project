//file to initialize Express Application

//importing dependencies
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
//imports routes 
const routes = require('./routes');


//check if the environment is in production or not
const { environment } = require('./config');
const isProduction = environment === 'production';

//initializing Express application
const app = express();

//connecting the Morgan middleware to log information on requests and responses
app.use(morgan('dev'));

//cookie-parser middleware for parsing cookies
app.use(cookieParser());
//express.json middleware for parsing JSON req bodies 
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(routes); // Connect all the routes

  
  module.exports = app;