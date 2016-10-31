var oshx = {
    config:{
        BASE_URL: './src/js/',
        LIB_URL: '../lib/'
    }
};
oshx.require = require.config({
    baseUrl: oshx.config.BASE_URL,
    paths: {
        text: oshx.config.LIB_URL + 'text/text',
        jquery: oshx.config.LIB_URL + 'jquery/dist/jquery.min',
        angular: oshx.config.LIB_URL + 'angular/angular.min',
        spinjs: oshx.config.LIB_URL + 'spin.js/spin.min'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        app: {
            deps: ['angular']
        },
        routes: {
            deps: ['angular']
        }
    }
});
oshx.require([
    'text',
    'jquery'
], function (text, $) {
    'use strict';
});