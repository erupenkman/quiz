passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  config = require('../config/config.js');

module.exports = function(app, mongoose) {
  var User = mongoose.model('User', {
    name: String,
    openId: String
  });
  var saveGoogleUser = function(accessToken, refreshToken, profile, done) {
    User.findOne({
      openId: accessToken
    }, function(err, existingUser) {
      if (err) {
        console.log(err);
        return done(err, existingUser);
      } else if (!existingUser) {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0],
          openId: accessToken
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
  var saveFacebookUser = function(accessToken, refreshToken, profile, done) {
    User.findOne({
      openId: accessToken
    }, function(err, existingUser) {
      if (err) {
        console.log(err);
        return done(err, existingUser);
      } else if (!existingUser) {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0],
          openId: accessToken
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
  var googleConfig = {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
  }
  console.log(googleConfig);
  passport.use(new GoogleStrategy(googleConfig,
    saveGoogleUser
  ));
  passport.use(new FacebookStrategy({
      clientID: config.FACEBOOK_APP_ID,
      clientSecret: config.FACEBOOK_APP_SECRET,
      callbackURL: config.FACEBOOK_CALLBACK_URL
    },
    saveFacebookUser
  ));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  app.use(passport.initialize());
  app.use(passport.session());
};