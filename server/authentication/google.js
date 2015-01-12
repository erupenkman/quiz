passport = require('passport');
var googleScope = {
  scope: 'https://www.googleapis.com/auth/userinfo.email ' +
    'https://www.googleapis.com/auth/userinfo.profile'
}
module.exports = function(app) {
  app.get('/auth/google', passport.authenticate('google', googleScope));
  // Google will redirect the user to this URL after authentication.  Finish
  // the process by verifying the assertion.  If valid, the user will be
  // logged in.  Otherwise, authentication has failed.
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/client/pages/user.html',
      failureRedirect: '/client/pages/home.html'
    }));
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
}