path = require('path'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  serveIndex = require('serve-index'),
  MongoStore = require('connect-mongo')(session),
  express = require('express');

module.exports = function(app, mongoose) {

  app.use('/client', express.static(path.join(__dirname, '../../client')));
  app.use('/client', serveIndex(__dirname + '../../client'));
  app.get('/', function(req, res) {
    return res.redirect('/client/pages/home.html');
  });
  app.use(session({
    resave: true,

    saveUninitialized: true,
    secret: 'foo',
    cookie: {
      httpOnly: false
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
}