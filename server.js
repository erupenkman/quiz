var express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  serveIndex = require('serve-index'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google').Strategy,
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/health-quiz');

var User = mongoose.model('User', {
  name: String,
  openId: String
});
var saveUser = function(identifier, profile, done) {
  User.findOne({
    openId: identifier
  }, function(err, existingUser) {
    if (err) {
      console.log(err);
      return done(err, existingUser);
    } else if (!existingUser) {
      var newUser = new User({
        name: profile.displayName,
        email: profile.emails[0],
        openId: identifier
      });
      newUser.save(function(err) {
        if (err) console.log(err);
        return done(err, newUser);
      });

    } else {
      console.log('existing user: ', existingUser);
      return done(err, existingUser)
    }
  });
};
passport.use(new GoogleStrategy({
    returnURL: 'http://127.0.0.1:8080/auth/google/return',
    realm: 'http://127.0.0.1:8080/'
  },
  saveUser
));
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/client', serveIndex(__dirname + "/client"));
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
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return',
  passport.authenticate('google', {
    successRedirect: '/client/pages/user.html',
    failureRedirect: '/client/pages/home.html'
  }));

// compute whether the diet is healthy
app.post('/answers', function(req, res, next) {
  if (req.body == null) {
    return next(new Error('invalid arguments'));
  }
  if (req.body.foods === undefined) {
    req.body.foods = [];
  }
  var responseText = ''
  if (req.session['foods'] !== undefined) {
    responseText = 'your last choice was: ' + JSON.stringify(req.session['foods']) + ' you changed to :' + JSON.stringify(req.body.foods);
  } else {
    responseText = 'Your first choice was ' + JSON.stringify(req.body.foods);
  }
  req.session['foods'] = req.body.foods;
  res.end(responseText);
  next();
});

app.get('/auth/currentUser', function(req, res, done) {
  //req.user is added to the req by passport session
  if (req.user) {
    res.send({
      name: req.user.name
    });
  } else {
    res.status(401).send('not authorized');
  }
});
app.get('/auth/logout', function(req, res) {
  console.log('logout');
  req.logout();
  req.session.destroy();
  res.redirect('/client/pages/home.html');
});
var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port: ', port)