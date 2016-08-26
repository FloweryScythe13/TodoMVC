'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const routes = require('./controllers/routes');
const rollbar = require('rollbar');
rollbar.init("066cc23ed2424424ad663a3117d1d751");

let app = express();

// Set up a socket server with the app
let server = http.createServer(app);
let io = require('socket.io')(server);

// Configure view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('x-powered-by');

// Static file serving happens everywhere but in production
if (process.env.NODE_ENV !== 'production') {
  let staticPath = path.join(__dirname, '..', '..', 'public');
  app.use('/static', express.static(staticPath));
  app.use(rollbar.errorHandler('066cc23ed2424424ad663a3117d1d751'));
}

// Mount application routes
routes(app);

app.get('/error', function() {
    throw new Error('Something bad happened!');
});
// Export Express webapp instance
module.exports = app;
