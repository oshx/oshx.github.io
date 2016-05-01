require.config({
    baseUrl: './src/js/',
    paths: {
        'jquery': '../lib/jquery/dist/jquery.min',
        'angular': '../lib/angular/angular.min'
    }
});
require([
    'jquery',
    'angular',
    'view'
], function($, angular, view){
    'use strict';
    console.log($, angular, view);
});