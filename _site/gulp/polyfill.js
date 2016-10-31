function polyfill(gulp, config){
    'use strict';
    require('es6-promise').polyfill();
}
module.exports = polyfill;