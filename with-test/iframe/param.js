(function () {
    'use strict';
    var param = location.search.substring(1) || '';
    param = (param.length > 1) ? JSON.parse('{"' + decodeURI(param).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}') : {};
    window.getParam = function getParam() {
        return param;
    };
    window.pick = function (selector) {
        var target = document.getElementById(selector);
        return {
            text: function (message) {
                target.innerText = message || '';
                return this;
            }
        };
    };
})();