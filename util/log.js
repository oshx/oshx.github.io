function logHandler(options){
    var colors = require('colors');
    colors.setTheme({
        warn: 'red',
        success: 'green',
        flat: 'cyan',
        info: 'magenta',
        sub: 'gray',
        em: 'yellow'
    });
    function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;
    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if(currentfile !== callerfile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc; 

    return callerfile;
    }
    function _getStringFromObject(object){
        var returnString = '';
        for (var i in object) {
            if (typeof object[i] === 'string') {
                returnString += object[i];
            } else {
                returnString += JSON.stringify(object[i]);
            }
        }
        return returnString;
    }
    function _timeFormat(number){
        return (number<10)?'0'+number:number;
    }
    function _getTime(){
        var now = new Date();
        return now = [_timeFormat(now.getHours()),_timeFormat(now.getMinutes()),_timeFormat(now.getSeconds())].join(':');
    }
    function _getPrefix(){
        return '['+colors.sub(_getTime())+'] '+'OSHx'.em+' ' + callerFile.info;
    }
    function log(){
        return console.log(_getPrefix(), '[Info]'.flat, _getStringFromObject(arguments));
    }
    function warn(){
        return console.log(_getPrefix(), '[Warn]'.warn, _getStringFromObject(arguments));
    }
    function load(){
        return console.log(_getPrefix(), '[Load]'.info, _getStringFromObject(arguments));
    }
    function success(){
        return console.log(_getPrefix(), '[Success]'.success, _getStringFromObject(arguments));
    }
    function logRequire(arg){
        load(arg);
        return require(arg);
    };
    function _parseFileName(target){
        if (target.indexOf('/') > -1) {
            target = target.split('/');
        } else {
            target = target.split('\\');
        }
        return target[target.length - 1];
    }
    var callerFile = _parseFileName(_getCallerFile());
    load(_parseFileName(__filename));
    return {
        log: log,
        warn: warn,
        load: load,
        success: success,
        require: logRequire
    };
}
module.exports = logHandler;
