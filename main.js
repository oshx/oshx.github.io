var http = require('http');

var server = http.createServer(function(req, res){
   	res.writeHead(200, {'Content-type':'text/plain'});
	res.end('OSHx nodejs testbed');
});

server.listen(8000);