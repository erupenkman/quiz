var express = require('express')
  , cors = require('cors')
  , app = express()
  ,	bodyParser = require('body-parser')
  , session = require('express-session')
  , MongoStore = require('connect-mongo')(session);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'foo',
    store: new MongoStore({
        url: 'mongodb://localhost/health-quiz'
    })
}));
var corsOptions = {
  origin: 'http://localhost:8081'
};
app.use(cors(corsOptions))
app.use(bodyParser.json()); 

// compute whether the diet is healthy
app.post('/answers', function(req,res, next){
	if(req.body == null){
		 return next(new Error('invalid arguments'));
	}
	if(typeof req.body.foods != 'array'){
		 req.body.foods = [];
	}
  var responseText = ''
  if(typeof req.session['foods'] === 'array'){
    responseText = 'your last choice was: ' + JSON.stringify(req.session['foods']) + 'you changed to :' + JSON.stringify(req.body.foods) ;
  }
  else {
    responseText = 'Your first choice was ' + JSON.stringify(req.body.foods);
  }
  req.session['foods'] = req.body.foods;
	res.end(responseText);
  next();
});
app.listen(process.env.PORT || 8080);