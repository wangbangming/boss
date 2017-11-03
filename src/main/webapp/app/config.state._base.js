'use strict';
angular.module('app').config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        var MT = 'config.state._base.js - .config $stateProvider, $urlRouterProvider - ';
        c.log(MT, '...');

        $stateProvider.state('error404', {
            url: '/error404',
            templateUrl: 'views/error-404.html',
            ncyBreadcrumb: {
                label: 'Error 404 - The page not found'
            }
        });

        $stateProvider.state('error500', {
            url: '/error500',
            templateUrl: 'views/error-500.html',
            ncyBreadcrumb: {
                label: 'Error 500 - something went wrong'
            }
        });

        $stateProvider.state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            ncyBreadcrumb: {
                label: 'Register'
            }
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            ncyBreadcrumb: {
                label: 'Login'
            }
        });

        $stateProvider.state('lock', {
            url: '/lock',
            templateUrl: 'views/lock.html',
            ncyBreadcrumb: {
                label: 'Lock Screen'
            }
        });

        $stateProvider.state('app', {
            abstract: true,
            url: '/app',
            templateUrl: 'views/layout.html'
        });

        $urlRouterProvider.otherwise('/app/dashboard');

    }
]);
