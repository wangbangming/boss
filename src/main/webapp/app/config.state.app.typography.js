'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.typography', {
            url: '/typography',
            templateUrl: 'views/typography.html',
            ncyBreadcrumb: {
                label: 'Typography'
            }
        });
    }
]);
