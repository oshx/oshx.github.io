function logHandler(args){
    var colors = require('colors');
    colors.setTheme({
        warn: 'red',
        success: 'green',
        flat: 'blue',
        info: 'cyan',
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
    function _timeFormat(number){
        return (number<10)?'0'+number:number;
    }
    function _getTime(){
        var now = new Date();
        return now = [_timeFormat(now.getHours()),_timeFormat(now.getMinutes()),_timeFormat(now.getSeconds())].join(':');
    }
    function _getPrefix(){
        return '['+colors.sub(_getTime())+'] <'+colors.em('OSHx Log')+'> from ' + colors.info(callerFile);
    }
    function log(args){
        return console.log(_getPrefix(), colors.flat('[Info]'), args);
    }
    function warn(args){
        return console.log(_getPrefix(), colors.warn('[Warn]'), args);
    }
    function load(args){
        return console.log(_getPrefix(), colors.sub('[Load]'), args);
    }
    function success(args){
        return console.log(_getPrefix(), colors.green('[Success]'), args);
    }
    function logRequire(args){
        load(args);
        return require(args);
    };
    var callerFile = _getCallerFile().split('/');
    callerFile = callerFile[callerFile.length - 1];
    return {
        log: log,
        warn: warn,
        load: load,
        success: success,
        require: logRequire
    };
}
module.exports = logHandler;
