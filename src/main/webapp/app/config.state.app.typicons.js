'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.typicons', {
            url: '/typicons',
            templateUrl: 'views/typicons.html',
            ncyBreadcrumb: {
                label: 'Typicons',
                description: 'Vector icons'
            }
        });
    }
]);
