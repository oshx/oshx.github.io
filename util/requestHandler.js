function requestHandler(req, res) {
    
    var requestUrl = req.url;
    var requestMap = {
        '/': {
            type: 'file',
            target: './index.html'
        },
        asset: {
            root: '/src',
            
        }
    };
    var fileType = {
        '.js': 'application/javascript',
        '.css': 'text/css'
    };
    var mappedFile = requestMap[requestUrl];
    var mappedFileType = 'text/html';
    for (var i in fileType) {
        if (requestUrl.indexOf(i) > -1) {
            mappedFileType = fileType[i];
            break;
        }
        continue;
    }
    console.log('requestHandler : var mappedFile = requestMap[requestUrl]; ', mappedFile);
    function acceptRequestToFile(error, data) {
        res.writeHead(200, {'Content-type': mappedFileType});
        res.end(data);
    }
    if (!mappedFile) {
        mappedFile = req.url;
    }
    if (requestUrl.indexOf(requestMap.asset) < 0) {
        
    }
    return fs.readFile(mappedFile, acceptRequestToFile);
}
module.exports = requestHandler;