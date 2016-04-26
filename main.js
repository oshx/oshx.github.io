var http = require('http');
var logger = require('./util/logger.js');
// var requestHandler = require('./util/requestHandler.js');
var fs = require('fs');

var log = {
	prefix: '[OSHx]',
	start: 'Server started'
};

function listenLogger() {
	console.log(log.prefix + log.start);
}
var requestMap = {
	'/': './index.html',
	asset: {
		root: '/src',

	}
};
function requestHandler(req, res) {
    var requestUrl = req.url;
    var fileType = {
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    var mappedFile = requestMap[requestUrl];
    var mappedFileType = 'text/html';
    for (var i in fileType) {
		console.log('fileType [CHECK IN PROGRESS]',i, requestUrl);
        if (requestUrl.indexOf(i) > -1) {
            mappedFileType = fileType[i];
			console.log('fileType [CHECKED]', i, requestUrl,' >>> HEAD ', fileType[i]);
            break;
        }
        continue;
    }
    console.log('requestHandler : var mappedFile = requestMap[requestUrl]; ', mappedFile);
    function acceptRequestToFile(error, data) {
		console.log(error);
		if (error) {
			res.writeHead(404);
			res.end(data);
			return;
		}
		res.writeHead(200, { 'Content-type': mappedFileType });
		res.end(data);
    }
    if (!mappedFile) {
        mappedFile = '.' + req.url;
    }
    if (requestUrl.indexOf(requestMap.asset) < 0) {

    }
    return fs.readFile(mappedFile, acceptRequestToFile);
}
var server = http.createServer(requestHandler);

server.listen(8000, listenLogger);