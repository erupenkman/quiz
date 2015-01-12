var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  config = require('./config/config.js');
mongoose.connect(config.MONGO_URL);

require('./config/configure-express.js')(app, mongoose);
require('./authentication/setup.js')(app, mongoose);
require('./authentication/google.js')(app);
require('./authentication/facebook.js')(app);

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

var port = process.env.PORT || 8080;
app.listen(port);
console.log('listening on port: ', port)