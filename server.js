var express = require('express')
  , app = express()
  ,  path = require('path')
  ,	bodyParser = require('body-parser')
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session)
  , serveIndex = require('serve-index');

app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/client', serveIndex(__dirname + "/client"))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'foo',
    store: new MongoStore({
        url: 'mongodb://localhost/health-quiz'
    })
}));
app.use(bodyParser.urlencoded({ extended: true })); 

// compute whether the diet is healthy
app.post('/answers', function(req,res, next){
	if(req.body == null){
		 return next(new Error('invalid arguments'));
	}
	if(req.body.foods === undefined){
		 req.body.foods = [];
	}
  var responseText = ''
  if(req.session['foods'] !== undefined){
    responseText = 'your last choice was: ' + JSON.stringify(req.session['foods']) + ' you changed to :' + JSON.stringify(req.body.foods) ;
  }
  else {
    responseText = 'Your first choice was ' + JSON.stringify(req.body.foods);
  }
  req.session['foods'] = req.body.foods;
	res.end(responseText);
  next();
});
app.listen(process.env.PORT || 8080);