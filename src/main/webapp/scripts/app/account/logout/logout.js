'use strict';

angular.module('myApp')
    .config(function ($stateProvider) {
        var MT = 'myApp - config - $stateProvider.state logout ... '; c.log(MT);
        $stateProvider
            .state('logout', {
                parent: 'account',
                url: '/logout',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'LogoutController'
                    }
                }
            });
    });
