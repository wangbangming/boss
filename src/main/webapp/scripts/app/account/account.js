'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        var MT = 'myApp - config - $stateProvider.state account ... '; c.log(MT);
        $stateProvider
            .state('account', {
                abstract: true,
                parent: 'site'
            });
    });
