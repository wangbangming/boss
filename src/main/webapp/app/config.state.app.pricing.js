'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.pricing', {
            url: '/pricing',
            templateUrl: 'views/pricing.html',
            ncyBreadcrumb: {
                label: 'Pricing Tables'
            }
        });
    }
]);
