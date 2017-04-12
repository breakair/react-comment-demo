var express = require('express');
var app = express();
var fs = require('fs');
var React = require('react');
var ReactDOM = require('react-dom');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.get('/', function(req, res){
	res.render('main', {
		React: React,
		ReactDOM: ReactDOM
	});
})

app.post('/api/comments', function(req, res){
	var comments = {};
	fs.readFile('./common_file', function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}

		comments = JSON.parse(data);
		var newComments = {
			id: Date.now(),
			author: req.body.author,
			text: req.body.text
		};
		Object.assign(comments, newComments);

	});

	fs.writeFile('/common_file', JSON.stringify(comments, null, 4), function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}

		res.json(comments);
	});
})

app.listen(3000, function(){
	console.log(`service is started at http://127.0.0.1:3000`);
});