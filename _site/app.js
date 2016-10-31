var config = {
    logHandler: require('./util/log')
};
var logHandler = config.logHandler();
var log = logHandler.log;
var logRequire = logHandler.require;

var express = logRequire('express');
var app = express();

app.set('port', process.env.PORT || 8000);

app.listen(8000, function(){
    log('EXPRESS run on ', this._connectionKey);
});