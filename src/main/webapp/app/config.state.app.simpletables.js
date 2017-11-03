'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.simpletables', {
            url: '/simpletables',
            templateUrl: 'views/tables-simple.html',
            ncyBreadcrumb: {
                label: 'Tables',
                description: 'simple and responsive tables'
            }
        });
    }
]);
