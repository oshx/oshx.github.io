function logger(message){
    var caller = arguments.callee.name;
    console.log(arguments);
}
module.exports = logger;