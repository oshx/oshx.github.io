; (function (window) {
    'use strict';
    if (typeof global !== 'undefined') {
        throw new Error('odi.js must be ran on the web browers');
    }
    var util = function(){
        var param = location.param.split('&') || '';
        console.log(param);
        
    };
    (function (window, document) {
        window.console = window.console || { log: function (message) { alert(message) } };
        document.getElementsByClassName = document.getElementsByClassName || function (classString) {
            var returnElements = [];
            var allElements = document.getElementsByTagName('*');
            for (var objectKey in allElements) {
                if (' ' + allElements[objectKey].className + ' '.indexOf(' ' + classString + ' ') > -1) {
                    returnElements.push(allElements[objectKey]);
                    continue;
                }
            }
            return returnElements;
        };
        console.log('[DONE] polyfill');
    })(window, document);
})((typeof window !== 'undefined') ? window : this);