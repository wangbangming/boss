'use strict';
angular.module('app').config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('app.invoice', {
            url: '/invoice',
            templateUrl: 'views/invoice.html',
            ncyBreadcrumb: {
                label: 'Invoice Page'
            }
        });
    }
]);
