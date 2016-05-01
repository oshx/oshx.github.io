var oshx = require.config({
    baseUrl: './src/js/',
    paths: {
        text: '../lib/text/text',
        jquery: '../lib/jquery/dist/jquery.min',
        angular: '../lib/angular/angular.min'
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
oshx([
    'text',
    'jquery'
], function (text, $) {
    'use strict';
});