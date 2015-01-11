passport = require('passport'),
  GoogleStrategy = require('passport-google').Strategy;

module.exports = function(app, mongoose) {
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
  app.use(passport.initialize());
  app.use(passport.session());
};