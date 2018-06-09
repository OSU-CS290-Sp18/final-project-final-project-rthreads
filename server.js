var http = require('http');
var fs = require('fs');

const PORT = process.env.PORT || 3000;

var content;
var style;
var interaction;

fs.readFile('./public/index.html', function(err, data) {
	if (err) {
		throw err;
	}
	content = data;
	console.log("index.html file has been read");
});

fs.readFile('./public/index.js', function(err, data) {
	if (err) {
		throw err;
	}
	interaction = data;
	console.log("index.js file has been read");
});

fs.readFile('./public/style.css', function(err, data) {
	if (err) {
		throw err;
	}	
	style = data;
	console.log("style.css file has been read");
});

var server = http.createServer(function(req, res) {
	if(req.url === '/index.html') {
			switch (req.url) {
				case "/style.css":
				res.writeHead(200, {"Content-Type": "text/css"});
				res.write(style);
				break;
				
				default: 
				res.writeHead(200, {"Content-Type": "text/html"});
				res.write(content);
			}
			res.end();
		}
		
		else if(req.url === '/') {
			switch (req.url) {
				case "/style.css":
				res.writeHead(200, {"Content-Type": "text/css"});
				res.write(style);
				break;
				
				default: 
				res.writeHead(200, {"Content-Type": "text/html"});
				res.write(content);
			}
			res.end();
		}


		else if (req.url === '/index.js') {
			res.statusCode = 200;	
			res.write(interaction, function(err) {
			res.end();
			});
		}		


		else if (req.url === '/style.css') {
			res.statusCode = 200;
			res.write(style, function(err) {	
			res.end();
			});
		}
	res.end();
});
	server.listen(PORT, () => {
		console.log('== Server is listening on port', PORT);
	});

