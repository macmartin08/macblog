require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  useNewUrlParser: true
}).catch(err => console.error(`ERROR: ${err}`));

// Our imported libraries
const express = require('express');

// Assigning Express to an app contstant
const app = express();

// This maintains our home path
const path = require('path');

// Body parser which will make reading request bodies MUCH easier
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Our Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/css', express.static('assets/stylesheets'));
app.use('/js', express.static('assets/javascripts'));
app.use('/images', express.static('assets/images'));

// Our routes
const routes = require('./routes.js');
app.use('/', routes);

// Starting our server on port 4000
app.listen((process.env.PORT || 4000), () => console.log('Listening on 4000'));