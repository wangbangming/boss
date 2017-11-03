'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        var MT = 'myApp - config - $stateProvider.state entity ... '; c.log(MT);
        $stateProvider
            .state('entity', {
                abstract: true,
                parent: 'site'
            });
    });
