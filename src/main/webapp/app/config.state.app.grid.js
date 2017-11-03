'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.grid', {
            url: '/grid',
            templateUrl: 'views/grid.html',
            ncyBreadcrumb: {
                label: 'Bootstrap Grid'
            }
        });
    }
]);
