'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.mvc', {
            url: '/mvc',
            templateUrl: 'views/mvc.html',
            ncyBreadcrumb: {
                label: 'BeyondAdmin Asp.Net MVC Version'
            }
        });
    }
]);
