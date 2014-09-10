var a127 = require('a127-magic');
var express = require('express');
var routes = require('./routes');
var app = express();

// uncomment the following if you need to parse incoming form data
app.use(express.bodyParser());

app.use(a127.middleware());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/addReview/:id', routes.addreview);
app.get('/details/:id', routes.details);
app.get('/', routes.index);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.PORT || 10010);

console.log('try this:\ncurl http://localhost:10010/hello?name=Scott');